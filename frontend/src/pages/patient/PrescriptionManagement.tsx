import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { mockPrescriptions } from '../../data/mockData';
import { Pill, Clock, FileText, Download, CheckCircle2, Bell, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export const PrescriptionManagement: React.FC = () => {
  const [prescriptions] = useState(mockPrescriptions);
  const currentRx = prescriptions[0];
  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleSetReminder = () => {
    showToast('Reminders scheduled for Paracetamol & Amoxicillin in Medicine Reminder Hub', 'success');
    navigate('/patient/medicine-reminders');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Prescription Management"
        subtitle="Digital medication orders, dosage instructions, and active prescription records"
      />

      {/* Featured Prescription Card (Matching Panel 10) */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        {/* Clinician Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLight gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 text-primary border border-borderLight">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-navy text-base sm:text-lg">{currentRx.doctorName}</h3>
              <p className="text-xs text-textSecondary">{currentRx.specialty} • {currentRx.hospital}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-navy px-3 py-1 bg-slate-100 rounded-full w-fit">
            Issued: {currentRx.date}
          </span>
        </div>

        {/* Clinical Diagnosis Note */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
          <span className="font-bold text-navy">Diagnosis & Indication: </span>
          <span className="text-textSecondary">{currentRx.diagnosis}</span>
        </div>

        {/* Medicines List matching Panel 10 */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-textSecondary">
            Prescribed Medications & Dosages
          </h4>

          {currentRx.medicines.map((med) => (
            <div
              key={med.id}
              className="p-4 rounded-2xl border border-borderLight bg-slate-50/50 hover:border-primary-light transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-navy text-sm">{med.name}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Rx
                  </span>
                </div>
                <p className="text-xs text-textSecondary font-medium">
                  {med.dosage} • {med.frequency} • <strong className="text-navy">{med.duration}</strong>
                </p>
                <p className="text-[11px] text-textSecondary italic">
                  Instructions: {med.instructions}
                </p>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center">
                {med.timing.map((time, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold px-2 py-1 rounded-lg bg-white border border-slate-200 text-primary"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Doctor's Advice Box */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
          <strong className="block font-bold mb-0.5">Doctor's Direct Instructions:</strong>
          {currentRx.notes}
        </div>

        {/* Action Buttons matching Panel 10 */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="primary"
            size="md"
            fullWidth
            leftIcon={<Bell className="w-4 h-4" />}
            onClick={handleSetReminder}
          >
            Set Medicine Reminder
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<FileText className="w-4 h-4" />}
            onClick={() => showToast('Opening digital PDF prescription preview', 'info')}
          >
            View Prescription (PDF)
          </Button>
        </div>
      </div>
    </div>
  );
};

