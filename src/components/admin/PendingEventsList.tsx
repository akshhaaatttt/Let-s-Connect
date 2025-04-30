
import React from 'react';
import { EnhancedEvent } from '@/pages/Admin';
import AdminEventCard from './AdminEventCard';

interface PendingEventsListProps {
  events: EnhancedEvent[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const PendingEventsList: React.FC<PendingEventsListProps> = ({ 
  events, 
  onApprove, 
  onReject, 
  onDelete,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <p>Loading pending events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-gray-600">No pending events</h3>
        <p className="text-gray-500 mt-2">All submitted events have been reviewed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          These events are waiting for your approval before they appear on the site.
        </p>
      </div>
      
      {events.map(event => (
        <AdminEventCard
          key={event.id}
          event={event}
          actions={[
            { label: 'Approve', onClick: () => onApprove(event.id), color: 'bg-green-600 hover:bg-green-700' },
            { label: 'Reject', onClick: () => onReject(event.id), color: 'bg-amber-600 hover:bg-amber-700' },
            { label: 'Delete', onClick: () => onDelete(event.id), color: 'bg-red-600 hover:bg-red-700' }
          ]}
        />
      ))}
    </div>
  );
};

export default PendingEventsList;
