import {
  User,
  HealthRecord,
  SharedRecord,
  DoctorAccessRequest,
  TimelineEvent,
  Appointment,
  Prescription,
  MedicineReminderItem,
  EmergencyProfile,
  FamilyMember,
  HealthcareFacility,
  GovernmentScheme,
  ChatMessage,
  ConsentRecord,
  NotificationItem,
  VaccinationRecord,
  InsurancePolicy,
  MedicalExpense,
  HealthMetricPoint,
  LabTestRequest,
  AuditLogItem,
} from '../types';

export const mockCurrentUser: User = {
  id: 'usr-001',
  name: 'Patient1',
  email: 'patient1@aarovya.health',
  phone: '+91 98230 45678',
  role: 'patient',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  bloodGroup: 'B+',
  emergencyContact: '+91 98221 12345',
};

export const mockDoctors: User[] = [
  {
    id: 'doc-001',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@abchospital.com',
    phone: '+91 98765 11223',
    role: 'doctor',
    specialty: 'Cardiologist',
    facilityName: 'ABC Hospital / City Hospital',
    licenseNumber: 'MCI-CARD-49210',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: 'doc-002',
    name: 'Dr. Amit Verma',
    email: 'amit.verma@careclinic.com',
    phone: '+91 98765 22334',
    role: 'doctor',
    specialty: 'General Physician',
    facilityName: 'Care Clinic / City Hospital',
    licenseNumber: 'MCI-GEN-38102',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
  },
];

