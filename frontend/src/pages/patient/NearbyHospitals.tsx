import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { mockFacilities } from '../../data/mockData';
import { HealthcareFacility } from '../../types';
import { MapPin, Navigation, Phone, Star, ShieldAlert, ArrowRight, Building, Microscope, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NearbyHospitals: React.FC = () => {
  const [filterType, setFilterType] = useState<'All' | 'Hospital' | 'Lab' | 'Pharmacy'>('All');
  const navigate = useNavigate();

  const filtered = mockFacilities.filter(f =>
    filterType === 'All' ? true : f.type === filterType
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Nearby Healthcare Facilities (GPS)"
        subtitle="Locate certified empanelled hospitals, diagnostic laboratories, and 24x7 pharmacies with live navigation"
      />

      {/* Filter Tabs matching Panel 14: All, Hospital, Lab, Pharmacy */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {(['All', 'Hospital', 'Lab', 'Pharmacy'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              filterType === type
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-white text-navy border-borderLight hover:bg-slate-50'
            }`}
          >
            {type === 'Hospital' && <Building className="w-3.5 h-3.5" />}
            {type === 'Lab' && <Microscope className="w-3.5 h-3.5" />}
            {type === 'Pharmacy' && <Pill className="w-3.5 h-3.5" />}
            <span>{type === 'All' ? 'All Facilities' : type}</span>
          </button>
        ))}
      </div>

      {/* Interactive Map Simulation (Matching Panel 14) */}
      <div className="bg-slate-100 rounded-3xl border border-borderLight h-56 sm:h-72 relative overflow-hidden flex items-center justify-center shadow-card group">
        {/* Map Background Grid graphic */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* You Are Here Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="px-3 py-1 bg-navy text-white text-xs font-bold rounded-full shadow-md mb-1 animate-bounce">
            You Are Here
          </div>
          <div className="w-6 h-6 rounded-full bg-primary ring-4 ring-primary/30 flex items-center justify-center text-white">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>

        {/* Surrounding Facility Markers */}
        <div className="absolute top-10 left-12 sm:left-24 bg-white/95 px-2.5 py-1 rounded-xl shadow-md border border-slate-200 text-[10px] font-bold text-navy flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/patient/hospitals/fac-001')}>
          <div className="w-2 h-2 rounded-full bg-rose-500" />
          <span>City Hospital (2.3 km)</span>
        </div>

        <div className="absolute bottom-12 right-12 sm:right-28 bg-white/95 px-2.5 py-1 rounded-xl shadow-md border border-slate-200 text-[10px] font-bold text-navy flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/patient/hospitals/fac-002')}>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>District Civil Hospital (3.8 km)</span>
        </div>

        <div className="absolute top-12 right-16 sm:right-40 bg-white/95 px-2.5 py-1 rounded-xl shadow-md border border-slate-200 text-[10px] font-bold text-navy flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/patient/hospitals/fac-003')}>
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span>ABC Diagnostics (1.6 km)</span>
        </div>
      </div>

      {/* Facilities List matching Panel 14 */}
      <div className="space-y-4">
        {filtered.map((facility) => (
          <div
            key={facility.id}
            className="bg-white rounded-3xl border border-borderLight p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h4 className="font-extrabold text-navy text-base">{facility.name}</h4>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                  {facility.type}
                </span>
                {facility.emergency24x7 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-danger border border-rose-200 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    24x7 Emergency
                  </span>
                )}
              </div>

              <p className="text-xs text-textSecondary flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-textSecondary" />
                {facility.address}
              </p>

              <div className="flex items-center gap-4 text-xs font-semibold text-textSecondary pt-1">
                <span className="text-primary font-bold">
                  {facility.distanceKm} km away
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {facility.rating} ({facility.reviewsCount} reviews)
                </span>
                <span>Type: <strong className="text-navy">{facility.hospitalType}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/patient/hospitals/${facility.id}`)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

