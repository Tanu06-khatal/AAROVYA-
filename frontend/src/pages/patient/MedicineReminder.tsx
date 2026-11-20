import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { mockMedicineReminders } from '../../data/mockData';
import { MedicineReminderItem } from '../../types';
import { Clock, Check, Plus, AlertCircle, Sparkles } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { MedicineReminderService } from '../../services/api';

export const MedicineReminder: React.FC = () => {
  const [reminders, setReminders] = useState<MedicineReminderItem[]>(mockMedicineReminders);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMedicine, setNewMedicine] = useState('');
  const [newDosage, setNewDosage] = useState('1 tablet');
  const [newTime, setNewTime] = useState('02:00 PM');
  const [newInstructions, setNewInstructions] = useState('Take after meal');

  const { showToast } = useNotifications();

  const handleToggle = async (id: string) => {
    const updated = await MedicineReminderService.toggleTaken(id);
    if (updated) {
      setReminders(prev => prev.map(m => m.id === id ? updated : m));
      showToast(updated.taken ? 'Marked as taken!' : 'Marked as pending', 'info');
    }
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedicine) return;

    const newReminder: MedicineReminderItem = {
      id: `rem-${Date.now()}`,
      medicineName: newMedicine,
      dosage: newDosage,
      time: newTime,
      scheduledTime: newTime,
      instructions: newInstructions,
      taken: false,
    };

    setReminders([...reminders, newReminder]);
    setIsAddModalOpen(false);
    showToast(`Scheduled reminder for ${newMedicine}`, 'success');
  };

  const takenCount = reminders.filter(r => r.taken).length;
  const progressPercent = reminders.length > 0 ? Math.round((takenCount / reminders.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Medicine Reminder"
        subtitle="Daily medication schedule, intake tracking, and automated refill alerts"
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Reminder
          </Button>
        }
      />

      {/* Main Medicine Schedule Card (Matching Panel 11) */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLight gap-3">
          <div>
            <h3 className="font-extrabold text-navy text-base sm:text-lg">Today's Schedule</h3>
            <p className="text-xs text-textSecondary mt-0.5">Keep track of your active daily pharmaceutical doses</p>
          </div>

          {/* Progress pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-navy">Today's Progress</span>
            <span className="text-xs font-extrabold text-primary px-2.5 py-0.5 rounded-full bg-blue-50 border border-borderLight">
              {takenCount} / {reminders.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-textSecondary font-medium">
            <span>{progressPercent}% Complete</span>
            <span>{reminders.length - takenCount} doses remaining today</span>
          </div>
        </div>

        {/* Schedule List Matching Panel 11 */}
        <div className="space-y-3">
          {reminders.map((rem) => (
            <div
              key={rem.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                rem.taken
                  ? 'bg-emerald-50/40 border-emerald-200/70'
                  : 'bg-white border-borderLight hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`p-3 rounded-2xl flex items-center justify-center font-bold text-xs ${
                    rem.taken
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-navy'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{rem.time}</span>
                    <span className="font-extrabold text-navy text-sm">{rem.medicineName}</span>
                  </div>
                  <p className="text-xs text-textSecondary mt-0.5">
                    {rem.dosage} • {rem.instructions}
                  </p>
                </div>
              </div>

              {/* Taken vs Take Button matching Panel 11 */}
              <div>
                {rem.taken ? (
                  <button
                    onClick={() => handleToggle(rem.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Taken</span>
                  </button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleToggle(rem.id)}
                  >
                    Take
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Reminder Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule Medicine Reminder"
        description="Set alarms and tracking for prescribed medications"
      >
        <form onSubmit={handleAddReminder} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Medicine Name</label>
            <input
              type="text"
              required
              value={newMedicine}
              onChange={(e) => setNewMedicine(e.target.value)}
              placeholder="e.g. Cetirizine 10mg"
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Dosage</label>
              <input
                type="text"
                value={newDosage}
                onChange={(e) => setNewDosage(e.target.value)}
                placeholder="e.g. 1 tablet"
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Scheduled Time</label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                placeholder="e.g. 02:00 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-navy block mb-1">Intake Instructions</label>
            <input
              type="text"
              value={newInstructions}
              onChange={(e) => setNewInstructions(e.target.value)}
              placeholder="e.g. Take with warm milk before sleep"
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth>
              Save Medicine Reminder
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

