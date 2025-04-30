
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import AddEventForm from './AddEventForm';
import EventFilters from './EventFilters';
import EventDashboard from './EventDashboard';
import UserEventsDashboard from './UserEventsDashboard';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

const TechEventsLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <div className="w-full animate-fade-in animation-delay-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-tech-purple">
            Browse Events
          </h2>
          <p className="text-muted-foreground mt-2 mb-4 md:mb-0">
            Find tech events that match your interests
          </p>
        </div>

        <div className="w-full md:w-auto">
          <AddEventForm />
        </div>
      </div>

      {user && (
        <>
          <UserEventsDashboard />
          <Separator className="my-8" />
        </>
      )}

      <EventFilters />
      <EventDashboard />
    </div>
  );
};

export default TechEventsLayout;
