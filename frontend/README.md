# AAROVYA — Complete Healthcare Management & Digital Health Records Platform
### Professional UI/UX Design | React 18 + Vite + TypeScript | 30 Modules | Fully Responsive | Backend Integration Ready

---

## 1. Project Overview & Identity
**AAROVYA** is an enterprise-grade Unified Digital Health Locker and Healthcare Management Platform built to streamline clinical workflows, empower patient data sovereignty, and enable universal healthcare interoperability.

- **Product Name**: **AAROVYA** (Never CareBridge or Aarogya)
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with custom clinical design tokens
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6) with Role-Aware Routing
- **Architectural Readiness**: Decoupled service abstraction layer ready for seamless Java Spring Boot REST API integration.

---

## 2. Professional Design System

| Token Name | Hex Code | UI Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `#2563EB` | Brand headers, primary action buttons, active navigation states |
| **Secondary Blue** | `#3B82F6` | Gradients, badges, hover highlights, indicators |
| **Dark Blue** | `#1E3A8A` | Persistent sidebar, high-contrast headings, text containers |
| **Light Blue** | `#DBEAFE` | Accent containers, subtle borders, chip badges |
| **Very Light Blue Background** | `#F5F9FF` | Soft clinical canvas background |
| **Surface** | `#FFFFFF` | Cards, modals, drawers, input fields |
| **Primary Text** | `#172554` | Clinical headings, labels, metrics |
| **Secondary Text** | `#64748B` | Subtitles, metadata, timestamps |
| **Borders** | `#DBEAFE` | Dividers, card borders, outlines |
| **Success** | `#16A34A` | Verification stamps, normal ranges |
| **Warning** | `#F59E0B` | Pending reviews, refills, alerts |
| **Danger** | `#DC2626` | Emergency SOS QR banner, critical vitals, revoke consent |

---

## 3. Complete 30-Module Feature Coverage Inventory

Every single one of the 30 planned modules from the master specification has been fully designed and implemented with functional interactions:

### A. Authentication & Core Patient Experience
1. **Multi-Role Login / Sign Up** (`/login`, `/register`): 4-role switcher (Patient, Doctor, Lab, Admin), password visibility toggle, OTP authentication simulation, and HIPAA/ABDM terms consent.
2. **Patient Dashboard** (`/patient/dashboard`): Greeting banner, vital statistics (42 documents, 28 verified, 3 pending, 2 appointments), quick actions, upcoming appointment cards, and recent records.
3. **Health Document Locker** (`/patient/health-locker`): Categorized folders (Reports 14, Prescriptions 6, Consultations 6, Discharge 3, Vaccination 5, Insurance 2), search filter, grid/list toggle, and preview modal.
4. **Upload and Extract (OCR/AI)** (`/patient/upload-record`): Drag & drop file area, neural OCR scanning indicator, extracted editable parameters (Type, Hospital, Date, Doctor), and direct save to locker.
5. **Document Verification** (`/patient/document-verification`): Provider verification badges, audit timeline (Uploaded by Patient -> Verification Requested -> Verified by Provider), and provider stamp requests.
6. **Share Records With Control** (`/patient/share-records`): Multi-document selection, recipient clinician assignment, view-only / download permissions, expiration duration (24h, 7d, 30d), and live link generator with clipboard copy.

### B. Medical Management
7. **Doctor Access Requests** (`/patient/access-requests`): Tabs for Pending, Active, and History; Approve and Reject actions with real-time audit updates.
8. **Unified Health Timeline** (`/patient/timeline`): Longitudinal clinical event spine (Blood tests, Consultations, Prescriptions, X-Rays, Vaccinations) with year filters (2026, 2025).
9. **Appointments and Follow-ups** (`/patient/appointments`): Upcoming vs Follow-up queues, Reschedule and Cancel buttons, and an interactive "Book New Appointment" modal.
10. **Prescription Management** (`/patient/prescriptions`): Digital doctor orders, dosage schedules, PDF prescription viewer, and "Set Medicine Reminder" shortcut.
11. **Medicine Reminder** (`/patient/medicine-reminders`): Daily dosage schedule (08:00 AM, 01:00 PM, 09:00 PM), Taken/Pending toggles, and daily progress bar.
12. **Emergency Profile & QR Code** (`/patient/emergency-profile`): Red emergency SOS banner, dynamic scannable QR code, blood group (B+), drug allergies, medical conditions, emergency contacts, and download printable card.

