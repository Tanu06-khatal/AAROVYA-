import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { mockAppointments, mockDoctors } from '../../data/mockData';
import { Appointment } from '../../types';
import { CalendarDays, Clock, MapPin, Plus, Calendar, AlertCircle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { AppointmentService } from '../../services/api';

export const AppointmentsFollowups: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [activeTab, setActiveTab] = useState<'appointment' | 'followup'>('appointment');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // New Booking form state
  const [doctorName, setDoctorName] = useState(mockDoctors[0].name);
  const [date, setDate] = useState('2026-10-12');
  const [slot, setSlot] = useState('11:00 AM');
  const [reason, setReason] = useState('Routine Cardiac Consultation');

  const { showToast } = useNotifications();

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    const doctorObj = mockDoctors.find(d => d.name === doctorName) || mockDoctors[0];

    const newApt = await AppointmentService.bookAppointment({
      doctorName,
      doctorAvatar: doctorObj.avatar,
      specialty: doctorObj.specialty || 'General Medicine',
      hospital: doctorObj.facilityName || 'City Hospital',
      date: new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: slot,
      status: 'upcoming',
      type: activeTab,
      reason,
    });

    setAppointments([newApt, ...appointments]);
    setIsBooking(false);
    setIsBookModalOpen(false);
    showToast(`Appointment confirmed with ${doctorName}`, 'success');
  };

  const handleCancel = async (id: string) => {
    await AppointmentService.cancelAppointment(id);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
    showToast('Appointment successfully cancelled', 'info');
  };

  const filtered = appointments.filter(a => a.type === activeTab);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Appointments & Follow-ups"
        subtitle="Manage upcoming clinical consultations, diagnostic visits, and post-discharge follow-ups"
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsBookModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Book New Appointment
          </Button>
        }
      />

      {/* Tabs matching Panel 9: Appointments vs Follow-ups */}
      <div className="flex border-b border-borderLight gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('appointment')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'appointment'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          <span>Appointments</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[10px]">
            {appointments.filter(a => a.type === 'appointment' && a.status === 'upcoming').length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('followup')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'followup'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          <span>Follow-ups</span>
          <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px]">
            {appointments.filter(a => a.type === 'followup' && a.status === 'upcoming').length}
          </span>
        </button>
      </div>

      {/* Appointment Cards (Matching Panel 9) */}
      <div className="space-y-4">
        {filtered.map((apt) => (
          <div
            key={apt.id}
            className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              apt.status === 'cancelled' ? 'opacity-60 border-slate-200' : 'border-borderLight'
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={apt.doctorAvatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'}
                alt={apt.doctorName}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20 flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-navy text-base">{apt.doctorName}</h4>
                  <Badge variant={apt.status === 'upcoming' ? 'verified' : apt.status === 'cancelled' ? 'rejected' : 'neutral'} size="sm">
                    {apt.status.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-xs text-textSecondary">
                  {apt.specialty} • <strong className="text-navy">{apt.hospital}</strong>
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-primary pt-1">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {apt.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {apt.time}
                  </span>
                </div>

                {apt.reason && (
                  <p className="text-[11px] text-textSecondary italic pt-0.5">
                    "{apt.reason}"
                  </p>
                )}
              </div>
            </div>

            {/* Actions: Reschedule / Cancel */}
            {apt.status === 'upcoming' && (
              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showToast('Select a new slot to reschedule', 'info')}
                >
                  Reschedule
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-danger hover:bg-rose-50"
                  onClick={() => handleCancel(apt.id)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Book Appointment Modal */}
      <Modal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        title="Book New Healthcare Consultation"
        description="Select clinician, hospital facility, and preferred appointment time"
      >
        <form onSubmit={handleBook} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Select Specialist Doctor</label>
            <select
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold text-xs"
            >
              {mockDoctors.map(doc => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} — {doc.specialty} ({doc.facilityName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Preferred Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Available Time Slot</label>
              <select
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold text-xs"
              >
                <option value="09:30 AM">09:30 AM</option>
                <option value="11:00 AM">11:00 AM (Recommended)</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="06:30 PM">06:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-navy block mb-1">Consultation Purpose / Symptoms</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Follow-up on recent lipid report, mild chest palpitations"
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy text-xs"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth isLoading={isBooking}>
              Confirm Appointment Booking
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

