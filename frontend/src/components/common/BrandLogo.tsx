import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  linkTo?: string;
  textColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  linkTo = '/',
  textColor = 'text-navy',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Badge */}
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white shadow-md">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${iconSizes[size]} text-white`}
        >
          {/* Medical cross inside shield */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.15)" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight">
          <span className={`font-extrabold ${textSizes[size]} text-primary`}>AAR</span>
          <span className={`font-extrabold ${textSizes[size]} ${textColor}`}>OVYA</span>
          <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-primary-light"></span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-textSecondary uppercase -mt-0.5">
            Digital Health Locker
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="inline-block hover:opacity-95 transition-opacity">{content}</Link>;
  }

  return content;
};

