
import React from 'react';
import { EnhancedEvent } from '@/pages/Admin';
import AdminEventCard from './AdminEventCard';

interface ApprovedEventsListProps {
  events: EnhancedEvent[];
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ApprovedEventsList: React.FC<ApprovedEventsListProps> = ({ 
  events, 
  onReject, 
  onDelete,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <p>Loading approved events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-gray-600">No approved events</h3>
        <p className="text-gray-500 mt-2">There are no events currently approved and visible on the site.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
        <p className="text-sm text-green-700">
          These events are currently visible to all users on the site.
        </p>
      </div>
      
      {events.map(event => (
        <AdminEventCard
          key={event.id}
          event={event}
          actions={[
            { label: 'Reject', onClick: () => onReject(event.id), color: 'bg-amber-600 hover:bg-amber-700' },
            { label: 'Delete', onClick: () => onDelete(event.id), color: 'bg-red-600 hover:bg-red-700' }
          ]}
        />
      ))}
    </div>
  );
};

export default ApprovedEventsList;
