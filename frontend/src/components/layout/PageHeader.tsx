import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
  action?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  backTo,
  action,
  badge,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 mb-5 border-b border-borderLight">
      <div className="flex items-start gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl text-textSecondary hover:text-navy hover:bg-slate-100 transition-colors flex-shrink-0 mt-0.5"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">{title}</h1>
            {badge}
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-textSecondary mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {action && <div className="flex items-center gap-2.5 self-start sm:self-auto">{action}</div>}
    </div>
  );
};

