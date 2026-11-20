import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { mockEmergencyProfile, mockCurrentUser } from '../../data/mockData';
import { ShieldAlert, Download, Share2, Phone, Heart, AlertTriangle, QrCode, Printer, User } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const EmergencyProfileQR: React.FC = () => {
  const [profile] = useState(mockEmergencyProfile);
  const { showToast } = useNotifications();

  const handleDownloadCard = () => {
    showToast('Emergency SOS Health Card downloaded as printable PDF', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Medical Profile - Patient1',
        text: 'Critical emergency health profile & emergency contacts.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Emergency profile link copied to clipboard', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Emergency Profile & QR Code"
        subtitle="Publicly accessible emergency vitals for first responders and ER trauma specialists"
      />

      {/* Red Emergency Alert Header matching Panel 12 */}
      <div className="bg-gradient-to-r from-danger to-red-700 text-white p-5 sm:p-6 rounded-3xl shadow-elevated flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur flex-shrink-0">
          <ShieldAlert className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">Emergency QR Code</h2>
          <p className="text-xs sm:text-sm text-rose-100 mt-0.5">
            Share critical health info in emergencies. Responders can scan the QR code even when your phone is locked.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Scannable QR Code Card */}
        <div className="md:col-span-5 bg-white rounded-3xl border border-borderLight p-6 shadow-card text-center flex flex-col items-center justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-textSecondary uppercase tracking-wider">
              Scannable Emergency Barcode
            </span>
            <h3 className="font-extrabold text-navy text-lg">{mockCurrentUser.name}</h3>
            <p className="text-xs text-textSecondary">ID: AAR-8291-0428</p>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm relative group">
            <img
              src={profile.qrCodeUrl}
              alt="Emergency QR Code"
              className="w-48 h-48 mx-auto object-contain"
            />
            <div className="mt-2 text-[10px] font-bold text-slate-500 uppercase">
              Scan with any mobile camera
            </div>
          </div>

          {/* Action Buttons matching Panel 12 */}
          <div className="w-full flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleDownloadCard}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Download Card
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleShare}
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Right: Critical Vitals Badges (Matching Panel 12) */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-borderLight p-6 shadow-card space-y-5">
          <div className="border-b border-borderLight pb-3">
            <h3 className="font-extrabold text-navy text-sm uppercase tracking-wider">
              Critical Life-Saving Information
            </h3>
            <p className="text-xs text-textSecondary mt-0.5">Parameters immediately revealed to ambulance paramedics</p>
          </div>

          {/* Vitals Grid matching Panel 12: Blood Group (B+), Allergies, Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Blood Group */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                Blood Group
              </span>
              <span className="text-2xl font-black text-danger block">{profile.bloodGroup}</span>
              <span className="text-[10px] text-rose-700">Universal Compatible</span>
            </div>

            {/* Allergies */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Allergies
              </span>
              <span className="text-xs font-bold text-amber-950 block">{profile.allergies.join(', ')}</span>
              <span className="text-[10px] text-amber-700">Avoid Penicillin</span>
            </div>

            {/* Medical Conditions */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
                Condition
              </span>
              <span className="text-xs font-bold text-sky-950 block">{profile.conditions.join(', ')}</span>
              <span className="text-[10px] text-sky-700">Inhaler Carried</span>
            </div>
          </div>

          {/* Emergency Contacts List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-textSecondary">
              Emergency Contacts (Next of Kin)
            </h4>

            {profile.emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-borderLight bg-slate-50 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy">{contact.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      {contact.relationship}
                    </span>
                  </div>
                  <p className="text-textSecondary mt-0.5 font-mono">{contact.phone}</p>
                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            ))}
          </div>

          {/* Emergency Notes */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-textSecondary">
            <strong className="text-navy font-semibold">Special Paramedic Instructions: </strong>
            {profile.emergencyNotes}
          </div>
        </div>
      </div>
    </div>
  );
};

