import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-borderLight shadow-elevated p-8 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-danger mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-navy">Access Restricted</h1>
        <p className="text-xs sm:text-sm text-textSecondary">
          You do not possess the required clinical authorization or role permissions to view this record.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link to="/login" className="flex-1">
            <Button variant="primary" size="md" fullWidth leftIcon={<LogIn className="w-4 h-4" />}>
              Sign In With Role
            </Button>
          </Link>
          <Link to="/patient/dashboard" className="flex-1">
            <Button variant="outline" size="md" fullWidth leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

