import React, { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  ShieldCheck,
  User as UserIcon,
  HeartPulse,
  Stethoscope,
  Building2,
  Phone,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Camera,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const ProfileSetupPage: React.FC = () => {
  const { user, isAuthenticated, role, completeProfile, updateUserProfile } = useAuth();
  const { showToast } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.pathname.includes('/edit') || user?.isProfileComplete;

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Section A: Basic Personal Information
  const [fullName, setFullName] = useState(user.name || '');
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth || '1998-05-14');
  const [gender, setGender] = useState(user.gender || 'Female');
  const [mobileNumber, setMobileNumber] = useState(user.phone || '');
  const [emailAddress, setEmailAddress] = useState(user.email || '');
  const [address, setAddress] = useState(user.address || 'Flat 402, Royal Palms, Shivaji Nagar');
  const [city, setCity] = useState(user.city || 'Pune, Maharashtra');
  const [avatar, setAvatar] = useState(
    user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  );

  // Section B: Role-Specific Information - Patient
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'B+');
  const [allergies, setAllergies] = useState(user.allergies || 'Penicillin, Dust pollen');
  const [conditions, setConditions] = useState(user.conditions || 'None');
  const [emergencyContactName, setEmergencyContactName] = useState(user.emergencyContactName || 'PRQ');
  const [emergencyRelation, setEmergencyRelation] = useState(user.emergencyRelation || 'Father');
  const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact || '+91 98221 12345');

  // Section B: Role-Specific Information - Doctor
  const [qualifications, setQualifications] = useState(user.qualifications || 'MBBS, MD (Cardiology)');
  const [specialization, setSpecialization] = useState(user.specialty || 'Cardiologist');
  const [hospitalAffiliation, setHospitalAffiliation] = useState(user.facilityName || 'ABC Hospital / City Hospital');
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || 'MCI-CARD-49210');
  const [department, setDepartment] = useState(user.department || 'Department of Cardiology');
  const [experience, setExperience] = useState(user.experience || '10 Years');

  // Section B: Role-Specific Information - Laboratory Staff
  const [labName, setLabName] = useState(user.facilityName || 'ABC Diagnostics Central Lab');
  const [labLicense, setLabLicense] = useState(user.licenseNumber || 'NABL-LAB-9041');
  const [labDisciplines, setLabDisciplines] = useState(user.department || 'Pathology, Biochemistry, Hematology');
  const [labDirector, setLabDirector] = useState('Dr. S. K. Kulkarni (MD Pathologist)');
  const [labPhone, setLabPhone] = useState(user.phone || '+91 20 6789 0123');
  const [labAddress, setLabAddress] = useState(user.address || 'Diagnostic Plaza, FC Road, Pune');

  const [isLoading, setIsLoading] = useState(false);

  // Preset avatar choices
  const avatarPresets = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let updatedPayload: Record<string, any> = {
      name: fullName.trim() || user.name,
      dateOfBirth,
      gender,
      phone: mobileNumber.trim() || user.phone,
      email: emailAddress.trim() || user.email,
      address,
      city,
      avatar,
    };

    if (role === 'doctor') {
      updatedPayload = {
        ...updatedPayload,
        qualifications,
        specialty: specialization,
        facilityName: hospitalAffiliation,
        licenseNumber,
        department,
        experience,
      };
    } else if (role === 'laboratory') {
      updatedPayload = {
        ...updatedPayload,
        facilityName: labName,
        licenseNumber: labLicense,
        department: labDisciplines,
        address: labAddress,
        phone: labPhone,
      };
    } else if (role === 'patient') {
      updatedPayload = {
        ...updatedPayload,
        bloodGroup,
        allergies,
        conditions,
        emergencyContactName,
        emergencyRelation,
        emergencyContact,
      };
    }

    setTimeout(async () => {
      await completeProfile(updatedPayload);
      setIsLoading(false);
      showToast(isEditMode ? 'Profile updated successfully!' : 'Profile completed successfully!', 'success');

      // Navigate to role-specific dashboard
      if (role === 'doctor') navigate('/doctor/dashboard');
      else if (role === 'laboratory') navigate('/laboratory/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/patient/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl text-center px-4">
        <BrandLogo size="lg" className="justify-center mb-3" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-borderLight text-primary text-xs font-bold mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
          <span>{isEditMode ? 'Profile Management' : 'Onboarding Step 2: Profile Building'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          {isEditMode ? 'Edit Your Profile' : 'Complete Your Profile'}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-textSecondary max-w-lg mx-auto">
          Please provide the necessary information to personalize your AAROVYA experience.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-3xl px-4">
        <div className="bg-white py-8 px-5 sm:px-8 shadow-elevated rounded-3xl border border-borderLight">
          <form onSubmit={handleSaveProfile} className="space-y-8">
            {/* SECTION A: BASIC PERSONAL INFORMATION */}
            <div className="space-y-4">
              <div className="border-b border-borderLight pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-primary" />
                    Section A: Basic Personal Information
                  </h3>
                  <p className="text-xs text-textSecondary mt-0.5">
                    Universal demographic and contact identity for your verified profile
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-borderLight capitalize">
                  {role === 'laboratory' ? 'Laboratory Staff' : role}
                </span>
              </div>

              {/* Profile Photo Upload / Preset Avatar Selection */}
              <div>
                <label className="block text-xs font-bold text-navy mb-2 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-primary" />
                  Profile Photo (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={avatar}
                    alt="Profile Avatar"
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 border border-borderLight"
                  />
                  <div className="space-y-1">
                    <p className="text-[11px] text-textSecondary">Choose an avatar preset or provide photo URL:</p>
                    <div className="flex items-center gap-2">
                      {avatarPresets.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(p)}
                          className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                            avatar === p ? 'border-primary ring-2 ring-primary/30' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={p} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Patient1 or Dr. Priya Sharma"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Date of Birth & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Email & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Residential Street Address & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Residential Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 402, Royal Palms"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">City & State</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SECTION B: ROLE-SPECIFIC INFORMATION */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-borderLight pb-3">
                <h3 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                  {role === 'patient' && <HeartPulse className="w-4 h-4 text-primary" />}
                  {role === 'doctor' && <Stethoscope className="w-4 h-4 text-primary" />}
                  {role === 'laboratory' && <Building2 className="w-4 h-4 text-primary" />}
                  Section B: Role-Specific Details ({role === 'laboratory' ? 'Laboratory Staff' : role.toUpperCase()})
                </h3>
                <p className="text-xs text-textSecondary mt-0.5">
                  Parameters customized for your specific healthcare workflow
                </p>
              </div>

              {/* B1. PATIENT SPECIFIC FIELDS */}
              {role === 'patient' && (
                <div className="space-y-4">
                  {/* Blood Group & Clinical Parameters */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Blood Group</label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Known Drug / Food Allergies</label>
                      <input
                        type="text"
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                        placeholder="e.g. Penicillin, Peanuts (or None)"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Chronic Medical Conditions</label>
                      <input
                        type="text"
                        value={conditions}
                        onChange={(e) => setConditions(e.target.value)}
                        placeholder="e.g. Asthma, Hypertension (or None)"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Emergency Contact Information */}
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-3">
                    <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-danger" />
                      Emergency Contact (Linked to QR Emergency Card)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-navy mb-1">Contact Person Name</label>
                        <input
                          type="text"
                          required
                          value={emergencyContactName}
                          onChange={(e) => setEmergencyContactName(e.target.value)}
                          placeholder="e.g. PRQ"
                          className="w-full px-3 py-2 text-xs bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-navy mb-1">Relationship</label>
                        <select
                          value={emergencyRelation}
                          onChange={(e) => setEmergencyRelation(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                          <option value="Guardian">Guardian</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-navy mb-1">Emergency Phone</label>
                        <input
                          type="tel"
                          required
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          placeholder="+91 98221 12345"
                          className="w-full px-3 py-2 text-xs bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* B2. DOCTOR SPECIFIC FIELDS */}
              {role === 'doctor' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Medical Council License Number</label>
                      <input
                        type="text"
                        required
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="e.g. MCI-CARD-49210"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Specialization / Department</label>
                      <select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="Cardiologist">Cardiology</option>
                        <option value="General Physician">General Medicine</option>
                        <option value="Neurologist">Neurology</option>
                        <option value="Pediatrician">Pediatrics</option>
                        <option value="Orthopedic Surgeon">Orthopedics</option>
                        <option value="Dermatologist">Dermatology</option>
                        <option value="Oncologist">Oncology</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Hospital or Organization</label>
                      <input
                        type="text"
                        required
                        value={hospitalAffiliation}
                        onChange={(e) => setHospitalAffiliation(e.target.value)}
                        placeholder="e.g. ABC Hospital / City Hospital"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Qualifications & Medical Degrees</label>
                      <input
                        type="text"
                        required
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        placeholder="e.g. MBBS, MD, DM"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Department Unit</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="e.g. Department of Cardiovascular Care"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Years of Clinical Experience</label>
                      <input
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="e.g. 10 Years"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* B3. LABORATORY STAFF SPECIFIC FIELDS */}
              {role === 'laboratory' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Laboratory Name</label>
                      <input
                        type="text"
                        required
                        value={labName}
                        onChange={(e) => setLabName(e.target.value)}
                        placeholder="e.g. ABC Diagnostics Central Lab"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">NABL / Clinical Establishment ID</label>
                      <input
                        type="text"
                        required
                        value={labLicense}
                        onChange={(e) => setLabLicense(e.target.value)}
                        placeholder="e.g. NABL-LAB-9041"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">Diagnostic Testing Disciplines</label>
                    <input
                      type="text"
                      required
                      value={labDisciplines}
                      onChange={(e) => setLabDisciplines(e.target.value)}
                      placeholder="e.g. Pathology, Biochemistry, Microbiology, Hematology"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Lead Pathologist / Authorized Contact</label>
                      <input
                        type="text"
                        value={labDirector}
                        onChange={(e) => setLabDirector(e.target.value)}
                        placeholder="e.g. Dr. S. K. Kulkarni"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5">Dispatch Contact Phone</label>
                      <input
                        type="tel"
                        value={labPhone}
                        onChange={(e) => setLabPhone(e.target.value)}
                        placeholder="+91 20 6789 0123"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">Laboratory Facility Address</label>
                    <input
                      type="text"
                      value={labAddress}
                      onChange={(e) => setLabAddress(e.target.value)}
                      placeholder="Commercial Diagnostic Plaza, FC Road, Pune"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-borderLight rounded-xl text-navy focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Security Compliance Note */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-textSecondary flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <span>
                Personal and clinical parameters are encrypted end-to-end under ABDM and HIPAA health information frameworks.
              </span>
            </div>

            {/* Save Profile Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                className="flex items-center justify-center gap-2"
              >
                <span>{isEditMode ? 'Save Changes & Return to Dashboard' : 'Save Profile & Open Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
