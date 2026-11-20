import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderLock,
  ShieldCheck,
  QrCode,
  Users,
  Bot,
  Activity,
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Stethoscope,
  Microscope,
  Shield,
  Smartphone,
  ChevronRight,
  Sparkles,
  Clock,
  Pill,
  Calendar,
  Share2,
  FileCheck2,
  UploadCloud,
  Eye,
  Key,
  Menu,
  X,
  Phone,
  HeartPulse,
  UserCheck,
  Layers,
  FileSearch,
  AlertTriangle,
  History,
  Check,
  CalendarDays,
  Receipt,
  Syringe,
  Search,
  Bell,
  Download,
} from 'lucide-react';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="min-h-screen bg-[#F5F9FF] text-textPrimary flex flex-col antialiased selection:bg-primary-100 selection:text-primary-900">
      {/* ========================================================
          1. HEADER / NAVIGATION BAR
      ======================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-borderLight shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          {/* Left: Brand Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <BrandLogo size="md" />
            <div className="hidden sm:block pl-3 border-l border-borderLight">
              <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase block">
                DIGITAL HEALTH LOCKER
              </span>
              <span className="text-[11px] text-textSecondary font-medium leading-none">
                Healthcare Management Grid
              </span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-textSecondary uppercase tracking-wider">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="text-navy hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
              className="hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#roles"
              onClick={(e) => { e.preventDefault(); scrollToSection('roles'); }}
              className="hover:text-primary transition-colors"
            >
              User Roles
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
              className="hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#security"
              onClick={(e) => { e.preventDefault(); scrollToSection('security'); }}
              className="hover:text-primary transition-colors"
            >
              Security & Privacy
            </a>
          </nav>

          {/* Right: Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link to="/login">
              <Button variant="outline" size="sm" className="font-bold border-borderLight text-navy hover:bg-slate-50">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" className="font-bold shadow-xs">
                Create Health Locker
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-navy hover:bg-blue-50 lg:hidden focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-borderLight px-4 pt-3 pb-6 space-y-3 animate-in fade-in-0 slide-in-from-top-2">
            <div className="space-y-1 text-sm font-semibold text-navy">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                className="block px-3 py-2 rounded-xl hover:bg-blue-50 text-primary"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                className="block px-3 py-2 rounded-xl hover:bg-blue-50"
              >
                Features
              </a>
              <a
                href="#roles"
                onClick={(e) => { e.preventDefault(); scrollToSection('roles'); }}
                className="block px-3 py-2 rounded-xl hover:bg-blue-50"
              >
                User Roles
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                className="block px-3 py-2 rounded-xl hover:bg-blue-50"
              >
                How It Works
              </a>
              <a
                href="#security"
                onClick={(e) => { e.preventDefault(); scrollToSection('security'); }}
                className="block px-3 py-2 rounded-xl hover:bg-blue-50"
              >
                Security & Privacy
              </a>
            </div>

            <div className="pt-3 border-t border-borderLight grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" fullWidth className="font-bold">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" fullWidth className="font-bold">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================
          2. HERO SECTION — EXACT RECREATION WITH LAPTOP MOCKUP
      ======================================================== */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* LEFT COLUMN: Headings, Description, Buttons, Trust Badges */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-borderLight text-primary text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Unified Healthcare Management & Sovereign Records</span>
            </div>

            {/* Main Multiline Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-navy">
              Your Complete <br />
              Health History. <br />
              <span className="text-primary bg-gradient-to-r from-primary via-primary to-primary-light bg-clip-text text-transparent">
                One Unified <br />
                Digital Locker.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-[15px] text-textSecondary max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              AAROVYA brings patients, doctors and diagnostic laboratories together through a unified digital healthcare platform. Organize medical records, manage health information, access intelligent assistance and share records with appropriate consent.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="font-extrabold shadow-card px-6 py-3"
                >
                  Create Your Health Locker →
                </Button>
              </Link>
              <a
                href="#features"
                onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  className="font-bold border-borderLight bg-white hover:bg-slate-50 text-navy px-5 py-3"
                >
                  Explore Features
                </Button>
              </a>
            </div>

            {/* Compact Trust Indicators */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[11px] font-semibold text-textSecondary">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ABDM & Consent Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                Patient-Governed Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-navy flex-shrink-0" />
                Granular Sharing Revocation
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: REALISTIC LAPTOP MOCKUP WITH DASHBOARD SCREEN */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Subtle backlight glow behind laptop */}
            <div className="absolute inset-0 bg-blue-300/25 rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

            <div className="relative w-full max-w-xl mx-auto select-none">
              {/* Laptop Screen Bezel / Frame */}
              <div className="relative rounded-t-2xl bg-slate-900 pt-2.5 px-2.5 sm:pt-3 sm:px-3 pb-0 shadow-2xl border-t border-x border-slate-700/80">
                {/* Laptop Camera Dot */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-blue-400"></div>
                  </div>
                </div>

                {/* Internal Screen Display */}
                <div className="rounded-t-lg overflow-hidden bg-white border border-slate-800 text-[10px] leading-tight flex flex-col h-[280px] sm:h-[340px]">
                  {/* Miniature Browser/App Header */}
                  <div className="bg-slate-100/90 border-b border-borderLight px-3 py-1.5 flex items-center justify-between text-navy flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="ml-2 font-black text-navy text-[10px] tracking-tight">AAROVYA</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 bg-white border border-borderLight rounded-md px-2 py-0.5 text-textSecondary text-[9px] w-44 truncate">
                      <Search className="w-2.5 h-2.5 text-textSecondary flex-shrink-0" />
                      <span className="truncate">Search records, prescriptions...</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[8px]">
                          P1
                        </div>
                        <span className="font-bold text-navy text-[9px]">Patient1</span>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Body: Sidebar + Main Content */}
                  <div className="flex flex-1 overflow-hidden">
                    {/* Mini Left Sidebar */}
                    <div className="w-24 sm:w-28 bg-navy text-slate-300 p-2 flex flex-col justify-between flex-shrink-0 text-[9px]">
                      <div className="space-y-1">
                        <div className="text-[8px] font-black uppercase tracking-wider text-slate-400 px-1.5 pb-1 border-b border-navy-light">
                          Patient View
                        </div>
                        <div className="px-1.5 py-1 rounded bg-primary text-white font-bold flex items-center gap-1">
                          <FolderLock className="w-2.5 h-2.5" />
                          <span>Dashboard</span>
                        </div>
                        <div className="px-1.5 py-0.5 text-slate-300 hover:text-white flex items-center gap-1">
                          <FileText className="w-2.5 h-2.5" />
                          <span>Locker</span>
                        </div>
                        <div className="px-1.5 py-0.5 text-slate-300 hover:text-white flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>Appointments</span>
                        </div>
                        <div className="px-1.5 py-0.5 text-slate-300 hover:text-white flex items-center gap-1">
                          <Pill className="w-2.5 h-2.5" />
                          <span>Prescriptions</span>
                        </div>
                        <div className="px-1.5 py-0.5 text-slate-300 hover:text-white flex items-center gap-1">
                          <History className="w-2.5 h-2.5" />
                          <span>Timeline</span>
                        </div>
                      </div>

                      <div className="p-1 rounded bg-rose-500/20 text-rose-300 text-[8px] font-bold flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5 text-rose-300" />
                        <span>Emergency QR</span>
                      </div>
                    </div>

                    {/* Mini Main Dashboard View */}
                    <div className="flex-1 bg-[#F5F9FF] p-2.5 sm:p-3 overflow-hidden flex flex-col gap-2">
                      {/* Greeting Banner */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-borderLight flex-shrink-0">
                        <div>
                          <span className="font-black text-navy text-[11px] block">
                            Welcome, Patient1! 👋
                          </span>
                          <span className="text-[8px] text-textSecondary">
                            Universal Digital Health Locker • Verified Identity
                          </span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8px] font-bold">
                          Active Vitals
                        </span>
                      </div>

                      {/* Stat Metrics Row */}
                      <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                        <div className="p-1.5 bg-white rounded-lg border border-borderLight shadow-2xs">
                          <span className="text-[8px] text-textSecondary block">Total Documents</span>
                          <span className="text-sm sm:text-base font-black text-navy">42</span>
                          <span className="text-[7px] text-textSecondary block">Locker Records</span>
                        </div>
                        <div className="p-1.5 bg-blue-50/70 rounded-lg border border-borderLight shadow-2xs">
                          <span className="text-[8px] text-primary font-bold block">Verified Records</span>
                          <span className="text-sm sm:text-base font-black text-primary">28</span>
                          <span className="text-[7px] text-primary/80 block">Provider Verified</span>
                        </div>
                      </div>

                      {/* Emergency SOS Mini Bar */}
                      <div className="p-1.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between text-[8px] flex-shrink-0">
                        <div className="flex items-center gap-1 truncate">
                          <Shield className="w-3 h-3 text-danger flex-shrink-0" />
                          <span className="font-bold text-rose-950 truncate">
                            Emergency QR • Blood Group: B+
                          </span>
                        </div>
                        <span className="bg-white text-danger font-black px-1 rounded shadow-2xs text-[7px] flex-shrink-0">
                          Scan SOS
                        </span>
                      </div>

                      {/* Recent Documents Table Preview */}
                      <div className="space-y-1 flex-1 overflow-hidden">
                        <div className="flex items-center justify-between text-[8px] font-bold text-textSecondary uppercase">
                          <span>Recent Records</span>
                          <span className="text-primary">Open Locker</span>
                        </div>

                        <div className="p-1.5 bg-white rounded-lg border border-borderLight flex items-center justify-between text-[8px]">
                          <div className="flex items-center gap-1.5 truncate">
                            <FileText className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="font-bold text-navy truncate">Blood_Report.pdf</span>
                          </div>
                          <span className="px-1 py-0.5 rounded bg-blue-50 text-primary font-bold text-[7px] border border-borderLight">
                            Verified
                          </span>
                        </div>

                        <div className="p-1.5 bg-white rounded-lg border border-borderLight flex items-center justify-between text-[8px]">
                          <div className="flex items-center gap-1.5 truncate">
                            <Pill className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="font-bold text-navy truncate">Prescription_DrSharma.pdf</span>
                          </div>
                          <span className="px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[7px] border border-emerald-200">
                            Active Rx
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base / Hinge Frame */}
              <div className="relative mx-auto h-3 sm:h-4 w-[105%] -ml-[2.5%] rounded-b-xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-xl border-t border-slate-300 flex items-start justify-center">
                {/* Display Open Notch in center */}
                <div className="w-16 sm:w-20 h-1 sm:h-1.5 rounded-b-md bg-slate-500/80" />
              </div>

              {/* Laptop Base Drop Shadow */}
              <div className="mx-auto w-[88%] h-3 bg-slate-900/20 rounded-full blur-md mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURE STRIP (6 Compact Cards in One Row on Desktop)
      ======================================================== */}
      <section id="features" className="py-8 bg-white border-y border-borderLight px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              {
                title: 'Digital Health Locker',
                desc: 'Categorized records vault',
                icon: <FolderLock className="w-4 h-4 text-primary" />,
              },
              {
                title: 'OCR & AI Extraction',
                desc: 'Automated clinical scans',
                icon: <FileSearch className="w-4 h-4 text-primary" />,
              },
              {
                title: 'Secure Record Sharing',
                desc: 'Time-bound doctor access',
                icon: <Share2 className="w-4 h-4 text-primary" />,
              },
              {
                title: 'Consent Management',
                desc: 'Grant & revoke permissions',
                icon: <ShieldCheck className="w-4 h-4 text-primary" />,
              },
              {
                title: 'Emergency Profile & QR',
                desc: 'Instant SOS medical vitals',
                icon: <QrCode className="w-4 h-4 text-primary" />,
              },
              {
                title: 'Healthcare Coordination',
                desc: 'Unified doctor & lab grid',
                icon: <Stethoscope className="w-4 h-4 text-primary" />,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F5F9FF] border border-borderLight hover:border-primary hover:bg-white hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-2 rounded-xl bg-blue-50 border border-borderLight w-fit mb-2">
                    {card.icon}
                  </div>
                  <h3 className="font-extrabold text-navy text-xs leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-textSecondary mt-0.5 leading-snug">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. USER ECOSYSTEM SECTION
      ======================================================== */}
      <section id="roles" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Stakeholder Portals
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Designed for the Complete Healthcare Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-textSecondary">
            Dedicated user interfaces engineered specifically for patients, clinicians, and diagnostic laboratories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Patient */}
          <div className="p-6 sm:p-8 rounded-3xl border border-borderLight bg-white shadow-card hover:border-primary transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-primary w-fit border border-borderLight">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-black text-navy text-xl">Patient Portal</h3>
              <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
                Centralized health records locker for personal and family health data.
              </p>
              <ul className="space-y-2 text-xs text-navy font-semibold pt-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Manage personal medical records in encrypted categories</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Access lifetime health history & chronological timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Share records with authorized doctors with permission controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Manage and revoke consent grants anytime</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-borderLight mt-6">
              <Link to="/register">
                <Button variant="primary" size="md" fullWidth className="font-bold">
                  Get Started as Patient
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Doctor */}
          <div className="p-6 sm:p-8 rounded-3xl border border-borderLight bg-white shadow-card hover:border-primary transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-700 w-fit border border-sky-100">
                <Stethoscope className="w-6 h-6 text-sky-700" />
              </div>
              <h3 className="font-black text-navy text-xl">Doctor Portal</h3>
              <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
                Clinical console for verified physicians, specialists, and outpatient clinics.
              </p>
              <ul className="space-y-2 text-xs text-navy font-semibold pt-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>Access authorized patient records upon patient approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>Review comprehensive medical history and test parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>Manage daily consultations and issue electronic prescriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <span>Handle patient follow-ups and access requests seamlessly</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-borderLight mt-6">
              <Link to="/login">
                <Button variant="outline" size="md" fullWidth className="font-bold">
                  Doctor Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 3: Laboratory */}
          <div className="p-6 sm:p-8 rounded-3xl border border-borderLight bg-white shadow-card hover:border-primary transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-700 w-fit border border-purple-100">
                <Microscope className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-black text-navy text-xl">Laboratory Staff</h3>
              <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
                Diagnostic hub for accredited testing laboratories and pathology centers.
              </p>
              <ul className="space-y-2 text-xs text-navy font-semibold pt-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Manage inbound diagnostic test requests from clinicians</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Upload verified laboratory reports directly to patient lockers</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Maintain relevant report history and sample test audit logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Ensure diagnostic report authenticity with verification stamps</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 border-t border-borderLight mt-6">
              <Link to="/login">
                <Button variant="outline" size="md" fullWidth className="font-bold">
                  Laboratory Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. HOW IT WORKS SECTION
      ======================================================== */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-y border-borderLight px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Simple Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Simple Healthcare Management in Four Steps
            </h2>
            <p className="text-sm sm:text-base text-textSecondary">
              Experience a more organized approach to your health information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 'Step 1',
                title: 'Create Your Account',
                desc: 'Sign up with your essential contact information and choose your user category.',
                icon: <UserCheck className="w-5 h-5 text-primary" />,
              },
              {
                step: 'Step 2',
                title: 'Complete Your Profile',
                desc: 'Provide basic demographic information or authorized clinical credentials.',
                icon: <HeartPulse className="w-5 h-5 text-primary" />,
              },
              {
                step: 'Step 3',
                title: 'Organize Health Records',
                desc: 'Upload diagnostics, prescriptions, and lab tests into categorized sovereign folders.',
                icon: <FolderLock className="w-5 h-5 text-primary" />,
              },
              {
                step: 'Step 4',
                title: 'Share With Control',
                desc: 'Authorize trusted healthcare professionals with selective permissions and expiry dates.',
                icon: <Share2 className="w-5 h-5 text-primary" />,
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#F5F9FF] border border-borderLight hover:border-primary hover:bg-white hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-primary px-2.5 py-1 rounded-full bg-blue-50 border border-borderLight">
                      {st.step}
                    </span>
                    <div className="p-2 rounded-xl bg-white border border-borderLight text-primary">
                      {st.icon}
                    </div>
                  </div>
                  <h3 className="font-extrabold text-navy text-base mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-textSecondary leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SECURITY & PRIVACY SECTION
      ======================================================== */}
      <section id="security" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Privacy & Trust
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Your Health Information Deserves Responsible Access
          </h2>
          <p className="text-sm sm:text-base text-textSecondary">
            Engineered around the patient's sovereign right to govern who views their medical records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-borderLight shadow-card space-y-3">
            <div className="p-3 rounded-2xl bg-blue-50 text-primary w-fit border border-borderLight">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-navy text-lg">Consent-Based Sharing</h3>
            <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
              Clinicians must request permission to view records. Patients review the request with full visibility and approve or reject access with one tap.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-borderLight shadow-card space-y-3">
            <div className="p-3 rounded-2xl bg-blue-50 text-primary w-fit border border-borderLight">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-navy text-lg">Granular Permission Controls</h3>
            <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
              Grant view-only permissions or permit report downloads. Configure automatic expiry after 24 hours, 7 days, or 30 days.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-borderLight shadow-card space-y-3">
            <div className="p-3 rounded-2xl bg-blue-50 text-primary w-fit border border-borderLight">
              <History className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-navy text-lg">Auditable Access History</h3>
            <p className="text-xs sm:text-sm text-textSecondary leading-relaxed">
              Transparent audit logs record every instance a clinician or laboratory accesses your files. Instant revocation ends access immediately.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FINAL CALL TO ACTION
      ======================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-navy tracking-tight leading-tight">
          Bring Your Healthcare Records Together with AAROVYA.
        </h2>

        <p className="text-sm sm:text-base text-textSecondary max-w-2xl mx-auto leading-relaxed">
          Create your digital health space and experience a more organized approach to healthcare information.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/register" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />} className="font-bold shadow-card px-8">
              Create Your Health Locker
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" fullWidth className="font-bold border-borderLight bg-white text-navy px-8">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* ========================================================
          8. DARK NAVY HORIZONTAL FOOTER (With Discreet Admin Portal)
      ======================================================== */}
      <footer className="mt-auto bg-[#102A43] text-slate-300 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          {/* Left: Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <BrandLogo textColor="text-white" size="md" />
            <div className="pl-3 border-l border-slate-700">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary-light block">
                Digital Health Locker
              </span>
              <span className="text-[11px] text-slate-400">
                Healthcare Management Platform
              </span>
            </div>
          </div>

          {/* Right: Quick Links & Discreet Admin Portal */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-white transition-colors">
              About
            </a>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#security" onClick={(e) => { e.preventDefault(); scrollToSection('security'); }} className="hover:text-white transition-colors">
              Security & Privacy
            </a>
            <span className="hover:text-white transition-colors cursor-pointer">
              Contact
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </span>

            {/* DISCREET ADMIN PORTAL LINK */}
            <Link
              to="/admin/login"
              className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 pl-2 border-l border-slate-700"
              title="Restricted Administrative Access Only"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800/80 text-center text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} AAROVYA — A Unified Digital Health Locker & Healthcare Management Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
