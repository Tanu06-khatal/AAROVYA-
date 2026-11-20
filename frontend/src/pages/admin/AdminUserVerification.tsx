import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ShieldCheck, Check, X, FileText, User, Building2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

interface VerificationApplicant {
  id: string;
  name: string;
  type: 'Doctor' | 'Hospital' | 'Diagnostic Lab';
  licenseNumber: string;
  institution: string;
  submittedDate: string;
  status: 'Pending' | 'Verified' | 'Rejected';
}

export const AdminUserVerification: React.FC = () => {
  const { showToast } = useNotifications();
  const [applicants, setApplicants] = useState<VerificationApplicant[]>([
    {
      id: 'ver-1',
      name: 'Dr. Suresh Rao',
      type: 'Doctor',
      licenseNumber: 'MCI-NEURO-94812',
      institution: 'Apollo Scan Center, Pune',
      submittedDate: '24 Sep 2026',
      status: 'Pending',
    },
    {
      id: 'ver-2',
      name: 'Sahyadri Specialty Hospital',
      type: 'Hospital',
      licenseNumber: 'NABH-HOSP-2041',
      institution: 'Deccan Gymkhana, Pune',
      submittedDate: '23 Sep 2026',
      status: 'Pending',
    },
    {
      id: 'ver-3',
      name: 'Metropolis Molecular Lab',
      type: 'Diagnostic Lab',
      licenseNumber: 'NABL-LAB-8812',
      institution: 'Camp Branch, Pune',
      submittedDate: '22 Sep 2026',
      status: 'Pending',
    },
    {
      id: 'ver-4',
      name: 'Dr. Priya Sharma',
      type: 'Doctor',
      licenseNumber: 'MCI-CARD-49210',
      institution: 'ABC Hospital / City Hospital',
      submittedDate: '15 Sep 2026',
      status: 'Verified',
    },
  ]);

  const handleApprove = (id: string, name: string) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
    showToast(`Approved medical credentials for ${name}`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a));
    showToast(`Rejected verification for ${name}`, 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Practitioner & Facility Verifications"
        subtitle="Review official medical council registrations, state health licenses, and NABL/NABH accreditations"
      />

      <div className="space-y-3">
        {applicants.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-3xl border border-borderLight shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-blue-50 text-primary border border-borderLight flex-shrink-0">
                {item.type === 'Doctor' ? <User className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy text-sm sm:text-base">{item.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                    {item.type}
                  </span>
                  <Badge variant={item.status === 'Verified' ? 'verified' : item.status === 'Rejected' ? 'rejected' : 'pending'} size="sm">
                    {item.status}
                  </Badge>
                </div>
                <p className="text-xs text-textSecondary">
                  License: <strong className="font-mono text-navy">{item.licenseNumber}</strong> • {item.institution}
                </p>
                <p className="text-[11px] text-textSecondary">Submitted on {item.submittedDate}</p>
              </div>
            </div>

            {item.status === 'Pending' && (
              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="success"
                  size="sm"
                  leftIcon={<Check className="w-4 h-4" />}
                  onClick={() => handleApprove(item.id, item.name)}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-danger border-rose-200 hover:bg-rose-50"
                  leftIcon={<X className="w-4 h-4" />}
                  onClick={() => handleReject(item.id, item.name)}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

