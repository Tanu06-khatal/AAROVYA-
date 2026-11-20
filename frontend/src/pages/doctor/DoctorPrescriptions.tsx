import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Pill, Plus, Trash2, Save, FileText, CheckCircle2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

interface MedicineRow {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export const DoctorPrescriptions: React.FC = () => {
  const [patientName, setPatientName] = useState('Patient1');
  const [diagnosis, setDiagnosis] = useState('Mild Seasonal Bronchial Inflammation');
  const [notes, setNotes] = useState('Drink warm water. Rest for 48 hours. Follow up if fever exceeds 100°F.');
  const [medicines, setMedicines] = useState<MedicineRow[]>([
    { name: 'Paracetamol 500 mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', instructions: 'Post meals' },
    { name: 'Amoxicillin 500 mg', dosage: '1 tablet', frequency: 'Twice daily', duration: '7 days', instructions: 'Strict complete course' },
  ]);

  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const addMedicineRow = () => {
    setMedicines([...medicines, { name: '', dosage: '1 tablet', frequency: 'Once daily', duration: '5 days', instructions: 'After food' }]);
  };

  const removeMedicineRow = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Prescription digitally signed and dispatched to ${patientName}'s AAROVYA Locker!`, 'success');
    navigate('/doctor/dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Prescription Console"
        subtitle="Issue cryptographically signed digital prescriptions directly into patient lockers"
        showBack
        backTo="/doctor/dashboard"
      />

      <form onSubmit={handleIssue} className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-borderLight text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Patient Name</label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-navy block mb-1">Clinical Diagnosis</label>
            <input
              type="text"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold text-xs"
            />
          </div>
        </div>

        {/* Medicines Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Prescribed Medications
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedicineRow}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Medicine
            </Button>
          </div>

          <div className="space-y-3">
            {medicines.map((med, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-center">
                <div className="sm:col-span-4">
                  <label className="font-bold text-navy block mb-1">Medicine Name</label>
                  <input
                    type="text"
                    required
                    value={med.name}
                    onChange={(e) => {
                      const updated = [...medicines];
                      updated[idx].name = e.target.value;
                      setMedicines(updated);
                    }}
                    placeholder="e.g. Paracetamol 500mg"
                    className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy font-semibold text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-navy block mb-1">Dosage</label>
                  <input
                    type="text"
                    value={med.dosage}
                    onChange={(e) => {
                      const updated = [...medicines];
                      updated[idx].dosage = e.target.value;
                      setMedicines(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy text-xs"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="font-bold text-navy block mb-1">Frequency & Duration</label>
                  <input
                    type="text"
                    value={`${med.frequency}, ${med.duration}`}
                    onChange={(e) => {
                      const updated = [...medicines];
                      updated[idx].frequency = e.target.value;
                      setMedicines(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-navy block mb-1">Instructions</label>
                  <input
                    type="text"
                    value={med.instructions}
                    onChange={(e) => {
                      const updated = [...medicines];
                      updated[idx].instructions = e.target.value;
                      setMedicines(updated);
                    }}
                    className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy text-xs"
                  />
                </div>

                <div className="sm:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeMedicineRow(idx)}
                    className="p-2 text-danger hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor's Notes */}
        <div>
          <label className="font-bold text-navy text-xs block mb-1">Physician Advice & Dietary Precautions</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-borderLight rounded-xl text-navy text-xs"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            leftIcon={<Save className="w-4 h-4" />}
          >
            Digitally Sign & Issue Prescription
          </Button>
        </div>
      </form>
    </div>
  );
};