export const mockHealthRecords: HealthRecord[] = [
  {
    id: 'rec-001',
    title: 'Complete Blood Count (CBC) & Lipid Profile',
    fileName: 'Blood_Report.pdf',
    fileSize: '2.4 MB',
    category: 'reports',
    uploadDate: '24 Sep 2026',
    provider: 'ABC Hospital Diagnostics',
    doctorName: 'Dr. Priya Sharma',
    verificationStatus: 'provider_verified',
    verificationDate: '25 Sep 2026, 10:20 AM',
    fileUrl: '/mock/Blood_Report.pdf',
    tags: ['Blood Test', 'Lipid', 'CBC', 'Cardiology'],
    extractedDetails: {
      documentType: 'Blood Report',
      hospital: 'ABC Hospital',
      date: '24 Sep 2026',
      doctor: 'Dr. Priya Sharma',
      keyFindings: [
        'All vital counts within standard physiological ranges',
        'Serum cholesterol at 178 mg/dL (Normal)',
        'Hemoglobin steady at 13.2 g/dL'
      ],
      testResults: [
        { parameter: 'Hemoglobin', value: '13.2', unit: 'g/dL', range: '12.0 - 15.5', status: 'normal' },
        { parameter: 'WBC Count', value: '7,400', unit: '/µL', range: '4,500 - 11,000', status: 'normal' },
        { parameter: 'Platelets', value: '2.8', unit: 'lakh/µL', range: '1.5 - 4.5', status: 'normal' },
        { parameter: 'Total Cholesterol', value: '178', unit: 'mg/dL', range: '< 200', status: 'normal' },
        { parameter: 'Fasting Blood Sugar', value: '92', unit: 'mg/dL', range: '70 - 100', status: 'normal' }
      ]
    },
    verificationTimeline: [
      { title: 'Uploaded by Patient', timestamp: '24 Sep 2026, 09:10 AM', actor: 'Patient1 (Patient)', completed: true },
      { title: 'Verification Requested', timestamp: '24 Sep 2026, 09:36 AM', actor: 'Automated System Dispatch', completed: true },
      { title: 'Verified by Provider', timestamp: '25 Sep 2026, 10:20 AM', actor: 'ABC Hospital Diagnostics Lab', completed: true }
    ]
  },
  {
    id: 'rec-002',
    title: 'Brain & Spine MRI Contrast Scan',
    fileName: 'MRI_Scan.pdf',
    fileSize: '8.7 MB',
    category: 'reports',
    uploadDate: '18 Sep 2026',
    provider: 'Apollo Scan Center',
    doctorName: 'Dr. Suresh Rao',
    verificationStatus: 'provider_verified',
    verificationDate: '19 Sep 2026, 02:15 PM',
    fileUrl: '/mock/MRI_Scan.pdf',
    tags: ['MRI', 'Imaging', 'Spine', 'Neurology'],
    extractedDetails: {
      documentType: 'MRI Scan',
      hospital: 'Apollo Scan Center',
      date: '18 Sep 2026',
      doctor: 'Dr. Suresh Rao',
      keyFindings: ['No focal lesions', 'Normal cervical lordosis']
    }
  },
  {
    id: 'rec-003',
    title: 'Post-Viral Recovery & Hypertension Rx',
    fileName: 'Prescription_Sep2026.pdf',
    fileSize: '1.1 MB',
    category: 'prescriptions',
    uploadDate: '24 Sep 2026',
    provider: 'ABC Hospital Cardiology OPD',
    doctorName: 'Dr. Priya Sharma',
    verificationStatus: 'verified',
    verificationDate: '24 Sep 2026, 11:30 AM',
    fileUrl: '/mock/Prescription_Sep2026.pdf',
    tags: ['Prescription', 'Cardio', 'Amoxicillin'],
    extractedDetails: {
      documentType: 'Prescription',
      hospital: 'ABC Hospital',
      date: '24 Sep 2026',
      doctor: 'Dr. Priya Sharma'
    }
  },
  {
    id: 'rec-004',
    title: 'Cardiology Follow-Up Consultation Notes',
    fileName: 'Consultation_Notes_Aug.pdf',
    fileSize: '650 KB',
    category: 'consultations',
    uploadDate: '20 Sep 2026',
    provider: 'City Heart Clinic',
    doctorName: 'Dr. Priya Sharma',
    verificationStatus: 'verified',
    fileUrl: '/mock/Consultation_Notes_Aug.pdf',
    tags: ['Consultation', 'Cardiology']
  },
  {
    id: 'rec-005',
    title: 'Chest X-Ray PA View Digital Radiograph',
    fileName: 'Chest_XRay_PA.pdf',
    fileSize: '3.9 MB',
    category: 'reports',
    uploadDate: '12 Aug 2026',
    provider: 'XYZ Super Specialty Hospital',
    doctorName: 'Dr. Amit Verma',
    verificationStatus: 'verified',
    fileUrl: '/mock/Chest_XRay_PA.pdf',
    tags: ['X-Ray', 'Radiology', 'Lungs']
  },
  {
    id: 'rec-006',
    title: 'Inpatient Hospital Discharge Summary',
    fileName: 'Discharge_Summary_2025.pdf',
    fileSize: '1.8 MB',
    category: 'discharge',
    uploadDate: '15 Jan 2026',
    provider: 'Ruby Hall Clinic',
    doctorName: 'Dr. K. Mehta',
    verificationStatus: 'verified',
    fileUrl: '/mock/Discharge_Summary_2025.pdf',
    tags: ['Discharge', 'Hospitalization']
  },
  {
    id: 'rec-007',
    title: 'Adult Tetanus Toxoid & Flu Booster Certificate',
    fileName: 'Vaccination_Certificate_2026.pdf',
    fileSize: '540 KB',
    category: 'vaccination',
    uploadDate: '10 Jun 2026',
    provider: 'Government Civil Dispensary',
    verificationStatus: 'verified',
    fileUrl: '/mock/Vaccination_Certificate_2026.pdf',
    tags: ['Vaccination', 'Tetanus', 'Govt']
  },
  {
    id: 'rec-008',
    title: 'HDFC ERGO Health Suraksha Policy Document',
    fileName: 'HDFC_Health_Policy_2026_27.pdf',
    fileSize: '2.1 MB',
    category: 'insurance',
    uploadDate: '01 Jul 2026',
    provider: 'HDFC ERGO General Insurance',
    verificationStatus: 'verified',
    fileUrl: '/mock/HDFC_Health_Policy_2026_27.pdf',
    tags: ['Insurance', 'Cashless', 'Policy']
  },
  {
    id: 'rec-009',
    title: 'Thyroid Stimulating Hormone (TSH) Lab Panel',
    fileName: 'Thyroid_Profile_July.pdf',
    fileSize: '1.5 MB',
    category: 'reports',
    uploadDate: '05 Jul 2026',
    provider: 'Metropolis Healthcare',
    doctorName: 'Dr. Amit Verma',
    verificationStatus: 'pending',
    fileUrl: '/mock/Thyroid_Profile_July.pdf',
    tags: ['Thyroid', 'Endocrinology', 'TSH']
  }
];

