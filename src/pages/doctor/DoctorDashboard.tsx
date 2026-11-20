import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { CalendarDays, Users, Stethoscope, FileText, Clock, Eye, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockHealthRecords } from '../../data/mockData';
import { DocumentPreviewModal } from '../../components/records/DocumentPreviewModal';

export const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatientModal, setSelectedPatientModal] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  // Today's appointments queue matching Panel 19
  const queue = [
    { id: 'q-1', name: 'Patient1', time: '11:00 AM', reason: 'Cardiac Review & Lipid Profile Follow-up', bloodGroup: 'B+', recordsCount: 42 },
    { id: 'q-2', name: 'Amit Deshmukh', time: '12:00 PM', reason: 'Post-Hypertension Medication Review', bloodGroup: 'A+', recordsCount: 15 },
    { id: 'q-3', name: 'Sunita Patil', time: '02:30 PM', reason: 'ECG Analysis & Routine Check-up', bloodGroup: 'O+', recordsCount: 8 },
    { id: 'q-4', name: 'Rajesh Kulkarni', time: '04:00 PM', reason: 'Chest Discomfort Consultation', bloodGroup: 'B-', recordsCount: 21 },
    { id: 'q-5', name: 'Meera Sen', time: '05:15 PM', reason: 'Holter Monitor Follow-up', bloodGroup: 'AB+', recordsCount: 11 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-700 to-navy rounded-3xl p-6 sm:p-8 text-white shadow-elevated">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Doctor Clinical Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Dr. Priya Sharma, MD (Cardiology)
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 mt-1">
              Senior Consultant • ABC Hospital & City Heart Institute • MCI-CARD-49210
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/doctor/prescriptions')}
            >
              Write Prescription
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row matching Panel 19: Today's Appointments (5), Consultations (4), Follow-ups (2) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Today's Appointments"
          value={5}
          subtitle="Confirmed clinical slots"
          icon={<CalendarDays className="w-5 h-5 text-sky-600" />}
        />
        <StatCard
          title="Consultations"
          value={4}
          subtitle="In-clinic sessions"
          icon={<Stethoscope className="w-5 h-5 text-primary" />}
        />
        <StatCard
          title="Follow-ups"
          value={2}
          subtitle="Post-treatment reviews"
          icon={<Clock className="w-5 h-5 text-indigo-600" />}
        />
      </div>

      {/* Today's Appointments Queue matching Panel 19 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-borderLight">
          <div>
            <h3 className="font-extrabold text-navy text-base">Today's Appointment Queue</h3>
            <p className="text-xs text-textSecondary mt-0.5">Click "View" to open authorized patient health records</p>
          </div>
          <span className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200">
            5 Scheduled
          </span>
        </div>

        <div className="space-y-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-borderLight hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-navy text-sm">{item.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-danger border border-rose-200">
                      {item.bloodGroup}
                    </span>
                  </div>
                  <p className="text-xs text-textSecondary mt-0.5">{item.reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs font-bold text-navy px-2.5 py-1 rounded-lg bg-white border border-slate-200">
                  {item.time}
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => {
                    if (item.name.includes('Patient1')) {
                      setSelectedRecord(mockHealthRecords[0]);
                    } else {
                      setSelectedPatientModal(item.name);
                    }
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Record Preview Modal */}
      <DocumentPreviewModal
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />

      {/* Other Patient Modal */}
      <Modal
        isOpen={!!selectedPatientModal}
        onClose={() => setSelectedPatientModal(null)}
        title={`Patient Record — ${selectedPatientModal}`}
        description="Patient authorized medical history and diagnostic summaries"
      >
        <div className="space-y-3 text-xs">
          <p className="text-textSecondary">
            Authorized consent granted for medical review during today's clinical consultation.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-navy block mb-1">Previous Clinical Notes:</span>
            <p className="text-textSecondary">Hypertension controlled on beta-blockers. Follow-up ECG recommended.</p>
          </div>
          <Button variant="primary" size="sm" fullWidth onClick={() => navigate('/doctor/prescriptions')}>
            Issue Digital Prescription
          </Button>
        </div>
      </Modal>
    </div>
  );
};

