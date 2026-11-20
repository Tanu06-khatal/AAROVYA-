import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { mockHealthMetrics } from '../../data/mockData';
import { Scale, Heart, Droplet, Activity, TrendingUp, Calendar } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const HealthAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'systolic' | 'bloodSugar' | 'weight' | 'heartRate'>('systolic');

  const metricsConfig = {
    systolic: {
      name: 'Blood Pressure (Systolic)',
      unit: 'mmHg',
      color: '#2563EB',
      current: '118/76',
      normalRange: '90 - 120 mmHg',
    },
    bloodSugar: {
      name: 'Fasting Blood Sugar',
      unit: 'mg/dL',
      color: '#0284C7',
      current: '92',
      normalRange: '70 - 100 mg/dL',
    },
    weight: {
      name: 'Body Weight',
      unit: 'kg',
      color: '#16A34A',
      current: '58.0',
      normalRange: '52 - 62 kg',
    },
    heartRate: {
      name: 'Resting Heart Rate',
      unit: 'bpm',
      color: '#DC2626',
      current: '70',
      normalRange: '60 - 100 bpm',
    },
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Health Analytics & Insights"
        subtitle="Longitudinal physiological trends, biometric markers, and automated predictive tracking"
      />

      {/* Vital Metric Cards matching Panel 27: Weight 58kg, BP 118/76, Sugar 92 mg/dL */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Weight */}
        <div
          onClick={() => setSelectedMetric('weight')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-card ${
            selectedMetric === 'weight'
              ? 'bg-emerald-50/50 border-emerald-400 ring-2 ring-emerald-400/20'
              : 'bg-white border-borderLight hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Weight</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-navy">58</span>
            <span className="text-xs font-bold text-textSecondary">kg</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">Normal BMI (21.4)</span>
        </div>

        {/* BP */}
        <div
          onClick={() => setSelectedMetric('systolic')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-card ${
            selectedMetric === 'systolic'
              ? 'bg-blue-50/50 border-primary ring-2 ring-primary/20'
              : 'bg-white border-borderLight hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Blood Pressure</span>
            <div className="p-2 rounded-xl bg-blue-100 text-primary">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-navy">118/76</span>
            <span className="text-xs font-bold text-textSecondary">mmHg</span>
          </div>
          <span className="text-[11px] text-primary font-semibold block mt-1">Optimal Range</span>
        </div>

        {/* Sugar */}
        <div
          onClick={() => setSelectedMetric('bloodSugar')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer shadow-card ${
            selectedMetric === 'bloodSugar'
              ? 'bg-sky-50/50 border-sky-400 ring-2 ring-sky-400/20'
              : 'bg-white border-borderLight hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-textSecondary uppercase tracking-wider">Fasting Sugar</span>
            <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-navy">92</span>
            <span className="text-xs font-bold text-textSecondary">mg/dL</span>
          </div>
          <span className="text-[11px] text-sky-800 font-semibold block mt-1">Non-Diabetic</span>
        </div>
      </div>

      {/* Health Trends (Last 6 Months) Chart matching Panel 27 */}
      <div className="bg-white rounded-3xl border border-borderLight p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-borderLight pb-4">
          <div>
            <h3 className="font-extrabold text-navy text-base sm:text-lg">
              Health Trends (Last 6 Months)
            </h3>
            <p className="text-xs text-textSecondary mt-0.5">
              Tracking: <strong>{metricsConfig[selectedMetric].name}</strong> ({metricsConfig[selectedMetric].normalRange})
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            {(['systolic', 'bloodSugar', 'weight', 'heartRate'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                  selectedMetric === m
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-textSecondary hover:text-navy'
                }`}
              >
                {m === 'systolic' ? 'BP' : m === 'bloodSugar' ? 'Sugar' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockHealthMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricsConfig[selectedMetric].color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={metricsConfig[selectedMetric].color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} stroke="#E2E8F0" />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip
                contentStyle={{ backgroundColor: '#102A43', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(val: number) => [`${val} ${metricsConfig[selectedMetric].unit}`, metricsConfig[selectedMetric].name]}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={metricsConfig[selectedMetric].color}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#metricGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

