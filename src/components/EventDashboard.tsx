
import React from 'react';
import { useEvents } from '@/context/EventContext';
import EventCard from './EventCard';

const EventDashboard: React.FC = () => {
  const { filteredEvents } = useEvents();

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-tech-soft-purple p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">No events found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or add a new event.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventDashboard;