export const mockDoctorAccessRequests: DoctorAccessRequest[] = [
  {
    id: 'req-001',
    doctorName: 'Dr. Priya Sharma',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    specialty: 'Cardiologist',
    hospital: 'ABC Hospital',
    requestedDate: '24 Sep 2026, 10:20 AM',
    reason: 'Follow-up consultation and review of updated lipid & blood profiles',
    status: 'pending',
  },
  {
    id: 'req-002',
    doctorName: 'Dr. Amit Verma',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    specialty: 'General Physician',
    hospital: 'City Hospital',
    requestedDate: '23 Sep 2026, 04:15 PM',
    reason: 'Routine seasonal check-up and preventive prescription audit',
    status: 'pending',
  },
  {
    id: 'req-003',
    doctorName: 'Dr. Rajesh Deshmukh',
    doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Sancheti Orthopedic Hospital',
    requestedDate: '15 Aug 2026, 11:00 AM',
    reason: 'Knee joint diagnostic assessment',
    status: 'active',
    validUntil: '15 Oct 2026',
  },
  {
    id: 'req-004',
    doctorName: 'Dr. Neha Kulkarni',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813583-490b6a22f360?auto=format&fit=crop&q=80&w=200',
    specialty: 'Dermatologist',
    hospital: 'Skin & Laser Center',
    requestedDate: '10 Jun 2026, 02:30 PM',
    reason: 'Allergy panel evaluation',
    status: 'history',
  }
];

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl-001',
    date: '24 Sep 2026',
    year: 2026,
    type: 'blood_test',
    title: 'Complete Blood Count (CBC) & Lipid Test',
    provider: 'ABC Hospital Diagnostics',
    doctor: 'Dr. Priya Sharma',
    summary: 'CBC normal. Total cholesterol 178 mg/dL. All inflammatory markers within normal boundaries.',
    recordId: 'rec-001'
  },
  {
    id: 'tl-002',
    date: '20 Sep 2026',
    year: 2026,
    type: 'consultation',
    title: 'Cardiology Consultation',
    provider: 'ABC Hospital OPD Clinic',
    doctor: 'Dr. Priya Sharma',
    summary: 'Blood pressure check 118/76 mmHg. Heart sounds normal. Prescribed proactive antibiotic & antipyretic course.',
    recordId: 'rec-004'
  },
  {
    id: 'tl-003',
    date: '20 Sep 2026',
    year: 2026,
    type: 'prescription',
    title: 'Prescription Issued (Paracetamol & Amoxicillin)',
    provider: 'ABC Hospital Pharmacy',
    doctor: 'Dr. Priya Sharma',
    summary: 'Paracetamol 500mg (bid x 5d), Amoxicillin 500mg (bid x 7d).',
    recordId: 'rec-003'
  },
  {
    id: 'tl-004',
    date: '12 Aug 2026',
    year: 2026,
    type: 'xray',
    title: 'Chest X-Ray PA View',
    provider: 'XYZ Hospital Radiology',
    doctor: 'Dr. Amit Verma',
    summary: 'Clear lung fields bilaterally. Normal cardiac silhouette. No pleural effusion.',
    recordId: 'rec-005'
  },
  {
    id: 'tl-005',
    date: '10 Jun 2026',
    year: 2026,
    type: 'vaccination',
    title: 'Adult Tetanus Booster Dose',
    provider: 'Govt. Civil Hospital',
    summary: 'Administered 0.5 mL IM. Batch #TT-9482. No adverse side effects noted.',
    recordId: 'rec-007'
  },
  {
    id: 'tl-006',
    date: '15 Jan 2026',
    year: 2026,
    type: 'discharge',
    title: 'Discharge Post Day-Care Endoscopy',
    provider: 'Ruby Hall Clinic',
    doctor: 'Dr. K. Mehta',
    summary: 'Procedure uneventful. Mild gastritis identified, managed with antacids.',
    recordId: 'rec-006'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    doctorName: 'Dr. Priya Sharma',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    specialty: 'Cardiologist',
    hospital: 'City Hospital',
    date: '28 Sep 2026',
    time: '11:00 AM',
    status: 'upcoming',
    type: 'appointment',
    reason: 'Quarterly cardiac review & ECG check'
  },
  {
    id: 'apt-002',
    doctorName: 'Dr. Amit Verma',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    specialty: 'General Physician',
    hospital: 'Care Clinic',
    date: '05 Oct 2026',
    time: '04:00 PM',
    status: 'upcoming',
    type: 'followup',
    reason: 'Follow-up on seasonal allergies'
  },
  {
    id: 'apt-003',
    doctorName: 'Dr. Rajesh Deshmukh',
    doctorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Sancheti Hospital',
    date: '12 Sep 2026',
    time: '10:30 AM',
    status: 'completed',
    type: 'appointment',
    reason: 'Knee assessment'
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx-001',
    patientName: 'Patient1',
    doctorName: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    hospital: 'ABC Hospital',
    date: '24 Sep 2026',
    diagnosis: 'Mild Bronchial Congestion & Preventive Prophylaxis',
    notes: 'Drink plenty of warm fluids. Take medicines after meals. Avoid strenuous cardiovascular exertion for 48 hours.',
    pdfUrl: '/mock/Prescription_Sep2026.pdf',
    medicines: [
      {
        id: 'med-001',
        name: 'Paracetamol 500 mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        duration: '5 days',
        instructions: 'Post-breakfast and post-dinner',
        timing: ['08:00 AM', '08:00 PM']
      },
      {
        id: 'med-002',
        name: 'Amoxicillin 500 mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        duration: '7 days',
        instructions: 'Complete full antimicrobial course strictly',
        timing: ['01:00 PM', '09:00 PM']
      }
    ]
  }
];

