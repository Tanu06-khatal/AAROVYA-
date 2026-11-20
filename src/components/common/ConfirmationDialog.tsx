import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'warning';
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" showCloseButton={false}>
      <div className="text-center pt-2 pb-1">
        <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-3.5 ${
          variant === 'danger' ? 'bg-rose-100 text-danger' : 'bg-amber-100 text-warning'
        }`}>
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-navy">{title}</h3>
        <p className="mt-1.5 text-xs sm:text-sm text-textSecondary">{message}</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading} className="flex-1">
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

