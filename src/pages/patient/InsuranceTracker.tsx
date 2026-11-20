import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockInsurancePolicy } from '../../data/mockData';
import { ShieldCheck, Calendar, FileText, CheckCircle2, TrendingUp, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const InsuranceTracker: React.FC = () => {
  const policy = mockInsurancePolicy;

  const monthlyExpenseData = [
    { month: 'Jan', amount: 3500 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 4200 },
    { month: 'Apr', amount: 2600 },
    { month: 'May', amount: 3900 },
    { month: 'Jun', amount: 8500 },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Insurance & Expense Tracker"
        subtitle="Manage health insurance policy benefits, cashless hospital eligibility, and annual claims"
      />

      {/* Featured Policy Card matching Panel 23 */}
      <div className="bg-gradient-to-br from-navy to-navy-light text-white rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Primary Health Insurance
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {policy.status}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">{policy.providerName}</h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">Policy No: {policy.policyNumber}</p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-300 block">Total Cashless Coverage</span>
            <span className="text-2xl font-black text-white">₹10,00,000</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div>
            <span className="text-slate-400 block">Valid Until</span>
            <span className="font-bold text-white text-sm">{policy.validUntil}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Network Hospitals</span>
            <span className="font-bold text-white text-sm">{policy.cashlessHospitalsCount.toLocaleString()} Cashless</span>
          </div>
          <div>
            <span className="text-slate-400 block">Co-Pay Requirement</span>
            <span className="font-bold text-white text-sm">0% (Nil Co-Pay)</span>
          </div>
        </div>
      </div>

      {/* Expense Overview & Monthly Chart matching Panel 23 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-borderLight pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-textSecondary">
              Out-of-Pocket Expense Breakdown
            </span>
            <h3 className="font-extrabold text-navy text-xl sm:text-2xl mt-0.5">
              ₹{policy.totalExpensesYear.toLocaleString()}
            </h3>
            <span className="text-xs text-textSecondary">Total Expenses (This Year)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ₹18,200 Reimbursed via TPA
            </span>
          </div>
        </div>

        {/* Recharts Monthly Expense Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyExpenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E3A8A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Expenses']}
              />
              <Bar dataKey="amount" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

