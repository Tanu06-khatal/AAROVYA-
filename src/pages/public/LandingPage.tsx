import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderLock,
  ShieldCheck,
  QrCode,
  Users,
  Bot,
  Activity,
  ArrowRight,
  CheckCircle,
  FileText,
  Lock,
  Stethoscope,
  Microscope,
  Shield,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { switchRole } = useAuth();

  return (
    <div className="min-h-screen bg-background text-textPrimary flex flex-col antialiased">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-borderLight h-18 py-3 px-4 sm:px-8 flex items-center justify-between">
        <BrandLogo size="md" />

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-textSecondary">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#roles" className="hover:text-primary transition-colors">User Roles</a>
          <a href="#security" className="hover:text-primary transition-colors">Security & Privacy</a>
          <a href="#emergency" className="hover:text-primary transition-colors">Emergency QR</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">Create Health Locker</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center lg:text-left overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Universal Digital Health Records Grid</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.15]">
              Your Complete Health History. <br />
              <span className="text-primary bg-clip-text">One Unified Digital Locker.</span>
            </h1>

            <p className="text-base sm:text-lg text-textSecondary max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              AAROVYA empowers patients, doctors, and diagnostic laboratories with encrypted digital health records, consent-based doctor access, emergency QR vitals, and intelligent OCR extraction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/patient/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" fullWidth>
                  Explore Live Demo
                </Button>
              </Link>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-textSecondary">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                ABDM & Ayushman Bharat Ready
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                256-Bit End-to-End Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-navy" />
                Granular Patient Consent Control
              </span>
            </div>
          </div>

          {/* Hero Visual Mockup Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl shadow-elevated border border-borderLight p-6 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-borderLight pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                    P1
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">Patient1</h4>
                    <p className="text-xs text-textSecondary">Blood Group: B+ • Verified Patient</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Vitals
                </span>
              </div>

              {/* Stat Tiles Preview */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-textSecondary block">Total Documents</span>
                  <span className="text-xl font-extrabold text-navy">42</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-borderLight">
                  <span className="text-primary block font-medium">Verified Records</span>
                  <span className="text-xl font-extrabold text-navy">28</span>
                </div>
              </div>

              {/* Emergency Banner mini */}
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-danger flex-shrink-0" />
                  <span className="text-xs font-bold text-rose-900">Emergency Profile & QR Active</span>
                </div>
                <span className="text-[10px] font-bold bg-white text-danger px-2 py-0.5 rounded shadow-xs">
                  Scan SOS
                </span>
              </div>

              {/* Recent item preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-navy truncate">Blood_Report.pdf</span>
                </div>
                <span className="text-[10px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full border border-borderLight">
                  Provider Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Showcase Section */}
      <section id="roles" className="py-16 bg-white border-y border-borderLight px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Designed for the Complete Healthcare Ecosystem
            </h2>
            <p className="mt-2 text-sm text-textSecondary">
              Switch seamlessly between patient, physician, diagnostic lab, and administrator workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Patient */}
            <div className="p-6 rounded-2xl border border-borderLight bg-slate-50/50 hover:border-primary hover:shadow-card transition-all">
              <div className="p-3 rounded-xl bg-blue-50 text-primary w-fit mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy text-lg">Patient Portal</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Centralized health records locker, medicine schedules, appointments, emergency QR card, and family health hub.
              </p>
              <Link
                to="/patient/dashboard"
                onClick={() => switchRole('patient')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                <span>Launch Patient Portal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2. Doctor */}
            <div className="p-6 rounded-2xl border border-borderLight bg-slate-50/50 hover:border-primary hover:shadow-card transition-all">
              <div className="p-3 rounded-xl bg-sky-100 text-sky-700 w-fit mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy text-lg">Doctor Portal</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Access authorized patient histories, manage daily clinic consultation queues, and issue digital prescriptions.
              </p>
              <Link
                to="/doctor/dashboard"
                onClick={() => switchRole('doctor')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:underline"
              >
                <span>Launch Doctor Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3. Laboratory */}
            <div className="p-6 rounded-2xl border border-borderLight bg-slate-50/50 hover:border-primary hover:shadow-card transition-all">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 w-fit mb-4">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy text-lg">Laboratory Portal</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Receive inbound diagnostic requisitions, process sample test results, and push cryptographically signed PDF reports.
              </p>
              <Link
                to="/laboratory/dashboard"
                onClick={() => switchRole('laboratory')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:underline"
              >
                <span>Launch Lab Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4. Administrator */}
            <div className="p-6 rounded-2xl border border-borderLight bg-slate-50/50 hover:border-primary hover:shadow-card transition-all">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-700 w-fit mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-navy text-lg">Administrator Console</h3>
              <p className="text-xs text-textSecondary mt-2 leading-relaxed">
                Audit healthcare provider licenses, monitor institutional verification queues, and enforce HIPAA/ABDM compliance logs.
              </p>
              <Link
                to="/admin/dashboard"
                onClick={() => switchRole('admin')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:underline"
              >
                <span>Launch Admin Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 30 Modules Architecture Callout */}
      <section id="features" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">30 Integrated Modules</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy mt-1">
            Built for Real-World Clinical Interoperability
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            From emergency barcode cards to automated OCR document parsing, AAROVYA addresses every phase of modern digital healthcare delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-borderLight shadow-sm space-y-2">
            <div className="p-2.5 rounded-xl bg-primary-50 text-primary w-fit">
              <FolderLock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy text-base">Health Document Locker</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Categorized storage for lab reports, discharge summaries, prescriptions, and insurance cards with OCR extraction.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-borderLight shadow-sm space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit">
              <QrCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy text-base">Emergency Profile & QR Code</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Instant access for emergency responders to critical blood group, drug allergies, chronic conditions, and next-of-kin contacts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-borderLight shadow-sm space-y-2">
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 w-fit">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy text-base">AI Health Assistant</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Conversational clinical assistant that summarizes lab parameters, clarifies complex medical jargon, and highlights normal ranges.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-navy text-slate-300 py-10 px-4 sm:px-8 border-t border-navy-light">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <BrandLogo textColor="text-white" />
            <p className="text-xs text-slate-400 mt-2">
              AAROVYA — Complete Healthcare Management & Digital Health Records Platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-400 font-medium">
            <Link to="/patient/dashboard" className="hover:text-white transition-colors">Patient View</Link>
            <Link to="/doctor/dashboard" className="hover:text-white transition-colors">Doctor View</Link>
            <Link to="/laboratory/dashboard" className="hover:text-white transition-colors">Lab View</Link>
            <Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin Console</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

