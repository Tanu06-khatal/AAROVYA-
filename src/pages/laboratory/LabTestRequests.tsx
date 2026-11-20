import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { mockLabTestRequests } from '../../data/mockData';
import { Microscope, Search, Filter } from 'lucide-react';
import { SearchBar } from '../../components/common/SearchBar';

export const LabTestRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const requests = mockLabTestRequests.filter(r =>
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Diagnostic Test Requests"
        subtitle="Inbound medical laboratory orders from empanelled hospitals and clinics"
      />

      <div className="bg-white p-4 rounded-2xl border border-borderLight shadow-sm">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search requests by patient or test type..."
        />
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-5 bg-white rounded-3xl border border-borderLight shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-navy text-base">{req.patientName}</h4>
                <Badge variant={req.status === 'Completed' ? 'verified' : req.status === 'In-Progress' ? 'info' : 'pending'} size="sm">
                  {req.status}
                </Badge>
              </div>
              <p className="text-xs font-semibold text-primary mt-0.5">{req.testName}</p>
              <p className="text-xs text-textSecondary mt-0.5">
                Referred by: <strong>{req.referringDoctor}</strong> • {req.requestedDate}
              </p>
            </div>

            <Button variant="outline" size="sm">
              Manage Phlebotomy Sample
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

