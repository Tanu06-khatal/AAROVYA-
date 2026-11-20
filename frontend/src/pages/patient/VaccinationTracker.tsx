import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { mockVaccinations } from '../../data/mockData';
import { VaccinationRecord } from '../../types';
import { Syringe, Plus, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const VaccinationTracker: React.FC = () => {
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>(mockVaccinations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [hospital, setHospital] = useState('City General Hospital');
  const [batch, setBatch] = useState('VAC-2026-X9');

  const { showToast } = useNotifications();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newRecord: VaccinationRecord = {
      id: `vac-${Date.now()}`,
      vaccineName: name,
      dateAdministered: new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      hospital,
      batchNumber: batch,
      status: 'Completed',
    };

    setVaccinations([...vaccinations, newRecord]);
    setIsAddModalOpen(false);
    showToast(`Recorded vaccination for ${name}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Vaccination Tracker"
        subtitle="Immunization history, booster dose reminders, and digital certificate validation"
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Vaccination
          </Button>
        }
      />

      {/* Vaccinations List matching Panel 24 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-borderLight">
          <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
            My Vaccinations
          </h3>
          <span className="text-xs text-textSecondary">{vaccinations.length} Immunizations Recorded</span>
        </div>

        <div className="space-y-3">
          {vaccinations.map((vac) => (
            <div
              key={vac.id}
              className="p-4 rounded-2xl border border-borderLight hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-blue-50 text-primary border border-borderLight flex-shrink-0">
                  <Syringe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy text-sm sm:text-base">{vac.vaccineName}</h4>
                  <p className="text-xs text-textSecondary mt-0.5">
                    {vac.hospital} {vac.batchNumber && `• Batch #${vac.batchNumber}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xs font-semibold text-textSecondary flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {vac.dateAdministered}
                </span>
                <Badge variant={vac.status === 'Completed' ? 'verified' : 'pending'} size="sm">
                  {vac.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Vaccination Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Record Immunization / Vaccination"
        description="Add a completed or scheduled vaccination to your official health timeline"
      >
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Vaccine Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HPV Vaccine or Typhoid Booster"
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Date Administered</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Batch Number</label>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-navy block mb-1">Hospital / Clinic Center</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth>
              Save Vaccination Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

