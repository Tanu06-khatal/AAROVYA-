# AAROVYA – Member 4 Backend Module
## Medical Timeline, Record Sharing, Consent Management, and Audit Logs

### 1. Executive Summary
This module implements the core sovereign data governance and longitudinal health record coordination layer for **AAROVYA – An Intelligent, Unified Digital Health Locker and Healthcare Coordination Platform**.

Member 4 is responsible for four mission-critical subsystems:
1. **Medical Timeline (`medical_timeline`)**: Longitudinal aggregation of clinical visits, lab results, prescriptions, and radiology reports. Maintains a clear boundary between timeline event metadata and locker documents.
2. **Record Sharing (`record_shares`)**: Granular, patient-directed record sharing with verified healthcare providers, complete with strict state machine validation (`PENDING` -> `ACTIVE` / `REJECTED` / `REVOKED` / `EXPIRED`).
3. **Consent Management (`record_consents`)**: Sovereign ABDM-aligned patient consent enforcement (`GRANTED` -> `REVOKED` / `EXPIRED`), validating purpose, expiration, and actor scopes dynamically on every request.
4. **Internal Audit Trail (`audit_logs`)**: Immutable, append-only security logs generated exclusively via trusted internal service operations. External direct write endpoints have been permanently decommissioned to guarantee tamper-proof accountability.

---

### 2. Architecture & Security Model

#### 2.1 Defense-in-Depth Identity & RBAC
- **Authentication Adapter**: `com.super30.medicalbackend.security.AarovyaAuthFilter` intercepts incoming requests, resolving identities from standard API Gateway headers (`X-User-Id`, `X-User-Role`, `X-User-Email`) or Bearer tokens.
- **Fail-Secure Principle**: If authentication context is missing or invalid, the filter rejects the request immediately with `401 Unauthorized` (`AarovyaAuthenticationEntryPoint`). Security is never bypassed.
- **Principal Resolution**: `AuthenticatedUser.java` guarantees that IDs submitted in request bodies or query parameters (`patientId`, `ownerId`, `userId`) are never trusted as proof of identity. The verified principal is always retrieved from `SecurityContextHolder`.
- **Role Hierarchy (`UserRole`)**:
  - `ROLE_PATIENT`: Full ownership of personal timeline, consents, and record shares.
  - `ROLE_DOCTOR`: Read-only access to timeline events and records strictly governed by active consents/shares.
  - `ROLE_LAB`: Direct upload and management of laboratory diagnostic events.
  - `ROLE_ADMIN`: Platform-wide compliance auditing and administrative oversight without compromising clinical privacy.

#### 2.2 Tamper-Proof Audit Logging
- Direct `POST /api/audit-logs` endpoint has been removed.
- `AuditLogService` is an internal service invoked transactionally by `MedicalTimelineService`, `RecordShareService`, and `ConsentService`.
- Clinical document contents, access tokens, and passwords are strictly excluded from audit payloads.
- Role-scoped viewing: Patients can only inspect audit logs for their own user ID; `ADMIN` users can inspect system-wide audit records with pagination and filtering.

---

### 3. Database Schema & Configuration

#### 3.1 Shared Database Integration
- **Database Name**: Shared `aarovya` catalog (replaces isolated `aarovya_member4`).
- **Port**: Aligned to standard backend port `8081`.
- **Environment Variables**:
  - `DB_URL`: JDBC connection URL (defaults to `jdbc:mysql://localhost:3306/aarovya?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true`).
  - `DB_USERNAME`: Database user (defaults to `root`).
  - `DB_PASSWORD`: Database password (defaults to empty).
  - `SERVER_PORT`: Application port (defaults to `8081`).
  - `HIBERNATE_DDL_AUTO`: Schema management strategy (defaults to `update` in development, `validate` in production).