export const mockMedicineReminders: MedicineReminderItem[] = [
  {
    id: 'rem-001',
    time: '08:00 AM',
    scheduledTime: '08:00 AM',
    medicineName: 'Paracetamol 500 mg',
    dosage: '1 tablet',
    instructions: 'Take with warm water after breakfast',
    taken: true,
  },
  {
    id: 'rem-002',
    time: '01:00 PM',
    scheduledTime: '01:00 PM',
    medicineName: 'Amoxicillin 500 mg',
    dosage: '1 tablet',
    instructions: 'Take 30 mins after lunch',
    taken: false,
  },
  {
    id: 'rem-003',
    time: '09:00 PM',
    scheduledTime: '09:00 PM',
    medicineName: 'Amoxicillin 500 mg',
    dosage: '1 tablet',
    instructions: 'Take after dinner before sleeping',
    taken: false,
  }
];

export const mockEmergencyProfile: EmergencyProfile = {
  bloodGroup: 'B+',
  allergies: ['Dust', 'Pollen', 'Penicillin (Mild)'],
  conditions: ['Mild Bronchial Asthma'],
  organDonor: true,
  emergencyNotes: 'Carries emergency salbutamol inhaler in handbag. No history of diabetic seizures.',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://aarovya.health/emergency/usr-001-emergency-vitals',
  emergencyContacts: [
    { name: 'PRQ', relationship: 'Father', phone: '+91 98221 12345' },
    { name: 'ABC', relationship: 'Mother', phone: '+91 98221 54321' },
    { name: 'XYZ', relationship: 'Brother', phone: '+91 98221 99887' }
  ]
};

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'fam-001',
    name: 'Patient1',
    relationship: 'Self',
    bloodGroup: 'B+',
    age: 26,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    recordCount: 42,
    authorizedAccess: true,
  },
  {
    id: 'fam-002',
    name: 'PRQ',
    relationship: 'Father',
    bloodGroup: 'B+',
    age: 58,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    recordCount: 18,
    authorizedAccess: true,
  },
  {
    id: 'fam-003',
    name: 'ABC',
    relationship: 'Mother',
    bloodGroup: 'O+',
    age: 54,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    recordCount: 24,
    authorizedAccess: true,
  },
  {
    id: 'fam-004',
    name: 'XYZ',
    relationship: 'Brother',
    bloodGroup: 'O+',
    age: 22,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    recordCount: 9,
    authorizedAccess: true,
  }
];

