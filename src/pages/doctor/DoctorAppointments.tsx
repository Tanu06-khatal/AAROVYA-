import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Calendar, Clock, User, Stethoscope, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';

export const DoctorAppointments: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useNotifications();

  const [appointments, setAppointments] = useState([
    { id: 'apt-d1', patient: 'Patient1', time: '11:00 AM', status: 'In Waiting', reason: 'Cardiac Review & CBC Report Evaluation', bloodGroup: 'B+' },
    { id: 'apt-d2', patient: 'Amit Deshmukh', time: '12:00 PM', status: 'Scheduled', reason: 'Post-Hypertension Medication Review', bloodGroup: 'A+' },
    { id: 'apt-d3', patient: 'Sunita Patil', time: '02:30 PM', status: 'Scheduled', reason: 'ECG Analysis & Routine Check-up', bloodGroup: 'O+' },
    { id: 'apt-d4', patient: 'Rajesh Kulkarni', time: '04:00 PM', status: 'Scheduled', reason: 'Chest Discomfort Consultation', bloodGroup: 'B-' },
  ]);

  const handleStartConsultation = (patientName: string) => {
    showToast(`Started consultation session with ${patientName}`, 'success');
    navigate('/doctor/prescriptions');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Doctor Appointment Schedule"
        subtitle="Manage daily OPD patient consultations and clinical intake status"
      />

      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white rounded-3xl border border-borderLight p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-sm flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy text-base">{apt.patient}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-danger border border-rose-200">
                    {apt.bloodGroup}
                  </span>
                </div>
                <p className="text-xs text-textSecondary">{apt.reason}</p>
                <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{apt.time}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">{apt.status}</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Stethoscope className="w-4 h-4" />}
              onClick={() => handleStartConsultation(apt.patient)}
            >
              Start Consultation
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

