import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { mockFamilyMembers } from '../../data/mockData';
import { FamilyMember } from '../../types';
import { Users, Plus, ShieldCheck, Heart, User, ChevronRight } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export const FamilyHealthHub: React.FC = () => {
  const [members, setMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState<FamilyMember['relationship']>('Sister');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [age, setAge] = useState('24');
  const [gender, setGender] = useState('Female');

  const { showToast } = useNotifications();

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newMember: FamilyMember = {
      id: `fam-${Date.now()}`,
      name,
      relationship,
      bloodGroup,
      age: parseInt(age) || 25,
      gender,
      recordCount: 0,
      authorizedAccess: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    };

    setMembers([...members, newMember]);
    setIsAddModalOpen(false);
    showToast(`Added ${name} (${relationship}) to your Family Health Hub`, 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Family Health Hub"
        subtitle="Manage unified medical lockers and consent authorizations for your entire family"
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Member
          </Button>
        }
      />

      {/* Family Member Cards matching Panel 13 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl border border-borderLight p-5 shadow-card hover:shadow-card-hover transition-all flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt={member.name}
                className="w-13 h-13 rounded-2xl object-cover ring-2 ring-primary/20 flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy text-sm sm:text-base">{member.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-borderLight">
                    {member.relationship}
                  </span>
                </div>
                <p className="text-xs text-textSecondary mt-0.5">
                  Blood Group: <strong className="text-danger">{member.bloodGroup}</strong> • {member.age} yrs
                </p>
                <p className="text-[11px] text-textSecondary mt-0.5">
                  {member.recordCount} records stored
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedMember(member);
                showToast(`Switched profile context to ${member.name}`, 'info');
              }}
            >
              View Profile
            </Button>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Link Family Member"
        description="Add a dependent or kin to manage their digital health records"
      >
        <form onSubmit={handleAddMember} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PRQ"
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy block mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth>
              Link Member Account
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

