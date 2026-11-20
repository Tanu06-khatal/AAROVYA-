import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Download, FileText, Archive, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const HealthRecordExport: React.FC = () => {
  const [exportType, setExportType] = useState<'selected' | 'summary' | 'timeline' | 'zip'>('summary');
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-09-30');
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useNotifications();

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Encrypted medical export package generated and downloaded', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Health Record Export"
        subtitle="Generate portable, encrypted PDF summaries or full ZIP packages of your clinical data"
      />

      {/* Main Export Card matching Panel 22 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="border-b border-borderLight pb-4">
          <h3 className="font-extrabold text-navy text-base">Export Format Options</h3>
          <p className="text-xs text-textSecondary mt-0.5">Select the compilation format for your clinical records</p>
        </div>

        {/* Radio Options matching Panel 22 */}
        <div className="space-y-3">
          {[
            {
              id: 'selected',
              title: 'Selected Documents',
              desc: 'Export only documents currently checked in your Health Locker',
              icon: <FileText className="w-5 h-5 text-primary" />,
            },
            {
              id: 'summary',
              title: 'Complete Health Summary (PDF)',
              desc: 'Comprehensive multi-page PDF with demographics, allergies, vitals, and diagnoses',
              icon: <FileText className="w-5 h-5 text-emerald-600" />,
            },
            {
              id: 'timeline',
              title: 'Medical Timeline (PDF)',
              desc: 'Chronological clinical audit chart from first consultation to latest lab test',
              icon: <Calendar className="w-5 h-5 text-sky-600" />,
            },
            {
              id: 'zip',
              title: 'All Documents (ZIP)',
              desc: 'Full encrypted archive containing original high-resolution PDFs and imaging reports',
              icon: <Archive className="w-5 h-5 text-amber-600" />,
            },
          ].map((opt) => (
            <label
              key={opt.id}
              className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                exportType === opt.id
                  ? 'border-primary bg-primary-50/20 shadow-xs'
                  : 'border-borderLight hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="exportType"
                checked={exportType === opt.id}
                onChange={() => setExportType(opt.id as any)}
                className="mt-1 text-primary focus:ring-primary h-4 w-4"
              />
              <div className="p-2 rounded-xl bg-white border border-slate-200 flex-shrink-0">
                {opt.icon}
              </div>
              <div>
                <h4 className="font-bold text-navy text-sm">{opt.title}</h4>
                <p className="text-xs text-textSecondary mt-0.5">{opt.desc}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Date Range Picker matching Panel 22 */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
          <label className="text-xs font-bold text-navy block">Date Range Filter</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-textSecondary block mb-1">From Date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy font-semibold"
              />
            </div>
            <div>
              <span className="text-textSecondary block mb-1">To Date</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Generate Export Button matching Panel 22 */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isExporting}
            onClick={handleExport}
            leftIcon={<Download className="w-5 h-5" />}
          >
            Generate Export
          </Button>
        </div>
      </div>
    </div>
  );
};

