import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { mockFacilities } from '../../data/mockData';
import { MapPin, Phone, Star, ShieldAlert, Navigation, Calendar, User, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const HospitalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const facility = mockFacilities.find(f => f.id === id) || mockFacilities[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'departments' | 'facilities' | 'doctors'>('overview');
  const { showToast } = useNotifications();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={facility.name}
        subtitle={`${facility.address} • ${facility.distanceKm} km away`}
        showBack
        backTo="/patient/nearby-hospitals"
      />

      {/* Hospital Showcase Card (Matching Panel 15) */}
      <div className="bg-white rounded-3xl border border-borderLight overflow-hidden shadow-card">
        {/* Banner Graphic */}
        <div className="h-48 sm:h-64 bg-gradient-to-r from-navy to-navy-light relative flex items-end p-6 text-white">
          <div className="relative z-10 space-y-1">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary text-white uppercase tracking-wider">
              {facility.type}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{facility.name}</h2>
            <div className="flex items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                {facility.rating} ({facility.reviewsCount} verified reviews)
              </span>
              <span>•</span>
              <span className="font-semibold text-blue-200">{facility.distanceKm} km distance</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Action Buttons matching Panel 15 */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Navigation className="w-4 h-4" />}
              onClick={() => showToast(`Opening Google Maps navigation for ${facility.name}`, 'info')}
            >
              Get Directions
            </Button>
            <a href={`tel:${facility.phone}`}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Phone className="w-4 h-4" />}
              >
                Call ({facility.phone})
              </Button>
            </a>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Calendar className="w-4 h-4" />}
              onClick={() => navigate('/patient/appointments')}
            >
              Book Consultation
            </Button>
          </div>

          {/* Navigation Tabs matching Panel 15: Overview, Departments, Facilities, Doctors */}
          <div className="flex border-b border-borderLight gap-4 text-xs font-bold">
            {(['overview', 'departments', 'facilities', 'doctors'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2.5 capitalize transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-primary text-primary font-extrabold'
                    : 'border-transparent text-textSecondary hover:text-navy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-textSecondary block">Hospital Type</span>
                  <span className="font-bold text-navy text-sm">{facility.hospitalType} Enterprise</span>
                </div>
                <div>
                  <span className="text-textSecondary block">Emergency Trauma Services</span>
                  <span className="font-bold text-danger text-sm">
                    {facility.emergency24x7 ? 'Available 24x7 Full Support' : 'OPD Operating Hours Only'}
                  </span>
                </div>
                <div>
                  <span className="text-textSecondary block">Official Reception Contact</span>
                  <span className="font-bold text-navy text-sm font-mono">{facility.phone}</span>
                </div>
                <div>
                  <span className="text-textSecondary block">Physical Address</span>
                  <span className="font-bold text-navy text-sm">{facility.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Departments */}
          {activeTab === 'departments' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {facility.departments.map((dept, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-navy flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>{dept}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Facilities */}
          {activeTab === 'facilities' && (
            <div className="space-y-2">
              {facility.facilities.map((fac, idx) => (
                <div key={idx} className="p-3 bg-blue-50/50 rounded-xl border border-borderLight text-xs font-medium text-navy flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Doctors */}
          {activeTab === 'doctors' && (
            <div className="space-y-3">
              {facility.doctors.map((doc, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-borderLight flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-navy font-bold">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-navy text-sm">{doc.name}</h5>
                      <p className="text-textSecondary">{doc.specialty}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/patient/appointments')}
                  >
                    Consult
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

