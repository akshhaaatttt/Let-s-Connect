import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, EventType } from '../types/event';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { EventRow } from '@/integrations/supabase/schema';

interface EventContextType {
  events: Event[];
  filteredEvents: Event[];
  filters: {
    search: string;
    type: EventType | 'all';
    college: string;
    startDate: Date | null;
    endDate: Date | null;
    isOnlineOnly: boolean;
  };
  userEvents: Event[];
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    type: EventType | 'all';
    college: string;
    startDate: Date | null;
    endDate: Date | null;
    isOnlineOnly: boolean;
  }>>;
  addEvent: (event: Omit<any, 'id'>) => Promise<void>;
  resetFilters: () => void;
  colleges: string[];
  eventTypes: (EventType | 'all')[];
  isLoading: boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all' as EventType | 'all',
    college: 'all',
    startDate: null as Date | null,
    endDate: null as Date | null,
    isOnlineOnly: false
  });

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
    
    // Set up realtime subscription for approved events
    try {
      const channel = supabase
        .channel('public-events-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'events',
            filter: 'status=eq.approved'
          },
          (payload) => {
            console.log('Real-time update for approved events:', payload);
            
            if (payload.eventType === 'INSERT') {
              const newEvent = mapEventRowToEvent(payload.new as EventRow);
              setEvents(prev => [newEvent, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setEvents(prev => 
                prev.map(event => 
                  event.id === payload.new.id ? mapEventRowToEvent(payload.new as EventRow) : event
                )
              );
            } else if (payload.eventType === 'DELETE') {
              setEvents(prev => prev.filter(event => event.id !== payload.old.id));
            }
          }
        )
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    } catch (error) {
      console.error('Error setting up realtime subscription:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
      
      // Set up realtime subscription for user events
      try {
        const userEventsChannel = supabase
          .channel('user-events-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'events',
              filter: `user_id=eq.${user.id}`
            },
            (payload) => {
              console.log('Real-time update for user events:', payload);
              
              if (payload.eventType === 'INSERT') {
                const newEvent = mapEventRowToEvent(payload.new as EventRow);
                setUserEvents(prev => [newEvent, ...prev]);
              } else if (payload.eventType === 'UPDATE') {
                setUserEvents(prev => 
                  prev.map(event => 
                    event.id === payload.new.id ? mapEventRowToEvent(payload.new as EventRow) : event
                  )
                );
              } else if (payload.eventType === 'DELETE') {
                setUserEvents(prev => prev.filter(event => event.id !== payload.old.id));
              }
            }
          )
          .subscribe();
          
        return () => {
          supabase.removeChannel(userEventsChannel);
        };
      } catch (error) {
        console.error('Error setting up user events realtime subscription:', error);
      }
    } else {
      setUserEvents([]);
    }
  }, [user]);

  // Helper function to map database row to Event interface
  const mapEventRowToEvent = (row: EventRow): Event => {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      date: row.date,
      endDate: row.end_date || undefined,
      location: row.location,
      college: row.college,
      type: row.type as EventType,
      link: row.link,
      image: row.image || undefined,
      isOnline: row.is_online,
      status: row.status,
      user_id: row.user_id,
      created_at: row.created_at,
      updated_at: row.updated_at
    };
  };

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'approved')
        .order('date', { ascending: true });
        
      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: 'Error fetching events',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }
      
      // If data is null or undefined, default to empty array
      const eventsData = data || [];
      const transformedData = eventsData.map(mapEventRowToEvent);
      
      setEvents(transformedData);
    } catch (error: any) {
      console.error('Error in fetchEvents:', error);
      toast({
        title: 'Error fetching events',
        description: error.message || 'Failed to load events',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserEvents = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching user events:', error);
        throw error;
      }
      
      // If data is null or undefined, default to empty array
      const eventsData = data || [];
      const transformedData = eventsData.map(mapEventRowToEvent);
      
      setUserEvents(transformedData);
    } catch (error: any) {
      console.error('Error fetching user events:', error);
    }
  };

  useEffect(() => {
    let result = [...events];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(event => 
        event.name.toLowerCase().includes(searchLower) || 
        event.description.toLowerCase().includes(searchLower) ||
        event.college.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    if (filters.type !== 'all') {
      result = result.filter(event => event.type === filters.type);
    }

    if (filters.college !== 'all') {
      result = result.filter(event => event.college === filters.college);
    }

    if (filters.startDate) {
      result = result.filter(event => new Date(event.date) >= filters.startDate!);
    }
    
    if (filters.endDate) {
      result = result.filter(event => new Date(event.date) <= filters.endDate!);
    }

    if (filters.isOnlineOnly) {
      result = result.filter(event => event.isOnline === true);
    }

    result = result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setFilteredEvents(result);
  }, [events, filters]);

  const colleges = Array.from(new Set(events.map(event => event.college))).sort();
  
  const eventTypes: (EventType | 'all')[] = ['all', 'hackathon', 'tech-talk', 'workshop', 'conference', 'other'];

  const addEvent = async (eventData: Omit<any, 'id'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit an event.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert({
          name: eventData.name,
          description: eventData.description,
          date: eventData.date,
          end_date: eventData.endDate,
          location: eventData.location,
          college: eventData.college,
          type: eventData.type,
          link: eventData.link,
          image: eventData.image,
          is_online: eventData.isOnline,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Event submitted",
        description: "Your event will be visible after admin approval.",
      });
    } catch (error: any) {
      toast({
        title: "Error submitting event",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      college: 'all',
      startDate: null,
      endDate: null,
      isOnlineOnly: false
    });
  };

  return (
    <EventContext.Provider value={{
      events,
      filteredEvents,
      filters,
      setFilters,
      addEvent,
      resetFilters,
      colleges,
      eventTypes,
      userEvents,
      isLoading
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