#### 3.2 Relational Tables
1. **`medical_timeline`**:
   - `id` (BIGINT, PK, Auto-Increment)
   - `patient_id` (BIGINT, Indexed, Not Null)
   - `record_id` (BIGINT, Nullable, references external MedicalRecord)
   - `record_type` (VARCHAR(50), Not Null)
   - `title` (VARCHAR(255), Not Null)
   - `description` (TEXT)
   - `record_date` (DATETIME, Not Null)
   - `created_at` (DATETIME, Immutable)
   - `updated_at` (DATETIME)
2. **`record_shares`**:
   - `id` (BIGINT, PK, Auto-Increment)
   - `timeline_id` (BIGINT, Not Null)
   - `owner_id` (BIGINT, Not Null)
   - `receiver_id` (BIGINT, Not Null)
   - `status` (VARCHAR(30), Not Null, Indexed)
   - `purpose` (VARCHAR(255))
   - `shared_at` (DATETIME, Not Null)
   - `expires_at` (DATETIME)
3. **`record_consents`**:
   - `id` (BIGINT, PK, Auto-Increment)
   - `patient_id` (BIGINT, Not Null, Indexed)
   - `granted_to_user_id` (BIGINT, Not Null, Indexed)
   - `purpose` (VARCHAR(255), Not Null)
   - `status` (VARCHAR(30), Not Null, Indexed)
   - `granted_at` (DATETIME, Not Null)
   - `expires_at` (DATETIME)
   - `revoked_at` (DATETIME)
4. **`audit_logs`**:
   - `id` (BIGINT, PK, Auto-Increment)
   - `user_id` (BIGINT, Not Null, Indexed)
   - `action` (VARCHAR(100), Not Null)
   - `entity_type` (VARCHAR(100), Not Null)
   - `entity_id` (BIGINT)
   - `ip_address` (VARCHAR(60))
   - `details` (TEXT)
   - `created_at` (DATETIME, Not Null, Indexed)

---

### 4. Standardized REST API Endpoints

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/medical-timeline/patient/{patientId}` | `PATIENT` (self), `DOCTOR` (with consent), `ADMIN` | Fetch patient timeline events |
| **GET** | `/api/medical-timeline/{id}` | Owner or authorized recipient | Fetch specific timeline entry |
| **POST** | `/api/medical-timeline` | `PATIENT`, `DOCTOR`, `LAB`, `ADMIN` | Create timeline event |
| **PUT** | `/api/medical-timeline/{id}` | Record owner or creator | Update timeline event |
| **DELETE** | `/api/medical-timeline/{id}` | Record owner only | Delete timeline event |
| **GET** | `/api/record-shares/sent` | `PATIENT` | List sharing requests sent by current user |
| **GET** | `/api/record-shares/received` | `DOCTOR` / `LAB` | List sharing requests received |
| **POST** | `/api/record-shares` | `PATIENT` | Initiate record sharing request |
| **PUT** | `/api/record-shares/{id}/accept` | Intended Recipient | Accept sharing request (moves to `ACTIVE`) |
| **PUT** | `/api/record-shares/{id}/reject` | Intended Recipient | Reject sharing request |
| **PUT** | `/api/record-shares/{id}/revoke` | Record Owner | Immediately revoke active share |
| **GET** | `/api/consents` | Authenticated User | List consents granted by current user |
| **POST** | `/api/consents` | `PATIENT` | Grant new consent |
| **PUT** | `/api/consents/{id}/revoke` | Consenting Patient | Immediately revoke consent |
| **GET** | `/api/audit-logs` | Authenticated User | Retrieve audit logs (scoped to user or system for ADMIN) |

*Dual URL aliases (`/api/medical-records`, `/api/shares`) are actively maintained for backward compatibility with existing frontend builds.*

---

### 5. Verification & Testing Instructions

#### Backend Testing:
Run the comprehensive Spring Boot unit and integration test suite:
```bash
cd backend
mvn test
```
*Current test suite: 51/51 tests passing across 7 test suites with 0 errors and 0 failures.*

#### Frontend Build Verification:
Run the TypeScript compiler and Vite production bundler:
```bash
cd frontend
npm run build
```
*Output: Production bundle cleanly compiled to `frontend/dist` with 0 type errors.*
