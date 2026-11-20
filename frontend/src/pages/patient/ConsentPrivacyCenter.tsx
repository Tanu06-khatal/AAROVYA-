import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { mockConsentRecords } from '../../data/mockData';
import { ConsentRecord } from '../../types';
import { Lock, ShieldCheck, Clock, Trash2, CheckCircle2, History, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { ConsentService } from '../../services/api';

export const ConsentPrivacyCenter: React.FC = () => {
  const [consents, setConsents] = useState<ConsentRecord[]>(mockConsentRecords);
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'framework'>('active');
  const [revokeTarget, setRevokeTarget] = useState<ConsentRecord | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);

  const { showToast } = useNotifications();

  const handleRevokeConfirm = async () => {
    if (revokeTarget) {
      setIsRevoking(true);
      await ConsentService.revoke(revokeTarget.id);
      setConsents(prev => prev.map(c => c.id === revokeTarget.id ? { ...c, status: 'revoked' } : c));
      setIsRevoking(false);
      showToast(`Access consent immediately revoked for ${revokeTarget.entityName}`, 'success');
      setRevokeTarget(null);
    }
  };

  const activeList = consents.filter(c => c.status === 'active');
  const historyList = consents.filter(c => c.status === 'revoked');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Consent & Privacy Center"
        subtitle="Sovereign patient consent manager. Control who can access your records and revoke permissions on demand"
      />

      {/* Tabs matching Panel 18: Active Sharing, Access History, Consents */}
      <div className="flex border-b border-borderLight gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'active'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          <span>Active Sharing</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[10px]">
            {activeList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'history'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          Access History
        </button>

        <button
          onClick={() => setActiveTab('framework')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'framework'
              ? 'border-primary text-primary font-extrabold'
              : 'border-transparent text-textSecondary hover:text-navy'
          }`}
        >
          Consents & Privacy Framework
        </button>
      </div>

      {/* Active Sharing Cards matching Panel 18 */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeList.map((consent) => (
            <div
              key={consent.id}
              className="bg-white rounded-3xl border border-borderLight p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-extrabold text-navy text-base">{consent.entityName}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {consent.entityRole}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-textSecondary">Authorized Scope:</span>
                  {consent.accessItems.map((item, idx) => (
                    <span key={idx} className="font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-md border border-borderLight">
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-textSecondary flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Expires on: <strong className="text-navy">{consent.expiresDate}</strong></span>
                </p>
              </div>

              {/* Revoke button matching Panel 18 */}
              <div className="self-end sm:self-center flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-danger border-rose-200 hover:bg-rose-50"
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => setRevokeTarget(consent)}
                >
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Access History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {historyList.map((consent) => (
            <div
              key={consent.id}
              className="p-4 bg-white rounded-2xl border border-borderLight flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-bold text-navy text-sm">{consent.entityName}</span>
                <p className="text-textSecondary mt-0.5">Revoked on {consent.expiresDate}</p>
              </div>
              <Badge variant="rejected" size="sm">Revoked</Badge>
            </div>
          ))}
        </div>
      )}

      {/* Consents & Privacy Framework */}
      {activeTab === 'framework' && (
        <div className="bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-4 text-xs text-textSecondary leading-relaxed">
          <h4 className="font-extrabold text-navy text-sm">Patient-Centric Health Data Consent Governance</h4>
          <p>
            Under AAROVYA’s architecture, health data is never shared without explicit patient electronic authorization. All consents follow the National Digital Health Mission (NDHM / ABDM) consent manager specification:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Purpose-Bound:</strong> Access is granted solely for the medical necessity cited (consultation, lab review, second opinion).</li>
            <li><strong>Time-Bound:</strong> Automated token expiry ensures medical records cannot be viewed perpetually.</li>
            <li><strong>Zero-Knowledge Revocation:</strong> Revoking access destroys session encryption keys instantly.</li>
          </ul>
        </div>
      )}

      {/* Confirmation Dialog for Revoke Action */}
      <ConfirmationDialog
        isOpen={!!revokeTarget}
        onClose={() => setRevokeTarget(null)}
        onConfirm={handleRevokeConfirm}
        title="Revoke Healthcare Access Consent?"
        message={`Are you certain you wish to revoke all active data access grants for ${revokeTarget?.entityName}? The clinician will no longer be able to view these records.`}
        confirmText="Revoke Consent"
        isLoading={isRevoking}
      />
    </div>
  );
};

