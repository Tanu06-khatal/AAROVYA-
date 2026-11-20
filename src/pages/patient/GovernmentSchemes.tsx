import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { mockGovernmentSchemes } from '../../data/mockData';
import { GovernmentScheme } from '../../types';
import { Building2, ExternalLink, ShieldCheck, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export const GovernmentSchemes: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Central' | 'State'>('All');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  const filteredSchemes = mockGovernmentSchemes.filter(s =>
    activeFilter === 'All' ? true : s.type === activeFilter
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Government Healthcare Schemes"
        subtitle="Empanelled national and state welfare subsidies, Ayushman Bharat entitlements, and cashless coverage"
      />

      {/* Tabs matching Panel 16: All, Central, State */}
      <div className="flex border-b border-borderLight gap-4 text-xs font-bold">
        {(['All', 'Central', 'State'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`pb-3 capitalize transition-all border-b-2 ${
              activeFilter === tab
                ? 'border-primary text-primary font-extrabold'
                : 'border-transparent text-textSecondary hover:text-navy'
            }`}
          >
            {tab === 'All' ? 'All Schemes' : `${tab} Schemes`}
          </button>
        ))}
      </div>

      {/* Schemes List matching Panel 16 */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-borderLight p-6 shadow-card hover:shadow-card-hover transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    scheme.type === 'Central'
                      ? 'bg-blue-50 text-primary border border-borderLight'
                      : 'bg-purple-50 text-purple-800 border-purple-200'
                  }`}
                >
                  {scheme.type} Government {scheme.stateName && `(${scheme.stateName})`}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Coverage: {scheme.coverage}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-navy text-base sm:text-lg">{scheme.name}</h3>
              <p className="text-xs sm:text-sm text-textSecondary mt-1 leading-relaxed">
                {scheme.description}
              </p>
            </div>

            {/* Quick Benefits Bullet points */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
              <span className="font-bold text-navy block mb-1">Key Entitlements:</span>
              {scheme.benefits.slice(0, 2).map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-textSecondary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedScheme(scheme)}
              >
                View Full Eligibility & Documents
              </Button>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <span>Official National Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      <Modal
        isOpen={!!selectedScheme}
        onClose={() => setSelectedScheme(null)}
        title={selectedScheme?.officialShortName || 'Scheme Details'}
        description={selectedScheme?.name}
        maxWidth="lg"
      >
        {selectedScheme && (
          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-navy text-sm mb-1.5">Eligibility Criteria</h4>
              <ul className="space-y-1.5 list-disc pl-5 text-textSecondary">
                {selectedScheme.eligibility.map((el, i) => (
                  <li key={i}>{el}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-navy text-sm mb-1.5">Documents Required for Registration</h4>
              <div className="flex flex-wrap gap-2">
                {selectedScheme.documentsRequired.map((doc, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-100 text-navy font-semibold">
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-borderLight text-navy">
              <h5 className="font-bold mb-1">How AAROVYA Integrates With AB PM-JAY</h5>
              <p className="leading-relaxed">
                You can directly link your 14-digit ABHA (Ayushman Bharat Health Account) to automatically sync your eligibility cards and claim cashless authorizations at empanelled hospital networks.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

