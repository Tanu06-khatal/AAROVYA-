import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { UploadCloud, CheckCircle2, FileText, User, ShieldCheck } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

export const LabUploadReport: React.FC = () => {
  const [patientName, setPatientName] = useState('Patient1');
  const [testName, setTestName] = useState('Complete Blood Count (CBC) & Lipid Profile');
  const [referringDoctor, setReferringDoctor] = useState('Dr. Priya Sharma');
  const [fileName, setFileName] = useState('Blood_Report_Verified.pdf');
  const [isUploading, setIsUploading] = useState(false);

  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      showToast(`Verified lab report uploaded and dispatched to ${patientName}`, 'success');
      navigate('/laboratory/dashboard');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Upload & Verify Lab Report"
        subtitle="Digitally sign and dispatch official laboratory investigation documents to patient lockers"
        showBack
        backTo="/laboratory/dashboard"
      />

      <form onSubmit={handleUpload} className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="space-y-4 text-xs">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Investigation / Test Name</label>
              <input
                type="text"
                required
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Referring Clinician</label>
              <input
                type="text"
                required
                value={referringDoctor}
                onChange={(e) => setReferringDoctor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy text-xs"
              />
            </div>
          </div>

          {/* File Upload Box */}
          <div className="border-2 border-dashed border-borderLight rounded-2xl p-6 text-center bg-slate-50 space-y-2">
            <UploadCloud className="w-8 h-8 text-primary mx-auto" />
            <span className="font-bold text-navy text-xs block">{fileName}</span>
            <p className="text-[11px] text-textSecondary">Attach NABL signed diagnostic PDF (Max 25 MB)</p>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-borderLight text-navy text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Document will automatically receive the "Provider Verified" gold seal on patient timeline.</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isUploading}
            leftIcon={<UploadCloud className="w-4 h-4" />}
          >
            Sign & Deliver Verified Report
          </Button>
        </div>
      </form>
    </div>
  );
};

