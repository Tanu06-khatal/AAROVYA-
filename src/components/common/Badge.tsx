import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'verified' | 'provider_verified' | 'pending' | 'rejected' | 'info' | 'neutral' | 'success';
  size?: 'sm' | 'md';
  icon?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon = true,
  className = '',
}) => {
  const styles = {
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    provider_verified: 'bg-blue-50 text-blue-800 border-blue-300 font-semibold',
    pending: 'bg-amber-50 text-amber-700 border-amber-200/80',
    rejected: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  };

  const icons = {
    verified: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
    provider_verified: <ShieldCheck className="w-3.5 h-3.5 text-primary" />,
    pending: <Clock className="w-3 h-3 text-amber-600" />,
    rejected: <XCircle className="w-3 h-3 text-rose-600" />,
    info: <CheckCircle2 className="w-3 h-3 text-sky-600" />,
    neutral: null,
    success: <CheckCircle2 className="w-3 h-3 text-emerald-600" />,
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${styles[variant]} ${sizes[size]} ${className}`}
    >
      {icon && icons[variant]}
      <span>{children}</span>
    </span>
  );
};

