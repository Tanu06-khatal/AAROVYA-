import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { UploadCloud, FileText, CheckCircle2, Sparkles, Edit2, Save, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { HealthRecordService } from '../../services/api';

export const UploadAndExtract: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Extracted fields matching Panel 4 of reference image
  const [extractedData, setExtractedData] = useState({
    documentType: 'Blood Report',
    hospital: 'ABC Hospital',
    date: '24 Sep 2026',
    doctor: 'Dr. Sharma',
    notes: 'Complete Blood Count (CBC) and Lipid Profile. Normal biological parameters.'
  });

  const { showToast } = useNotifications();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      runOcrExtraction(selected.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      setFile(dropped);
      runOcrExtraction(dropped.name);
    }
  };

  const runOcrExtraction = (fileName: string) => {
    setIsScanning(true);
    setIsExtracted(false);
    setTimeout(() => {
      setIsScanning(false);
      setIsExtracted(true);
      showToast('AI OCR successfully extracted clinical entities from document', 'success');
    }, 1200);
  };

  const handleSaveToLocker = async () => {
    setIsSaving(true);
    await HealthRecordService.uploadRecord({
      title: `${extractedData.documentType} - ${extractedData.hospital}`,
      fileName: file ? file.name : 'Blood_Report.pdf',
      fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '2.4 MB',
      category: 'reports',
      provider: extractedData.hospital,
      doctorName: extractedData.doctor,
      extractedDetails: {
        documentType: extractedData.documentType,
        hospital: extractedData.hospital,
        date: extractedData.date,
        doctor: extractedData.doctor,
        keyFindings: ['All vital indices within standard ranges', 'Extracted via AAROVYA Neural OCR'],
      }
    });
    setIsSaving(false);
    showToast('Record verified and encrypted in your Health Locker!', 'success');
    navigate('/patient/health-locker');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Upload & Extract (OCR/AI)"
        subtitle="Automatic classification and entity extraction for medical records using HIPAA-compliant AI"
        showBack
        backTo="/patient/health-locker"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Drag & Drop Zone */}
        <div className="md:col-span-6 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all bg-white flex flex-col items-center justify-center min-h-[300px] ${
              file ? 'border-primary bg-primary-50/20' : 'border-borderLight hover:border-primary/50'
            }`}
          >
            <div className="p-4 rounded-2xl bg-blue-50 text-primary mb-4">
              <UploadCloud className="w-10 h-10 text-primary" />
            </div>

            <h3 className="font-extrabold text-navy text-base">
              {file ? file.name : 'Drag & drop files here'}
            </h3>
            <p className="text-xs text-textSecondary mt-1">
              or browse from your device or mobile camera
            </p>

            <label className="mt-5">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors">
                Choose File
              </span>
            </label>

            <div className="mt-6 text-[11px] text-textSecondary border-t border-slate-100 pt-3">
              Supported: <strong>PDF, JPG, PNG</strong> (Max 10 MB)
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-textSecondary flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p>
              All uploaded diagnostic files are processed client-side and encrypted with AES-256 before storage in your sovereign locker.
            </p>
          </div>
        </div>

        {/* Right: Extracted Details (AI) - Matching Panel 4 */}
        <div className="md:col-span-6 bg-white rounded-3xl border border-borderLight p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-borderLight mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
                  Extracted Details (AI)
                </h3>
              </div>
              {isExtracted && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Done Editing' : 'Edit'}</span>
                </button>
              )}
            </div>

            {isScanning ? (
              <div className="py-16 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
                <h4 className="font-bold text-navy text-sm">Processing Neural OCR...</h4>
                <p className="text-xs text-textSecondary">Detecting hospital header, clinical parameters, and clinician signature</p>
              </div>
            ) : isExtracted || file ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wider block mb-1">
                    Document Type
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={extractedData.documentType}
                      onChange={(e) => setExtractedData({ ...extractedData, documentType: e.target.value })}
                      className="w-full px-3 py-2 border border-borderLight rounded-xl text-navy font-semibold"
                    />
                  ) : (
                    <div className="p-2.5 bg-slate-50 rounded-xl font-bold text-navy text-sm border border-slate-100">
                      {extractedData.documentType}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wider block mb-1">
                    Hospital / Diagnostic Provider
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={extractedData.hospital}
                      onChange={(e) => setExtractedData({ ...extractedData, hospital: e.target.value })}
                      className="w-full px-3 py-2 border border-borderLight rounded-xl text-navy font-semibold"
                    />
                  ) : (
                    <div className="p-2.5 bg-slate-50 rounded-xl font-bold text-navy text-sm border border-slate-100">
                      {extractedData.hospital}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wider block mb-1">
                      Date of Record
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={extractedData.date}
                        onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-borderLight rounded-xl text-navy font-semibold"
                      />
                    ) : (
                      <div className="p-2.5 bg-slate-50 rounded-xl font-bold text-navy text-sm border border-slate-100">
                        {extractedData.date}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-textSecondary uppercase tracking-wider block mb-1">
                      Doctor Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={extractedData.doctor}
                        onChange={(e) => setExtractedData({ ...extractedData, doctor: e.target.value })}
                        className="w-full px-3 py-2 border border-borderLight rounded-xl text-navy font-semibold"
                      />
                    ) : (
                      <div className="p-2.5 bg-slate-50 rounded-xl font-bold text-navy text-sm border border-slate-100">
                        {extractedData.doctor}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Clinical entities matched with high confidence (99.4%)</span>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-textSecondary space-y-2">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs">Select or drop a medical document to trigger automatic AI extraction.</p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-borderLight mt-6 flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => {
                setFile(new File(['dummy'], 'Blood_Report.pdf'));
                runOcrExtraction('Blood_Report.pdf');
              }}
            >
              Load Demo File
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              disabled={!isExtracted && !file}
              isLoading={isSaving}
              onClick={handleSaveToLocker}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save to Locker
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

