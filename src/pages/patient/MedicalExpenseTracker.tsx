import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { mockMedicalExpenses } from '../../data/mockData';
import { MedicalExpense } from '../../types';
import { Receipt, Plus, Calendar, Download, TrendingUp } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { formatCurrency } from '../../utils/formatters';

export const MedicalExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<MedicalExpense[]>(mockMedicalExpenses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [category, setCategory] = useState<MedicalExpense['category']>('Consultation');
  const [amount, setAmount] = useState('800');
  const [vendor, setVendor] = useState('Apollo Diagnostics');
  const [date, setDate] = useState('2026-09-24');

  const { showToast } = useNotifications();

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newExp: MedicalExpense = {
      id: `exp-${Date.now()}`,
      category,
      amount: parseFloat(amount) || 0,
      hospitalOrVendor: vendor,
      date: new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };

    setExpenses([newExp, ...expenses]);
    setIsAddModalOpen(false);
    showToast(`Added expense of ₹${amount} for ${category}`, 'success');
  };

  const totalThisMonth = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Medical Expense Tracker"
        subtitle="Itemized healthcare expenditure ledger for clinical consults, diagnostic scans, and pharmaceuticals"
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Expense
          </Button>
        }
      />

      {/* Main Expense Table Card matching Panel 26 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-borderLight gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 text-primary border border-borderLight">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-navy text-base sm:text-lg">Medical Expenses</h3>
              <p className="text-xs text-textSecondary">Verified hospital bills and pharmacy receipts</p>
            </div>
          </div>

          <div className="text-left sm:text-right bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-xs text-textSecondary block">Total (This Month)</span>
            <span className="text-xl sm:text-2xl font-black text-navy">{formatCurrency(totalThisMonth)}</span>
          </div>
        </div>

        {/* Expense Items List matching Panel 26 */}
        <div className="space-y-3">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-2xl border border-borderLight hover:border-slate-300 transition-all flex items-center justify-between gap-4 bg-slate-50/40"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{exp.date}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-800">
                    {exp.category}
                  </span>
                </div>
                <p className="text-xs font-medium text-navy">{exp.hospitalOrVendor}</p>
              </div>

              <div className="text-right">
                <span className="text-base font-extrabold text-navy">{formatCurrency(exp.amount)}</span>
                {exp.receiptNumber && (
                  <p className="text-[10px] text-textSecondary font-mono">{exp.receiptNumber}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Record Healthcare Expense"
        description="Log an out-of-pocket medical bill or invoice"
      >
        <form onSubmit={handleAddExpense} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-navy block mb-1">Expense Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            >
              <option value="Consultation">Doctor Consultation</option>
              <option value="Lab Test">Laboratory Investigation / Scan</option>
              <option value="Medicines">Medicines & Pharmacy</option>
              <option value="Procedures">Surgical & Hospital Procedures</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-navy block mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-navy block mb-1">Hospital / Clinic / Pharmacy Name</label>
            <input
              type="text"
              required
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-borderLight rounded-xl text-navy"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth>
              Save Expense Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