export const mockFacilities: HealthcareFacility[] = [
  {
    id: 'fac-001',
    name: 'City Hospital & Heart Institute',
    type: 'Hospital',
    rating: 4.5,
    reviewsCount: 124,
    distanceKm: 2.3,
    address: '123 Health Street, Shivajinagar, Pune 411005',
    phone: '+91 98765 43210',
    emergency24x7: true,
    hospitalType: 'Private',
    departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Radiology', 'Trauma Care'],
    facilities: ['24x7 Trauma Center', 'ICU & CCU', 'Cath Lab', 'Advanced MRI 3T', 'Pharmacy', 'Ambulance'],
    doctors: [
      { name: 'Dr. Priya Sharma', specialty: 'Cardiologist', available: true },
      { name: 'Dr. Rajesh Deshmukh', specialty: 'Orthopedics', available: true },
      { name: 'Dr. Ananya Roy', specialty: 'Neurologist', available: false }
    ],
    latitude: 18.5204,
    longitude: 73.8567
  },
  {
    id: 'fac-002',
    name: 'District Civil General Hospital',
    type: 'Hospital',
    rating: 4.1,
    reviewsCount: 380,
    distanceKm: 3.8,
    address: 'Near Old Railway Station, Central Pune 411001',
    phone: '+91 20 2612 3456',
    emergency24x7: true,
    hospitalType: 'Government',
    departments: ['General Medicine', 'Obstetrics & Gynae', 'Pediatrics', 'Surgery', 'ENT', 'Eye Clinic'],
    facilities: ['Ayushman Bharat Ward', 'Blood Bank', 'Free Generic Pharmacy', 'Emergency Triage'],
    doctors: [
      { name: 'Dr. Amit Verma', specialty: 'Chief Medical Officer', available: true },
      { name: 'Dr. M. S. Patil', specialty: 'General Surgeon', available: true }
    ],
    latitude: 18.5312,
    longitude: 73.8745
  },
  {
    id: 'fac-003',
    name: 'ABC Diagnostics & Molecular Pathology',
    type: 'Lab',
    rating: 4.8,
    reviewsCount: 215,
    distanceKm: 1.6,
    address: 'Plot 45, FC Road, Pune 411004',
    phone: '+91 20 6789 0123',
    emergency24x7: false,
    hospitalType: 'Private',
    departments: ['Biochemistry', 'Hematology', 'Microbiology', 'Histopathology', 'Genomics'],
    facilities: ['Home Sample Collection', 'Online NABL Reports in 4 Hours', 'Drive-Through Phlebotomy'],
    doctors: [
      { name: 'Dr. V. K. Joshi', specialty: 'Pathologist', available: true }
    ],
    latitude: 18.5180,
    longitude: 73.8410
  },
  {
    id: 'fac-004',
    name: 'MedPlus 24x7 Super Pharmacy',
    type: 'Pharmacy',
    rating: 4.6,
    reviewsCount: 89,
    distanceKm: 0.9,
    address: 'Shop 12, Sunrise Plaza, Model Colony, Pune',
    phone: '+91 98220 98765',
    emergency24x7: true,
    hospitalType: 'Private',
    departments: ['Prescription Medicines', 'Critical Care Injectables', 'Surgical Supplies'],
    facilities: ['Home Delivery in 30 Mins', 'Refrigerated Insulin Storage', 'Generic Equivalents'],
    doctors: [],
    latitude: 18.5300,
    longitude: 73.8350
  }
];

