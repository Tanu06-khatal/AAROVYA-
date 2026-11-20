import React, { useState } from 'react';
import { HealthRecord } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Share2, Copy, Check, Clock, ShieldCheck, Link2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { mockDoctors } from '../../data/mockData';

interface ShareRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableRecords: HealthRecord[];
  preselectedRecord?: HealthRecord | null;
}

export const ShareRecordModal: React.FC<ShareRecordModalProps> = ({
  isOpen,
  onClose,
  availableRecords,
  preselectedRecord,
}) => {
  const { showToast } = useNotifications();
  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    preselectedRecord ? [preselectedRecord.id] : [availableRecords[0]?.id || '']
  );
  const [recipient, setRecipient] = useState<string>('Dr. Priya Sharma (Cardiologist)');
  const [viewOnly, setViewOnly] = useState<boolean>(true);
  const [allowDownload, setAllowDownload] = useState<boolean>(false);
  const [expiryDays, setExpiryDays] = useState<string>('7');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    const link = `https://aarovya.health/shared-access/${Math.random().toString(36).substring(2, 10)}`;
    setGeneratedLink(link);
    showToast('Secure sharing link generated with expiry controls', 'success');
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      showToast('Sharing link copied to clipboard', 'info');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Health Records (With Control)"
      description="Grant secure, time-bound access to verified clinical practitioners"
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        {/* Step 1: Select Documents */}
        <div>
          <label className="font-bold text-navy block mb-2">1. Select Documents to Share</label>
          <div className="max-h-40 overflow-y-auto space-y-1.5 border border-borderLight rounded-xl p-2.5 bg-slate-50">
            {availableRecords.map(rec => (
              <label
                key={rec.id}
                className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(rec.id)}
                    onChange={() => toggleSelect(rec.id)}
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="font-semibold text-navy truncate max-w-[200px] sm:max-w-xs">{rec.title}</span>
                </div>
                <span className="text-[11px] text-textSecondary uppercase font-medium">{rec.category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Step 2: Share With */}
        <div>
          <label className="font-bold text-navy block mb-1.5">2. Share With Healthcare Professional</label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-borderLight rounded-xl text-navy text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="Dr. Priya Sharma (Cardiologist)">Dr. Priya Sharma (Cardiologist - ABC Hospital)</option>
            <option value="Dr. Amit Verma (General Physician)">Dr. Amit Verma (General Physician - City Hospital)</option>
            <option value="ABC Diagnostics Central Lab">ABC Diagnostics Central Lab</option>
            <option value="Custom External Doctor">Other Verified Medical Practitioner...</option>
          </select>
        </div>

        {/* Step 3: Permissions & Expiry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-white border border-borderLight rounded-xl">
            <span className="font-bold text-navy block mb-2">Access Permissions</span>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={viewOnly}
                  onChange={(e) => setViewOnly(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-navy font-medium">View-Only Access</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDownload}
                  onChange={(e) => setAllowDownload(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-navy font-medium">Allow Encrypted Download</span>
              </label>
            </div>
          </div>

          <div className="p-3 bg-white border border-borderLight rounded-xl">
            <span className="font-bold text-navy block mb-2">Auto-Revocation Expiry</span>
            <select
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-borderLight rounded-lg text-navy text-xs"
            >
              <option value="1">24 Hours</option>
              <option value="7">7 Days (Standard)</option>
              <option value="14">14 Days</option>
              <option value="30">30 Days</option>
            </select>
            <p className="text-[10px] text-textSecondary mt-2">
              Consent automatically expires. You can revoke it anytime in Privacy Center.
            </p>
          </div>
        </div>

        {/* Result Link Box */}
        {generatedLink ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 animate-in fade-in-50">
            <div className="flex items-center justify-between text-emerald-900 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Secure Share Link Ready
              </span>
              <span className="text-[11px] font-medium text-emerald-700">Expires in {expiryDays} days</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full bg-white border border-emerald-200 rounded-lg px-2.5 py-1.5 text-xs text-navy font-mono"
              />
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            fullWidth
            onClick={handleGenerate}
            disabled={selectedIds.length === 0}
            leftIcon={<Link2 className="w-4 h-4" />}
          >
            Generate Secure Share Link ({selectedIds.length} records selected)
          </Button>
        )}
      </div>
    </Modal>
  );
};

