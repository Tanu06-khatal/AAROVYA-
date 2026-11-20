export type UserRole = 'patient' | 'doctor' | 'laboratory' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  bloodGroup?: string;
  specialty?: string; // For doctors
  licenseNumber?: string; // For doctors / labs
  facilityName?: string; // For lab / doctor
  emergencyContact?: string;
}

export type RecordCategory = 
  | 'reports' 
  | 'prescriptions' 
  | 'consultations' 
  | 'discharge' 
  | 'vaccination' 
  | 'insurance';

export type VerificationStatus = 
  | 'verified' 
  | 'provider_verified' 
  | 'pending' 
  | 'rejected';

export interface ExtractedDetails {
  documentType: string;
  hospital: string;
  date: string;
  doctor: string;
  keyFindings?: string[];
  testResults?: { parameter: string; value: string; unit: string; range: string; status: 'normal' | 'high' | 'low' }[];
}

export interface VerificationTimelineStep {
  title: string;
  timestamp: string;
  actor: string;
  completed: boolean;
}

export interface HealthRecord {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  category: RecordCategory;
  uploadDate: string;
  provider: string;
  doctorName?: string;
  verificationStatus: VerificationStatus;
  verificationDate?: string;
  extractedDetails?: ExtractedDetails;
  fileUrl: string;
  tags: string[];
  verificationTimeline?: VerificationTimelineStep[];
}

export interface SharedRecord {
  id: string;
  recordIds: string[];
  recipientName: string;
  recipientRole: string;
  recipientHospital?: string;
  permissions: {
    viewOnly: boolean;
    download: boolean;
  };
  expiryDuration: string;
  expiryDate: string;
  shareLink: string;
  status: 'active' | 'revoked' | 'expired';
  createdAt: string;
}

export interface DoctorAccessRequest {
  id: string;
  doctorName: string;
  doctorAvatar?: string;
  specialty: string;
  hospital: string;
  requestedDate: string;
  reason: string;
  status: 'pending' | 'active' | 'rejected' | 'history';
  validUntil?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  type: 'blood_test' | 'consultation' | 'prescription' | 'xray' | 'vaccination' | 'discharge';
  title: string;
  provider: string;
  doctor?: string;
  summary: string;
  recordId?: string;
}

export interface Appointment {
  id: string;
  patientId?: string;
  patientName?: string;
  doctorName: string;
  doctorAvatar?: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'appointment' | 'followup';
  reason?: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  timing: string[];
}

export interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  medicines: Medicine[];
  diagnosis: string;
  notes: string;
  pdfUrl: string;
}

export interface MedicineReminderItem {
  id: string;
  time: string;
  medicineName: string;
  dosage: string;
  instructions: string;
  taken: boolean;
  scheduledTime: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface EmergencyProfile {
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  emergencyContacts: EmergencyContact[];
  qrCodeUrl: string;
  organDonor: boolean;
  emergencyNotes: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'Self' | 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Spouse' | 'Child';
  bloodGroup: string;
  age: number;
  gender: string;
  avatar?: string;
  recordCount: number;
  authorizedAccess: boolean;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'Hospital' | 'Lab' | 'Pharmacy';
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  address: string;
  phone: string;
  emergency24x7: boolean;
  hospitalType: 'Private' | 'Government' | 'Trust';
  departments: string[];
  facilities: string[];
  doctors: { name: string; specialty: string; available: boolean }[];
  latitude: number;
  longitude: number;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  officialShortName: string;
  type: 'Central' | 'State';
  stateName?: string;
  coverage: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  officialUrl: string;
  documentsRequired: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  reportAnalysis?: {
    testName: string;
    highlights: { parameter: string; result: string; status: 'normal' | 'attention' | 'critical' }[];
    summary: string;
    recommendations: string[];
  };
}

export interface ConsentRecord {
  id: string;
  entityName: string;
  entityRole: string;
  accessItems: string[];
  grantedDate: string;
  expiresDate: string;
  status: 'active' | 'revoked';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'appointment' | 'record' | 'access' | 'system';
  read: boolean;
  link?: string;
}

export interface VaccinationRecord {
  id: string;
  vaccineName: string;
  dateAdministered: string;
  nextDoseDate?: string;
  hospital: string;
  status: 'Completed' | 'Scheduled' | 'Upcoming';
  batchNumber?: string;
  certificateUrl?: string;
}

export interface InsurancePolicy {
  providerName: string;
  policyNumber: string;
  validUntil: string;
  coverageAmount: number;
  status: 'Active' | 'Pending Renewal' | 'Expired';
  cashlessHospitalsCount: number;
  totalExpensesYear: number;
}

export interface MedicalExpense {
  id: string;
  date: string;
  category: 'Consultation' | 'Lab Test' | 'Medicines' | 'Procedures' | 'Emergency';
  amount: number;
  hospitalOrVendor: string;
  receiptNumber?: string;
}

export interface HealthMetricPoint {
  month: string;
  weight: number;
  systolic: number;
  diastolic: number;
  bloodSugar: number;
  heartRate: number;
}

export interface LabTestRequest {
  id: string;
  patientName: string;
  patientPhone: string;
  testName: string;
  requestedDate: string;
  referringDoctor: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
  reportUrl?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: 'Patient' | 'Doctor' | 'Lab Staff' | 'Admin';
  action: 'View' | 'Share' | 'Upload' | 'Verify' | 'Revoke' | 'Login' | 'Update';
  details: string;
  ipAddress?: string;
}