export const mockGovernmentSchemes: GovernmentScheme[] = [
  {
    id: 'sch-001',
    name: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    officialShortName: 'AB PM-JAY',
    type: 'Central',
    coverage: '₹5,00,000 per family per year',
    description: 'World’s largest government-funded healthcare assurance scheme offering secondary and tertiary hospitalization coverage to over 12 crore poor and vulnerable families.',
    eligibility: [
      'Families categorized under Socio-Economic Caste Census (SECC 2011)',
      'Active Ayushman Card holders',
      'No cap on family size or age of family members'
    ],
    benefits: [
      'Cashless and paperless access to services at empanelled public and private hospitals across India',
      'Covers up to 3 days of pre-hospitalization and 15 days of post-hospitalization expenses',
      'Approximately 1,949 medical procedures covered including surgeries, diagnostics, and medicines'
    ],
    officialUrl: 'https://pmjay.gov.in',
    documentsRequired: ['Aadhaar Card', 'Ration Card', 'PM-JAY Family ID or Letter']
  },
  {
    id: 'sch-002',
    name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
    officialShortName: 'MJPJAY',
    type: 'State',
    stateName: 'Maharashtra',
    coverage: '₹5,00,000 per family per year',
    description: 'Flagship health insurance scheme of the Government of Maharashtra providing universal health coverage for catastrophic illnesses to all ration card holding citizens in the state.',
    eligibility: [
      'Holders of Yellow, Orange, or White Ration Cards residing in Maharashtra',
      'Farmers from 14 agriculturally distressed districts of Maharashtra',
      'Inmates of government orphanages and ashram shalas'
    ],
    benefits: [
      'Cashless hospital care across 1,356 identified medical and surgical procedures',
      'Includes specialized cancer care, renal transplants, bypass surgeries, and polytrauma',
      'Free consultations and follow-up medications up to 10 days post-discharge'
    ],
    officialUrl: 'https://www.jeevandayee.gov.in',
    documentsRequired: ['Ration Card', 'Aadhaar Card or Voter ID', 'Doctor Referral Slip']
  },
  {
    id: 'sch-003',
    name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
    officialShortName: 'PMSMA',
    type: 'Central',
    coverage: 'Free Comprehensive Antenatal Care',
    description: 'An initiative providing assured, comprehensive, and quality antenatal care, free of cost, universally to all pregnant women on the 9th of every month.',
    eligibility: [
      'All pregnant women in their 2nd or 3rd trimesters',
      'Applicable universally across rural and urban government health centers'
    ],
    benefits: [
      'Specialized OBGYN consultations',
      'Free ultrasound sonography (USG), blood investigations, and iron-folic supplements',
      'Early identification and tagging of high-risk pregnancies'
    ],
    officialUrl: 'https://pmsma.mohfw.gov.in',
    documentsRequired: ['Mother-Child Protection (MCP) Card', 'Aadhaar Card']
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    sender: 'assistant',
    content: 'Hello Patient1! I am your AAROVYA AI Health Assistant. I can help interpret lab reports, explain prescriptions, and track your health vitals. How can I assist you today?',
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-002',
    sender: 'user',
    content: 'Summarize my latest blood report',
    timestamp: '10:02 AM'
  },
  {
    id: 'msg-003',
    sender: 'assistant',
    content: 'Here is a clinical summary of your latest blood report (CBC & Lipid Profile from ABC Hospital, 24 Sep 2026):',
    timestamp: '10:02 AM',
    reportAnalysis: {
      testName: 'Complete Blood Count & Lipid Profile',
      highlights: [
        { parameter: 'Hemoglobin', result: '13.2 g/dL (Normal: 12.0 - 15.5)', status: 'normal' },
        { parameter: 'WBC Count', result: '7,400 /µL (Normal: 4,500 - 11,000)', status: 'normal' },
        { parameter: 'Platelets', result: '2.8 lakh/µL (Normal: 1.5 - 4.5)', status: 'normal' },
        { parameter: 'Total Cholesterol', result: '178 mg/dL (Desirable: < 200)', status: 'normal' },
        { parameter: 'Fasting Blood Sugar', result: '92 mg/dL (Normal: 70 - 100)', status: 'normal' }
      ],
      summary: 'Overall: All key physiological parameters are within standard healthy ranges. No indicators of acute infection or metabolic strain.',
      recommendations: [
        'Maintain balanced hydration and dietary fiber intake',
        'Continue regular 30-minute brisk morning walks',
        'Next routine preventive screening recommended in March 2027'
      ]
    }
  }
];

