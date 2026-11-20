import React from 'react';
import { FileText, Eye, Share2, ShieldCheck, Download, MoreVertical, Calendar } from 'lucide-react';
import { HealthRecord } from '../../types';
import { Badge } from '../common/Badge';

interface DocumentCardProps {
  record: HealthRecord;
  onView: (record: HealthRecord) => void;
  onShare?: (record: HealthRecord) => void;
  onVerify?: (record: HealthRecord) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  record,
  onView,
  onShare,
  onVerify,
}) => {
  const categoryColors: Record<string, string> = {
    reports: 'text-primary bg-primary-50 border-primary-100',
    prescriptions: 'text-blue-600 bg-blue-50 border-blue-100',
    consultations: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    discharge: 'text-purple-600 bg-purple-50 border-purple-100',
    vaccination: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    insurance: 'text-amber-600 bg-amber-50 border-amber-100',
  };

  return (
    <div className="bg-white rounded-2xl border border-borderLight p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border capitalize ${
              categoryColors[record.category] || 'text-slate-600 bg-slate-50 border-slate-100'
            }`}
          >
            {record.category}
          </span>

          <Badge variant={record.verificationStatus} size="sm">
            {record.verificationStatus === 'provider_verified'
              ? 'Provider Verified'
              : record.verificationStatus === 'verified'
              ? 'Verified'
              : 'Pending Verification'}
          </Badge>
        </div>

        {/* Title and Icon */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-primary flex-shrink-0 group-hover:bg-primary-50 group-hover:text-primary-dark transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4
              onClick={() => onView(record)}
              className="text-sm font-bold text-navy hover:text-primary cursor-pointer line-clamp-1 transition-colors"
              title={record.title}
            >
              {record.title}
            </h4>
            <p className="text-xs text-textSecondary truncate mt-0.5">{record.fileName} • {record.fileSize}</p>
          </div>
        </div>

        {/* Metadata Details */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1 text-xs text-textSecondary">
          <div className="flex items-center justify-between">
            <span className="truncate">Provider: <strong className="text-navy font-semibold">{record.provider}</strong></span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-textSecondary">
              <Calendar className="w-3 h-3" />
              {record.uploadDate}
            </span>
            {record.doctorName && (
              <span className="text-textSecondary truncate">{record.doctorName}</span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onView(record)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold text-primary bg-primary-50 hover:bg-primary-100 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>

        {onShare && (
          <button
            onClick={() => onShare(record)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl text-xs font-semibold text-textSecondary hover:text-navy hover:bg-slate-100 border border-borderLight transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
};

