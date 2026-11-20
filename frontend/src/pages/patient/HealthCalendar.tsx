import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Stethoscope, Pill, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CalendarEvent {
  date: number;
  month: string;
  title: string;
  time: string;
  type: 'doctor' | 'refill' | 'followup';
  doctor?: string;
}

export const HealthCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('September 2026');
  const [selectedDay, setSelectedDay] = useState(28);
  const [viewType, setViewType] = useState<'month' | 'week'>('month');
  const navigate = useNavigate();

  const events: CalendarEvent[] = [
    { date: 28, month: 'Sep', title: 'Doctor Appointment', time: '11:00 AM', type: 'doctor', doctor: 'Dr. Priya Sharma' },
    { date: 29, month: 'Sep', title: 'Medicine Refill', time: '09:00 AM', type: 'refill' },
    { date: 5, month: 'Oct', title: 'Follow-up Consultation', time: '04:00 PM', type: 'followup', doctor: 'Dr. Amit Verma' },
  ];

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Healthcare Calendar"
        subtitle="Synchronized schedule of clinical appointments, prescription refills, and medical visits"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Calendar Grid matching Panel 25 */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <h3 className="font-extrabold text-navy text-base">{currentMonth}</h3>
            </div>

            <div className="flex items-center gap-2">
              {/* View Switcher matching Panel 25 */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setViewType('month')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    viewType === 'month' ? 'bg-white text-primary shadow-xs' : 'text-textSecondary'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewType('week')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    viewType === 'week' ? 'bg-white text-primary shadow-xs' : 'text-textSecondary'
                  }`}
                >
                  Week
                </button>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg border border-borderLight hover:bg-slate-50 text-textSecondary hover:text-navy">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg border border-borderLight hover:bg-slate-50 text-textSecondary hover:text-navy">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-textSecondary pb-1">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Empty slots for day alignment */}
            <div className="p-2 sm:p-3 text-center text-xs text-slate-300">30</div>
            <div className="p-2 sm:p-3 text-center text-xs text-slate-300">31</div>

            {daysInMonth.map((day) => {
              const hasEvent = events.some(e => e.date === day);
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 sm:p-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all relative flex flex-col items-center justify-center min-h-[44px] ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : hasEvent
                      ? 'bg-blue-50 text-primary border border-borderLight'
                      : 'hover:bg-slate-100 text-navy'
                  }`}
                >
                  <span>{day}</span>
                  {hasEvent && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        isSelected ? 'bg-white' : 'bg-primary'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Agenda List matching Panel 25 */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-4">
          <div className="border-b border-borderLight pb-3">
            <h4 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Scheduled Agenda
            </h4>
            <p className="text-xs text-textSecondary mt-0.5">Upcoming appointments and refills</p>
          </div>

          <div className="space-y-3">
            {events.map((evt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-borderLight bg-slate-50/50 space-y-1.5 hover:border-primary transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-primary flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {evt.date} {evt.month}
                  </span>
                  <span className="text-[10px] font-bold text-textSecondary px-2 py-0.5 rounded-md bg-white border border-slate-200">
                    {evt.time}
                  </span>
                </div>

                <h5 className="font-bold text-navy text-xs sm:text-sm">{evt.title}</h5>
                {evt.doctor && (
                  <p className="text-xs text-textSecondary flex items-center gap-1">
                    <Stethoscope className="w-3 h-3 text-sky-600" />
                    <span>{evt.doctor}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => navigate('/patient/appointments')}
          >
            Manage All Appointments
          </Button>
        </div>
      </div>
    </div>
  );
};