export const mockConsentRecords: ConsentRecord[] = [
  {
    id: 'cst-001',
    entityName: 'Dr. Priya Sharma',
    entityRole: 'Cardiologist (ABC Hospital)',
    accessItems: ['Lab Reports', 'Prescriptions', 'Clinical Timeline'],
    grantedDate: '24 Sep 2026',
    expiresDate: '30 Sep 2026',
    status: 'active'
  },
  {
    id: 'cst-002',
    entityName: 'City Diagnostics Lab',
    entityRole: 'Diagnostic Service Provider',
    accessItems: ['Upload Lab Reports', 'View Referral Slip'],
    grantedDate: '20 Sep 2026',
    expiresDate: '10 Oct 2026',
    status: 'active'
  },
  {
    id: 'cst-003',
    entityName: 'Apollo Scan Center',
    entityRole: 'Imaging Radiology Facility',
    accessItems: ['Upload MRI Scans'],
    grantedDate: '18 Sep 2026',
    expiresDate: '25 Sep 2026',
    status: 'active'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-001',
    title: 'Appointment Reminder',
    message: 'Your consultation with Dr. Priya Sharma is scheduled for tomorrow at 11:00 AM at City Hospital.',
    timestamp: '2 hours ago',
    category: 'appointment',
    read: false,
    link: '/patient/appointments'
  },
  {
    id: 'notif-002',
    title: 'Document Verified',
    message: 'Blood_Report.pdf has been successfully verified by ABC Hospital Diagnostics with Provider Stamp.',
    timestamp: '5 hours ago',
    category: 'record',
    read: false,
    link: '/patient/health-locker'
  },
  {
    id: 'notif-003',
    title: 'Doctor Access Request',
    message: 'Dr. Amit Verma has requested temporary access to your recent blood and imaging records.',
    timestamp: '1 day ago',
    category: 'access',
    read: true,
    link: '/patient/access-requests'
  },
  {
    id: 'notif-004',
    title: 'Medicine Refill Notification',
    message: 'Your current supply of Amoxicillin 500mg is scheduled to end in 3 days. Refill available nearby.',
    timestamp: '2 days ago',
    category: 'system',
    read: true,
    link: '/patient/medicine-reminders'
  }
];

export const mockVaccinations: VaccinationRecord[] = [
  {
    id: 'vac-001',
    vaccineName: 'COVID-19 (Covishield Booster)',
    dateAdministered: '12 Jun 2021',
    hospital: 'Civil Hospital Vaccination Center',
    status: 'Completed',
    batchNumber: 'COV-82910-A'
  },
  {
    id: 'vac-002',
    vaccineName: 'Hepatitis B (3rd Dose)',
    dateAdministered: '18 Aug 2022',
    hospital: 'Apex Care Clinic',
    status: 'Completed',
    batchNumber: 'HEP-54129'
  },
  {
    id: 'vac-003',
    vaccineName: 'Tetanus Toxoid (TT Booster)',
    dateAdministered: '10 Jun 2024',
    nextDoseDate: '10 Jun 2034',
    hospital: 'Government Civil Dispensary',
    status: 'Completed',
    batchNumber: 'TT-9482'
  },
  {
    id: 'vac-004',
    vaccineName: 'Annual Influenza (Flu) Vaccine',
    dateAdministered: 'Scheduled for 15 Nov 2026',
    hospital: 'City Hospital Wellness Wing',
    status: 'Scheduled'
  }
];

export const mockInsurancePolicy: InsurancePolicy = {
  providerName: 'HDFC ERGO Health Suraksha',
  policyNumber: '1234567890',
  validUntil: '30 Jun 2027',
  coverageAmount: 1000000,
  status: 'Active',
  cashlessHospitalsCount: 14500,
  totalExpensesYear: 24500
};

export const mockMedicalExpenses: MedicalExpense[] = [
  {
    id: 'exp-001',
    date: '24 Sep 2026',
    category: 'Consultation',
    amount: 800,
    hospitalOrVendor: 'City Hospital (Dr. Priya Sharma)',
    receiptNumber: 'REC-2026-901'
  },
  {
    id: 'exp-002',
    date: '24 Sep 2026',
    category: 'Lab Test',
    amount: 1250,
    hospitalOrVendor: 'ABC Hospital Diagnostics (CBC + Lipid)',
    receiptNumber: 'LAB-2026-442'
  },
  {
    id: 'exp-003',
    date: '20 Sep 2026',
    category: 'Medicines',
    amount: 2400,
    hospitalOrVendor: 'MedPlus 24x7 Super Pharmacy',
    receiptNumber: 'RX-2026-781'
  },
  {
    id: 'exp-004',
    date: '12 Aug 2026',
    category: 'Procedures',
    amount: 3200,
    hospitalOrVendor: 'XYZ Super Specialty (Chest X-Ray & ECG)',
    receiptNumber: 'PROC-2026-118'
  },
  {
    id: 'exp-005',
    date: '05 Jul 2026',
    category: 'Lab Test',
    amount: 950,
    hospitalOrVendor: 'Metropolis Diagnostics (Thyroid Panel)',
    receiptNumber: 'LAB-2026-109'
  }
];

