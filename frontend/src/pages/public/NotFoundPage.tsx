import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-borderLight shadow-elevated p-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-warning mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-navy">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          The requested health module or clinical record path does not exist or may have been moved.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link to="/" className="flex-1">
            <Button variant="outline" size="md" fullWidth leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Landing Page
            </Button>
          </Link>
          <Link to="/patient/dashboard" className="flex-1">
            <Button variant="primary" size="md" fullWidth leftIcon={<Home className="w-4 h-4" />}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

