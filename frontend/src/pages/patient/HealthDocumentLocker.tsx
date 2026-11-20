import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { Button } from '../../components/common/Button';
import { DocumentCard } from '../../components/records/DocumentCard';
import { DocumentPreviewModal } from '../../components/records/DocumentPreviewModal';
import { ShareRecordModal } from '../../components/records/ShareRecordModal';
import { EmptyState } from '../../components/common/EmptyState';
import { mockHealthRecords } from '../../data/mockData';
import { HealthRecord, RecordCategory } from '../../types';
import { LayoutGrid, List, UploadCloud, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HealthDocumentLocker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [shareRecordTarget, setShareRecordTarget] = useState<HealthRecord | null>(null);

  const categories = [
    { id: 'all', label: 'All Records', count: 42 },
    { id: 'reports', label: 'Reports', count: 14 },
    { id: 'prescriptions', label: 'Prescriptions', count: 6 },
    { id: 'consultations', label: 'Consultations', count: 6 },
    { id: 'discharge', label: 'Discharge', count: 3 },
    { id: 'vaccination', label: 'Vaccination', count: 5 },
    { id: 'insurance', label: 'Insurance', count: 2 },
  ];

  const filteredRecords = mockHealthRecords.filter(rec => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || rec.verificationStatus === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Health Document Locker"
        subtitle="Secure, categorized digital repository of your verified health records & reports"
        action={
          <Link to="/patient/upload-record">
            <Button variant="primary" size="sm" leftIcon={<UploadCloud className="w-4 h-4" />}>
              Upload & Extract
            </Button>
          </Link>
        }
      />

      {/* Category Tabs with Counts (Matching Reference Image Panel 3) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-white text-navy border-borderLight hover:bg-slate-50'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-textSecondary'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search, Status Filter & Layout Toggle Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-borderLight shadow-sm">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by report name, doctor or hospital..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-borderLight rounded-xl text-navy font-medium focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="provider_verified">Provider Verified</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-borderLight">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-white text-primary shadow-xs' : 'text-textSecondary hover:text-navy'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'list' ? 'bg-white text-primary shadow-xs' : 'text-textSecondary hover:text-navy'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Records Display: Responsive Grid vs Mobile-Friendly List */}
      {filteredRecords.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecords.map((record) => (
              <DocumentCard
                key={record.id}
                record={record}
                onView={setSelectedRecord}
                onShare={setShareRecordTarget}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-borderLight overflow-hidden shadow-card">
            <div className="divide-y divide-borderLight">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy text-sm hover:text-primary cursor-pointer truncate" onClick={() => setSelectedRecord(record)}>
                        {record.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {record.category}
                      </span>
                    </div>
                    <p className="text-xs text-textSecondary mt-0.5">
                      {record.fileName} • {record.fileSize} • {record.provider} • {record.uploadDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button variant="outline" size="sm" onClick={() => setSelectedRecord(record)}>
                      View
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShareRecordTarget(record)}>
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <EmptyState
          title="No Health Records Match Your Filters"
          description="Try modifying your search keywords, category filters, or upload a new record."
          actionText="Upload Document"
          onAction={() => {}}
        />
      )}

      {/* Preview Modal */}
      <DocumentPreviewModal
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onShare={(rec) => setShareRecordTarget(rec)}
      />

      {/* Share Modal */}
      <ShareRecordModal
        isOpen={!!shareRecordTarget}
        onClose={() => setShareRecordTarget(null)}
        availableRecords={mockHealthRecords}
        preselectedRecord={shareRecordTarget}
      />
    </div>
  );
};