export const mockHealthMetrics: HealthMetricPoint[] = [
  { month: 'Apr', weight: 59.2, systolic: 122, diastolic: 80, bloodSugar: 98, heartRate: 74 },
  { month: 'May', weight: 58.8, systolic: 120, diastolic: 78, bloodSugar: 95, heartRate: 72 },
  { month: 'Jun', weight: 58.5, systolic: 119, diastolic: 77, bloodSugar: 94, heartRate: 71 },
  { month: 'Jul', weight: 58.3, systolic: 118, diastolic: 76, bloodSugar: 91, heartRate: 70 },
  { month: 'Aug', weight: 58.1, systolic: 117, diastolic: 75, bloodSugar: 93, heartRate: 69 },
  { month: 'Sep', weight: 58.0, systolic: 118, diastolic: 76, bloodSugar: 92, heartRate: 70 }
];

export const mockLabTestRequests: LabTestRequest[] = [
  {
    id: 'lab-req-001',
    patientName: 'Patient1',
    patientPhone: '+91 98230 45678',
    testName: 'Complete Blood Count (CBC) & Lipid Profile',
    requestedDate: '24 Sep 2026, 08:30 AM',
    referringDoctor: 'Dr. Priya Sharma',
    status: 'Completed',
    reportUrl: '/mock/Blood_Report.pdf'
  },
  {
    id: 'lab-req-002',
    patientName: 'Rohan Patil',
    patientPhone: '+91 97654 32109',
    testName: 'Thyroid Panel (T3, T4, TSH) & HbA1c',
    requestedDate: '24 Sep 2026, 10:15 AM',
    referringDoctor: 'Dr. Amit Verma',
    status: 'In-Progress'
  },
  {
    id: 'lab-req-003',
    patientName: 'Kavita Joshi',
    patientPhone: '+91 98901 23456',
    testName: 'Liver Function Test (LFT) & Kidney Profile (KFT)',
    requestedDate: '25 Sep 2026, 09:00 AM',
    referringDoctor: 'Dr. Priya Sharma',
    status: 'Pending'
  },
  {
    id: 'lab-req-004',
    patientName: 'Suresh Deshmukh',
    patientPhone: '+91 94220 11223',
    testName: 'Urine Routine & Microscopic Culture',
    requestedDate: '25 Sep 2026, 09:45 AM',
    referringDoctor: 'Dr. Rajesh Deshmukh',
    status: 'Pending'
  }
];

export const mockAuditLogs: AuditLogItem[] = [
  {
    id: 'aud-001',
    timestamp: '25 Sep 2026, 10:20 AM',
    user: 'Dr. Priya Sharma',
    role: 'Doctor',
    action: 'View',
    details: 'Viewed patient record Blood_Report.pdf (Access authorized)',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'aud-002',
    timestamp: '24 Sep 2026, 09:36 AM',
    user: 'Patient1',
    role: 'Patient',
    action: 'Share',
    details: 'Generated 7-day secure access link for 2 clinical documents',
    ipAddress: '103.21.124.9'
  },
  {
    id: 'aud-003',
    timestamp: '24 Sep 2026, 08:15 AM',
    user: 'Lab Tech (ABC Diagnostics)',
    role: 'Lab Staff',
    action: 'Upload',
    details: 'Uploaded verified laboratory report CBC_Lipid_Test.pdf',
    ipAddress: '192.168.4.52'
  },
  {
    id: 'aud-004',
    timestamp: '22 Sep 2026, 02:10 PM',
    user: 'Admin (System)',
    role: 'Admin',
    action: 'Verify',
    details: 'Approved medical license verification for Dr. Priya Sharma',
    ipAddress: '10.0.0.1'
  },
  {
    id: 'aud-005',
    timestamp: '20 Sep 2026, 11:30 AM',
    user: 'Dr. Priya Sharma',
    role: 'Doctor',
    action: 'Upload',
    details: 'Issued digital prescription Prescription_Sep2026.pdf',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'aud-006',
    timestamp: '18 Sep 2026, 03:45 PM',
    user: 'Patient1',
    role: 'Patient',
    action: 'Revoke',
    details: 'Revoked third-party insurance access grant #CST-088',
    ipAddress: '103.21.124.9'
  }
];

export const mockAdminStats = {
  totalUsers: 1250,
  doctors: 120,
  hospitals: 40,
  labs: 35,
  userVerifications: {
    total: 195,
    verified: 148,
    pending: 32,
    rejected: 15
  }
};

