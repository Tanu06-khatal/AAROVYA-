import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { SearchBar } from '../../components/common/SearchBar';
import { DocumentCard } from '../../components/records/DocumentCard';
import { DocumentPreviewModal } from '../../components/records/DocumentPreviewModal';
import { mockHealthRecords } from '../../data/mockData';
import { HealthRecord } from '../../types';
import { FolderLock, ShieldCheck, Eye } from 'lucide-react';

export const DoctorPatientRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const records = mockHealthRecords.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Authorized Patient Records"
        subtitle="Clinical diagnostic vault for patients who have granted active healthcare consent"
      />

      <div className="bg-white p-4 rounded-2xl border border-borderLight shadow-sm">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter authorized records by title, category, or test type..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((rec) => (
          <DocumentCard
            key={rec.id}
            record={rec}
            onView={setSelectedRecord}
          />
        ))}
      </div>

      <DocumentPreviewModal
        record={selectedRecord}
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
      />
    </div>
  );
};

