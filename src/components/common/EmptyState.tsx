import React from 'react';
import { FolderOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
}) => {
  return (
    <div className={`p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-borderLight bg-white/60 flex flex-col items-center justify-center ${className}`}>
      <div className="p-3.5 rounded-2xl bg-slate-100 text-textSecondary mb-4">
        {icon || <FolderOpen className="w-8 h-8 text-textSecondary/70" />}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-navy">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-textSecondary max-w-sm">{description}</p>
      {actionText && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

