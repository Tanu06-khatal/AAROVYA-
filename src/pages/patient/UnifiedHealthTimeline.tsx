import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { mockTimelineEvents, mockHealthRecords } from '../../data/mockData';
import { TimelineEvent, HealthRecord } from '../../types';
import { DocumentPreviewModal } from '../../components/records/DocumentPreviewModal';
import { Activity, Stethoscope, Pill, Image, Syringe, FileText, Calendar, ChevronRight } from 'lucide-react';

export const UnifiedHealthTimeline: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const icons: Record<string, React.ReactNode> = {
    blood_test: <Activity className="w-4 h-4 text-rose-600" />,
    consultation: <Stethoscope className="w-4 h-4 text-sky-600" />,
    prescription: <Pill className="w-4 h-4 text-amber-600" />,
    xray: <Image className="w-4 h-4 text-purple-600" />,
    vaccination: <Syringe className="w-4 h-4 text-emerald-600" />,
    discharge: <FileText className="w-4 h-4 text-indigo-600" />,
  };

  const bgColors: Record<string, string> = {
    blood_test: 'bg-rose-50 border-rose-200',
    consultation: 'bg-sky-50 border-sky-200',
    prescription: 'bg-amber-50 border-amber-200',
    xray: 'bg-purple-50 border-purple-200',
    vaccination: 'bg-emerald-50 border-emerald-200',
    discharge: 'bg-indigo-50 border-indigo-200',
  };

  const filteredEvents = mockTimelineEvents.filter(e => e.year === selectedYear);

  const handleOpenRecord = (recordId?: string) => {
    if (recordId) {
      const rec = mockHealthRecords.find(r => r.id === recordId);
      if (rec) setSelectedRecord(rec);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <PageHeader
          title="Unified Health Timeline"
          subtitle="Chronological longitudinal journey of all clinical events, tests, and prescriptions"
        />

        {/* Year Selector Matching Panel 8 */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-borderLight rounded-2xl shadow-xs self-start sm:self-auto">
          {[2026, 2025, 2024].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                selectedYear === year
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-textSecondary hover:text-navy hover:bg-slate-50'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Chronological Spine */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="relative group">
            {/* Timeline Node Point */}
            <div
              className={`absolute -left-6 sm:-left-8 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 bg-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-110 ${
                bgColors[evt.type] || 'border-slate-300'
              }`}
            >
              {icons[evt.type] || <Activity className="w-3.5 h-3.5" />}
            </div>

            {/* Event Card */}
            <div
              onClick={() => handleOpenRecord(evt.recordId)}
              className="bg-white rounded-2xl border border-borderLight p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer space-y-2 ml-2"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-primary flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {evt.date}
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {evt.type.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-navy group-hover:text-primary transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs font-medium text-textSecondary mt-0.5">
                    {evt.provider} {evt.doctor && `• Attending: ${evt.doctor}`}
                  </p>
                </div>
                {evt.recordId && (
                  <span className="p-1 rounded-lg text-primary hover:bg-primary-50">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </div>

              <p className="text-xs text-textSecondary bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                {evt.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Record Preview Modal if clicked */}
      <DocumentPreviewModal
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

