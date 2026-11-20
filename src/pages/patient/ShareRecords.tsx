import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockHealthRecords, mockDoctors } from '../../data/mockData';
import { Share2, Link2, Copy, Check, Clock, ShieldCheck, XCircle, Trash2, Eye } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';

interface ActiveShareItem {
  id: string;
  doctorName: string;
  specialty: string;
  recordsCount: number;
  permissions: string;
  expiresIn: string;
  link: string;
  active: boolean;
}

export const ShareRecords: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([mockHealthRecords[0].id, mockHealthRecords[1].id]);
  const [selectedDoctor, setSelectedDoctor] = useState(mockDoctors[0].name);
  const [viewOnly, setViewOnly] = useState(true);
  const [allowDownload, setAllowDownload] = useState(false);
  const [expiryDays, setExpiryDays] = useState('7');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<ActiveShareItem | null>(null);

  const [activeShares, setActiveShares] = useState<ActiveShareItem[]>([
    {
      id: 'sh-001',
      doctorName: 'Dr. Priya Sharma',
      specialty: 'Cardiologist (ABC Hospital)',
      recordsCount: 3,
      permissions: 'View Only',
      expiresIn: 'Expires in 5 days (30 Sep 2026)',
      link: 'https://aarovya.health/shared/sh-001-cardio',
      active: true,
    },
    {
      id: 'sh-002',
      doctorName: 'ABC Diagnostics Central Lab',
      specialty: 'Pathology & Testing',
      recordsCount: 1,
      permissions: 'View & Download',
      expiresIn: 'Expires in 12 days (10 Oct 2026)',
      link: 'https://aarovya.health/shared/sh-002-lab',
      active: true,
    }
  ]);

  const { showToast } = useNotifications();

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (selectedIds.length === 0) {
      showToast('Please select at least one document to share', 'warning');
      return;
    }
    const token = Math.random().toString(36).substring(2, 9);
    const link = `https://aarovya.health/shared-access/${token}`;
    setGeneratedLink(link);

    const newShare: ActiveShareItem = {
      id: `sh-${Date.now()}`,
      doctorName: selectedDoctor,
      specialty: 'Verified Practitioner',
      recordsCount: selectedIds.length,
      permissions: viewOnly && !allowDownload ? 'View Only' : allowDownload ? 'View & Download' : 'Custom',
      expiresIn: `Expires in ${expiryDays} days`,
      link,
      active: true,
    };
    setActiveShares([newShare, ...activeShares]);
    showToast('Secure sharing link generated successfully', 'success');
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      showToast('Copied to clipboard', 'info');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRevokeConfirm = () => {
    if (revokeTarget) {
      setActiveShares(prev => prev.filter(s => s.id !== revokeTarget.id));
      showToast(`Access revoked for ${revokeTarget.doctorName}`, 'success');
      setRevokeTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Share Records (With Control)"
        subtitle="Grant granular, time-bound, revocable access to doctors and diagnostic centers"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Share Health Records Form (Matching Panel 6) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-5">
          <div className="border-b border-borderLight pb-3">
            <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Share Health Records
            </h3>
            <p className="text-xs text-textSecondary mt-0.5">Select documents and recipient permissions</p>
          </div>

          {/* Select Documents */}
          <div>
            <label className="text-xs font-bold text-navy block mb-2">Select Documents</label>
            <div className="space-y-2 max-h-48 overflow-y-auto border border-borderLight rounded-2xl p-3 bg-slate-50">
              {mockHealthRecords.map((rec) => (
                <label
                  key={rec.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-primary transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(rec.id)}
                      onChange={() => toggleSelect(rec.id)}
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="font-semibold text-navy truncate">{rec.title}</span>
                  </div>
                  <span className="text-[10px] text-textSecondary uppercase font-medium flex-shrink-0">
                    {rec.fileSize}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Share With */}
          <div>
            <label className="text-xs font-bold text-navy block mb-1.5">Share With Doctor / Clinic</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-borderLight rounded-xl text-xs font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {mockDoctors.map(doc => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} ({doc.specialty} - {doc.facilityName})
                </option>
              ))}
              <option value="District Civil General Hospital">District Civil General Hospital</option>
              <option value="External Consulting Specialist">External Consulting Specialist...</option>
            </select>
          </div>

          {/* Permissions & Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-navy block">Permissions</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={viewOnly}
                  onChange={(e) => setViewOnly(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="font-medium text-navy">View Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowDownload}
                  onChange={(e) => setAllowDownload(e.target.checked)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
                <span className="font-medium text-navy">Allow Download</span>
              </label>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-navy block mb-2">Expiry Duration</span>
              <select
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-borderLight rounded-xl text-xs font-semibold text-navy"
              >
                <option value="1">24 Hours</option>
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </select>
              <p className="text-[11px] text-textSecondary mt-2">
                Links automatically self-destruct after expiry.
              </p>
            </div>
          </div>

          {/* Generated Link Alert */}
          {generatedLink && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Active Share Link
                </span>
                <span className="text-[11px] text-emerald-700">Expires in {expiryDays} days</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="w-full bg-white border border-emerald-200 rounded-xl px-3 py-2 text-xs font-mono text-navy"
                />
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleGenerate}
            disabled={selectedIds.length === 0}
            leftIcon={<Link2 className="w-4 h-4" />}
          >
            Generate Share Link ({selectedIds.length} records)
          </Button>
        </div>

        {/* Right: Active Shared Records Management */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderLight">
            <div>
              <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
                Active Shared Access Grants
              </h3>
              <p className="text-xs text-textSecondary mt-0.5">Manage and revoke active doctor connections</p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-primary px-2.5 py-0.5 rounded-full border border-borderLight">
              {activeShares.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {activeShares.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-borderLight hover:border-slate-300 transition-all bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-navy text-sm">{item.doctorName}</h4>
                    <p className="text-xs text-textSecondary">{item.specialty}</p>
                  </div>
                  <Badge variant="verified" size="sm">
                    {item.permissions}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-textSecondary pt-2 border-t border-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {item.expiresIn}
                  </span>
                  <button
                    onClick={() => setRevokeTarget(item)}
                    className="flex items-center gap-1 text-xs font-bold text-danger hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revoke Access</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Revocation */}
      <ConfirmationDialog
        isOpen={!!revokeTarget}
        onClose={() => setRevokeTarget(null)}
        onConfirm={handleRevokeConfirm}
        title="Revoke Healthcare Access?"
        message={`Are you sure you wish to immediately revoke record access for ${revokeTarget?.doctorName}? All generated share links will be invalidated instantly.`}
        confirmText="Revoke Access Now"
      />
    </div>
  );
};

