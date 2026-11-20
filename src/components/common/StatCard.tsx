import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  trend,
  onClick,
  variant = 'default',
}) => {
  const borderVariants = {
    default: 'hover:border-slate-300',
    primary: 'hover:border-primary-light',
    success: 'hover:border-emerald-400',
    warning: 'hover:border-amber-400',
    danger: 'hover:border-rose-400',
  };

  const bgVariants = {
    default: 'bg-white',
    primary: 'bg-gradient-to-br from-white to-primary-50/40',
    success: 'bg-gradient-to-br from-white to-emerald-50/40',
    warning: 'bg-gradient-to-br from-white to-amber-50/40',
    danger: 'bg-gradient-to-br from-white to-rose-50/40',
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-2xl border border-borderLight shadow-card transition-all duration-200 ${bgVariants[variant]} ${borderVariants[variant]} ${
        onClick ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-textSecondary">{title}</span>
        {icon && (
          <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 text-primary border border-slate-100 flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 sm:mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-semibold ${
              trend.isPositive ? 'text-success' : 'text-danger'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1 text-xs text-textSecondary">{subtitle}</p>}
    </div>
  );
};

