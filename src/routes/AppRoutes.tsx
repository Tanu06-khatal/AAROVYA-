import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { NotFoundPage } from '../pages/public/NotFoundPage';
import { UnauthorizedPage } from '../pages/public/UnauthorizedPage';

// Auth Pages (Module 1 & Auth Suite)
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ProfileSetupPage } from '../pages/auth/ProfileSetupPage';
import { AdminLoginPage } from '../pages/auth/AdminLoginPage';

// Patient Pages (Modules 2 - 18, 21 - 28)
import { PatientDashboard } from '../pages/patient/PatientDashboard';
import { HealthDocumentLocker } from '../pages/patient/HealthDocumentLocker';
import { UploadAndExtract } from '../pages/patient/UploadAndExtract';
import { DocumentVerification } from '../pages/patient/DocumentVerification';
import { ShareRecords } from '../pages/patient/ShareRecords';
import { DoctorAccessRequests } from '../pages/patient/DoctorAccessRequests';
import { UnifiedHealthTimeline } from '../pages/patient/UnifiedHealthTimeline';
import { AppointmentsFollowups } from '../pages/patient/AppointmentsFollowups';
import { PrescriptionManagement } from '../pages/patient/PrescriptionManagement';
import { MedicineReminder } from '../pages/patient/MedicineReminder';
import { EmergencyProfileQR } from '../pages/patient/EmergencyProfileQR';
import { FamilyHealthHub } from '../pages/patient/FamilyHealthHub';
import { NearbyHospitals } from '../pages/patient/NearbyHospitals';
import { HospitalDetails } from '../pages/patient/HospitalDetails';
import { GovernmentSchemes } from '../pages/patient/GovernmentSchemes';
import { AIHealthAssistant } from '../pages/patient/AIHealthAssistant';
import { ConsentPrivacyCenter } from '../pages/patient/ConsentPrivacyCenter';
import { NotificationsPage } from '../pages/patient/NotificationsPage';
import { HealthRecordExport } from '../pages/patient/HealthRecordExport';
import { InsuranceTracker } from '../pages/patient/InsuranceTracker';
import { VaccinationTracker } from '../pages/patient/VaccinationTracker';
import { HealthCalendar } from '../pages/patient/HealthCalendar';
import { MedicalExpenseTracker } from '../pages/patient/MedicalExpenseTracker';
import { HealthAnalytics } from '../pages/patient/HealthAnalytics';
import { SettingsSecurity } from '../pages/patient/SettingsSecurity';

// Doctor Pages (Module 19 & associated)
import { DoctorDashboard } from '../pages/doctor/DoctorDashboard';
import { DoctorAppointments } from '../pages/doctor/DoctorAppointments';
import { DoctorPatientRecords } from '../pages/doctor/DoctorPatientRecords';
import { DoctorPrescriptions } from '../pages/doctor/DoctorPrescriptions';

// Laboratory Pages (Module 20 & associated)
import { LabDashboard } from '../pages/laboratory/LabDashboard';
import { LabTestRequests } from '../pages/laboratory/LabTestRequests';
import { LabUploadReport } from '../pages/laboratory/LabUploadReport';

// Admin Pages (Modules 29, 30 & associated)
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUserVerification } from '../pages/admin/AdminUserVerification';
import { AdminAuditLogs } from '../pages/admin/AdminAuditLogs';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile/setup" element={<ProfileSetupPage />} />
      <Route path="/profile/edit" element={<ProfileSetupPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Patient Portal Routes - Protected for Patients */}
      <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
        <Route path="/patient" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="health-locker" element={<HealthDocumentLocker />} />
          <Route path="upload-record" element={<UploadAndExtract />} />
          <Route path="document-verification" element={<DocumentVerification />} />
          <Route path="share-records" element={<ShareRecords />} />
          <Route path="access-requests" element={<DoctorAccessRequests />} />
          <Route path="timeline" element={<UnifiedHealthTimeline />} />
          <Route path="appointments" element={<AppointmentsFollowups />} />
          <Route path="prescriptions" element={<PrescriptionManagement />} />
          <Route path="medicine-reminders" element={<MedicineReminder />} />
          <Route path="emergency-profile" element={<EmergencyProfileQR />} />
          <Route path="family" element={<FamilyHealthHub />} />
          <Route path="nearby-hospitals" element={<NearbyHospitals />} />
          <Route path="hospitals/:id" element={<HospitalDetails />} />
          <Route path="government-schemes" element={<GovernmentSchemes />} />
          <Route path="ai-assistant" element={<AIHealthAssistant />} />
          <Route path="consent" element={<ConsentPrivacyCenter />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="export" element={<HealthRecordExport />} />
          <Route path="insurance" element={<InsuranceTracker />} />
          <Route path="vaccinations" element={<VaccinationTracker />} />
          <Route path="calendar" element={<HealthCalendar />} />
          <Route path="expenses" element={<MedicalExpenseTracker />} />
          <Route path="analytics" element={<HealthAnalytics />} />
          <Route path="settings" element={<SettingsSecurity />} />
        </Route>
      </Route>

      {/* Doctor Portal Routes - Protected for Doctors */}
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patient-records" element={<DoctorPatientRecords />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="access-requests" element={<DoctorAccessRequests />} />
        </Route>
      </Route>

      {/* Laboratory Portal Routes - Protected for Laboratory Staff */}
      <Route element={<ProtectedRoute allowedRoles={['laboratory']} />}>
        <Route path="/laboratory" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/laboratory/dashboard" replace />} />
          <Route path="dashboard" element={<LabDashboard />} />
          <Route path="test-requests" element={<LabTestRequests />} />
          <Route path="upload-report" element={<LabUploadReport />} />
          <Route path="report-history" element={<LabTestRequests />} />
        </Route>
      </Route>

      {/* Admin Console Routes - Strictly Protected for Authorized Administrators */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="verifications" element={<AdminUserVerification />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<SettingsSecurity />} />
        </Route>
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

