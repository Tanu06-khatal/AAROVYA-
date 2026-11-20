import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { Badge } from '../../components/common/Badge';
import { mockAuditLogs } from '../../data/mockData';
import { AuditLogItem } from '../../types';
import { Activity, ShieldCheck, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useNotifications } from '../../context/NotificationContext';

export const AdminAuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedAction, setSelectedAction] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const { showToast } = useNotifications();

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || log.role === selectedRole;
    const matchesAction = selectedAction === 'All' || log.action === selectedAction;
    return matchesSearch && matchesRole && matchesAction;
  });

  const actionColors: Record<string, 'verified' | 'info' | 'pending' | 'rejected' | 'neutral'> = {
    View: 'info',
    Share: 'verified',
    Upload: 'verified',
    Verify: 'verified',
    Revoke: 'rejected',
    Login: 'neutral',
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Audit Logs & Access History"
        subtitle="Immutable chronological access trails tracking clinical record views, consent changes, and verification events"
        action={
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => showToast('Audit trail exported as CSV for ABDM compliance auditing', 'success')}
          >
            Export Audit Trail (CSV)
          </Button>
        }
      />

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-borderLight shadow-sm">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by user or record name..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold"
          >
            <option value="All">All Roles</option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Lab Staff">Lab Staff</option>
            <option value="Admin">Admin</option>
          </select>

          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-borderLight rounded-xl text-navy font-semibold"
          >
            <option value="All">All Actions</option>
            <option value="View">View</option>
            <option value="Share">Share</option>
            <option value="Upload">Upload</option>
            <option value="Verify">Verify</option>
            <option value="Revoke">Revoke</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table matching Panel 30 */}
      <div className="bg-white rounded-3xl border border-borderLight overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-borderLight font-extrabold text-navy uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Time</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLight">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-textSecondary">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-navy whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px]">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge variant={actionColors[log.action] || 'neutral'} size="sm">
                      {log.action}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-textSecondary font-medium">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Panel 30: < 1 2 3 ... 10 > */}
        <div className="p-4 border-t border-borderLight flex items-center justify-between text-xs text-textSecondary">
          <span>Showing 1 to {filteredLogs.length} of {filteredLogs.length} audit entries</span>

          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-borderLight hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg border border-borderLight hover:bg-slate-50 font-bold">2</button>
            <button className="px-3 py-1 rounded-lg border border-borderLight hover:bg-slate-50 font-bold">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="px-3 py-1 rounded-lg border border-borderLight hover:bg-slate-50 font-bold">10</button>
            <button className="p-1.5 rounded-lg border border-borderLight hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

