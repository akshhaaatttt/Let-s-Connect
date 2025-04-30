
import React from 'react';
import { EnhancedEvent } from '@/pages/Admin';
import AdminEventCard from './AdminEventCard';

interface RejectedEventsListProps {
  events: EnhancedEvent[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const RejectedEventsList: React.FC<RejectedEventsListProps> = ({ 
  events, 
  onApprove,
  onDelete,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <p>Loading rejected events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium text-gray-600">No rejected events</h3>
        <p className="text-gray-500 mt-2">There are no rejected events at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <p className="text-sm text-red-700">
          These events have been rejected and are not visible to users.
        </p>
      </div>
      
      {events.map(event => (
        <AdminEventCard
          key={event.id}
          event={event}
          actions={[
            { label: 'Approve', onClick: () => onApprove(event.id), color: 'bg-green-600 hover:bg-green-700' },
            { label: 'Delete', onClick: () => onDelete(event.id), color: 'bg-red-600 hover:bg-red-700' }
          ]}
        />
      ))}
    </div>
  );
};

export default RejectedEventsList;