### C. Patient Services
13. **Family Health Hub** (`/patient/family`): Family member profiles (Self, Father, Mother, Brother), relationship tagging, and "Add Member" modal.
14. **Nearby Facilities (GPS)** (`/patient/nearby-hospitals`): Category filters (All, Hospital, Lab, Pharmacy), interactive GPS map simulation, 24x7 emergency indicators, and distance metrics.
15. **Hospital Details** (`/patient/hospitals/:id`): Hospital showcase banner, rating/reviews, tabs for Overview, Departments, Facilities, and Affiliated Doctors, with simulated phone dialer and turn-by-turn directions.
16. **Government Schemes** (`/patient/government-schemes`): Central and State welfare programs (Ayushman Bharat PM-JAY, MJPJAY, PMSMA), benefits, eligibility checklists, and official portal links.
17. **AI Health Assistant** (`/patient/ai-assistant`): Conversational clinical chatbot with suggested prompt pills, lab report summarization (Hemoglobin, WBC, Platelets), and medical disclaimers.
18. **Consent & Privacy Center** (`/patient/consent`): Active data sharing grants, access history, and instant consent revocation with confirmation dialogs.

### D. Professional Portals
19. **Doctor Portal** (`/doctor/dashboard`, `/doctor/appointments`, `/doctor/patient-records`, `/doctor/prescriptions`): Doctor queue, daily appointment schedule, authorized patient medical record viewer, and prescription issuing console.
20. **Laboratory Portal** (`/laboratory/dashboard`, `/laboratory/test-requests`, `/laboratory/upload-report`): Inbound diagnostic requisitions, test status management (Pending -> In-Progress -> Completed), and verified PDF report upload with digital provider signature.

### E. Additional Features
21. **Notifications** (`/patient/notifications`, header dropdown): Category filters (Appointments, Records, Access, System), mark as read, and unread counters.
22. **Health Record Export** (`/patient/export`): Format selection (Selected Documents, Complete Health Summary PDF, Medical Timeline PDF, All Documents ZIP), date range picker, and simulated export generation.
23. **Insurance & Expense Tracker** (`/patient/insurance`): Active policy card (HDFC ERGO), validity indicators, annual expense overview (₹24,500), and monthly expenditure chart using Recharts.
24. **Vaccination Tracker** (`/patient/vaccinations`): Immunization history (COVID-19, Hepatitis B, Tetanus), batch numbers, and "Add Vaccination" modal.
25. **Health Calendar** (`/patient/calendar`): Monthly and weekly views, date indicators, and scheduled clinical agenda.
26. **Medical Expense Tracker** (`/patient/expenses`): Itemized ledger (Consultations, Lab Tests, Medicines), monthly total calculation (₹4,450), and expense logging form.
27. **Health Analytics Overview** (`/patient/analytics`): Vital insights (Weight 58kg, BP 118/76 mmHg, Blood Sugar 92 mg/dL), and interactive 6-month historical trends chart via Recharts.
28. **Settings & Account Security** (`/patient/settings`): Profile details, password management, Two-Factor Authentication (2FA) toggle, active session management, and privacy logs.
29. **Admin Dashboard** (`/admin/dashboard`, `/admin/verifications`): System overview statistics (1,250 users, 120 doctors, 40 hospitals, 35 labs), and institutional verification status breakdown (195 total, 148 verified, 32 pending, 15 rejected).
30. **Audit Logs & Access History** (`/admin/audit-logs`): Immutable audit table tracking timestamps, actors, roles, actions, details, and pagination controls.

---

## 4. Responsive Design Architecture

AAROVYA was designed mobile-first and tested across all four device breakpoints:

1. **Mobile Phones (320px – 767px)**:
   - Sticky top navigation bar with brand mark and notifications.
   - Thumb-accessible bottom navigation bar for top patient tasks: *Home*, *Locker*, *Timeline*, *Emergency QR (SOS)*, and *More*.
   - Slide-out mobile drawer with all 30 modules categorized cleanly.
   - Full-width stacked cards, minimum 44px touch targets, and mobile-friendly tables.
2. **Tablets (768px – 1023px)**:
   - Adaptive two-column layouts for dashboard widgets and medical forms.
   - Smooth horizontal scroll for wide clinical tables.
3. **Laptops (1024px – 1439px)**:
   - Persistent 260px Dark Navy sidebar.
   - 3-column dashboard grid.
4. **Desktops (>= 1440px)**:
   - Centered `max-w-7xl` container preventing awkward wide stretching.

---

## 5. Backend Integration Readiness (Java Spring Boot)

The application includes a centralized service abstraction layer (`src/services/api.ts`):
- All endpoints map directly to standard Spring Boot REST paths:
  - `/api/v1/auth` (User Authentication & Roles)
  - `/api/v1/records` (Health Records & Uploads)
  - `/api/v1/appointments` (Clinical Scheduling)
  - `/api/v1/doctor-requests` (Consent & Access Grants)
  - `/api/v1/emergency` (Emergency Vitals & QR)
  - `/api/v1/labs` (Diagnostic Test Orders)
  - `/api/v1/audit` (System Security Logs)
- Set `VITE_API_BASE_URL=http://localhost:8080` in `.env` to route all calls to the backend; otherwise, it seamlessly falls back to high-fidelity mock data.

---

## 6. Installation & Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Production build & TypeScript check
npm run build
```

