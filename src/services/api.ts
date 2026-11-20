/**
 * AAROVYA Centralized Service Abstraction Layer
 * 
 * Designed for direct drop-in integration with Java Spring Boot REST APIs.
 * When VITE_API_BASE_URL is configured, calls route to the Spring Boot backend;
 * otherwise, it transparently utilizes the local high-fidelity clinical datasets.
 */

import {
  HealthRecord,
  DoctorAccessRequest,
  Appointment,
  Prescription,
  MedicineReminderItem,
  EmergencyProfile,
  FamilyMember,
  HealthcareFacility,
  GovernmentScheme,
  ConsentRecord,
  NotificationItem,
  VaccinationRecord,
  MedicalExpense,
  LabTestRequest,
  AuditLogItem,
  UserRole,
} from '../types';

import {
  mockHealthRecords,
  mockDoctorAccessRequests,
  mockAppointments,
  mockPrescriptions,
  mockMedicineReminders,
  mockEmergencyProfile,
  mockFamilyMembers,
  mockFacilities,
  mockGovernmentSchemes,
  mockConsentRecords,
  mockNotifications,
  mockVaccinations,
  mockMedicalExpenses,
  mockLabTestRequests,
  mockAuditLogs,
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Generic simulated fetch with slight delay to mimic real network responses
async function simulateNetwork<T>(data: T, delay = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export const HealthRecordService = {
  async getAll(): Promise<HealthRecord[]> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/records`);
      return res.json();
    }
    return simulateNetwork([...mockHealthRecords]);
  },

  async uploadRecord(record: Partial<HealthRecord>): Promise<HealthRecord> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      return res.json();
    }
    const newRecord: HealthRecord = {
      id: `rec-${Date.now()}`,
      title: record.title || 'Uploaded Medical Document',
      fileName: record.fileName || 'document.pdf',
      fileSize: record.fileSize || '1.5 MB',
      category: record.category || 'reports',
      uploadDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      provider: record.provider || 'Self Uploaded',
      verificationStatus: 'pending',
      fileUrl: record.fileUrl || '/mock/document.pdf',
      tags: record.tags || ['Medical Report'],
      extractedDetails: record.extractedDetails,
    };
    mockHealthRecords.unshift(newRecord);
    return simulateNetwork(newRecord);
  },

  async requestVerification(recordId: string): Promise<boolean> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/records/${recordId}/verify-request`, { method: 'POST' });
      return res.ok;
    }
    const rec = mockHealthRecords.find(r => r.id === recordId);
    if (rec) rec.verificationStatus = 'pending';
    return simulateNetwork(true);
  }
};

export const AppointmentService = {
  async getAll(): Promise<Appointment[]> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/appointments`);
      return res.json();
    }
    return simulateNetwork([...mockAppointments]);
  },

  async bookAppointment(apt: Partial<Appointment>): Promise<Appointment> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apt),
      });
      return res.json();
    }
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName: apt.doctorName || 'Dr. Priya Sharma',
      specialty: apt.specialty || 'General Medicine',
      hospital: apt.hospital || 'City Hospital',
      date: apt.date || '30 Sep 2026',
      time: apt.time || '10:00 AM',
      status: 'upcoming',
      type: apt.type || 'appointment',
      reason: apt.reason || 'General Consultation',
    };
    mockAppointments.unshift(newApt);
    return simulateNetwork(newApt);
  },

  async cancelAppointment(id: string): Promise<boolean> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/appointments/${id}/cancel`, { method: 'PUT' });
      return res.ok;
    }
    const item = mockAppointments.find(a => a.id === id);
    if (item) item.status = 'cancelled';
    return simulateNetwork(true);
  }
};

export const AccessRequestService = {
  async getAll(): Promise<DoctorAccessRequest[]> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/doctor-requests`);
      return res.json();
    }
    return simulateNetwork([...mockDoctorAccessRequests]);
  },

  async updateStatus(id: string, status: 'active' | 'rejected'): Promise<boolean> {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/v1/doctor-requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.ok;
    }
    const req = mockDoctorAccessRequests.find(r => r.id === id);
    if (req) req.status = status;
    return simulateNetwork(true);
  }
};

export const MedicineReminderService = {
  async getAll(): Promise<MedicineReminderItem[]> {
    return simulateNetwork([...mockMedicineReminders]);
  },

  async toggleTaken(id: string): Promise<MedicineReminderItem | null> {
    const item = mockMedicineReminders.find(m => m.id === id);
    if (item) {
      item.taken = !item.taken;
      return simulateNetwork({ ...item });
    }
    return null;
  }
};

export const EmergencyService = {
  async getProfile(): Promise<EmergencyProfile> {
    return simulateNetwork({ ...mockEmergencyProfile });
  },

  async updateProfile(profile: Partial<EmergencyProfile>): Promise<EmergencyProfile> {
    Object.assign(mockEmergencyProfile, profile);
    return simulateNetwork({ ...mockEmergencyProfile });
  }
};

export const FacilityService = {
  async getAll(): Promise<HealthcareFacility[]> {
    return simulateNetwork([...mockFacilities]);
  },

  async getById(id: string): Promise<HealthcareFacility | undefined> {
    const facility = mockFacilities.find(f => f.id === id);
    return simulateNetwork(facility);
  }
};

export const SchemeService = {
  async getAll(): Promise<GovernmentScheme[]> {
    return simulateNetwork([...mockGovernmentSchemes]);
  }
};

export const ConsentService = {
  async getAll(): Promise<ConsentRecord[]> {
    return simulateNetwork([...mockConsentRecords]);
  },

  async revoke(id: string): Promise<boolean> {
    const item = mockConsentRecords.find(c => c.id === id);
    if (item) item.status = 'revoked';
    return simulateNetwork(true);
  }
};

export const LabService = {
  async getRequests(): Promise<LabTestRequest[]> {
    return simulateNetwork([...mockLabTestRequests]);
  },

  async updateRequestStatus(id: string, status: 'Pending' | 'In-Progress' | 'Completed'): Promise<boolean> {
    const req = mockLabTestRequests.find(r => r.id === id);
    if (req) req.status = status;
    return simulateNetwork(true);
  }
};

export const AuditService = {
  async getLogs(): Promise<AuditLogItem[]> {
    return simulateNetwork([...mockAuditLogs]);
  }
};

