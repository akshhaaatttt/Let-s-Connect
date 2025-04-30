
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import PendingEventsList from '@/components/admin/PendingEventsList';
import ApprovedEventsList from '@/components/admin/ApprovedEventsList';
import RejectedEventsList from '@/components/admin/RejectedEventsList';
import { Event, EventStatus } from '@/types/event';
import { EventRow } from '@/integrations/supabase/schema';

export type EnhancedEvent = Event & {
  status: EventStatus;
  user_id: string;
  created_at: string;
  updated_at: string;
};

const Admin = () => {
  const { isAdmin, isLoading, user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<EnhancedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isAdmin) {
      fetchEvents();
      subscribeToEvents();
    }
  }, [user, isAdmin]);

  const mapEventRowToEnhancedEvent = (row: EventRow): EnhancedEvent => {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      date: row.date,
      endDate: row.end_date || undefined,
      location: row.location,
      college: row.college,
      type: row.type,
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
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Convert the data to EnhancedEvent
      const transformedData = (data || []).map(mapEventRowToEnhancedEvent);
      setEvents(transformedData);
    } catch (error: any) {
      toast({
        title: 'Error fetching events',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const subscribeToEvents = () => {
    try {
      const channel = supabase
        .channel('admin-events-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'events'
          },
          (payload) => {
            console.log('Real-time update:', payload);
            
            if (payload.eventType === 'INSERT') {
              const newEvent = mapEventRowToEnhancedEvent(payload.new as EventRow);
              setEvents(prev => [newEvent, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setEvents(prev => 
                prev.map(event => 
                  event.id === payload.new.id ? mapEventRowToEnhancedEvent(payload.new as EventRow) : event
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
      console.error('Error subscribing to events:', error);
    }
  };

  const handleApproveEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'approved' })
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: 'Event approved',
        description: 'The event is now visible to all users',
      });
    } catch (error: any) {
      toast({
        title: 'Error approving event',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleRejectEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status: 'rejected' })
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: 'Event rejected',
        description: 'The event has been rejected',
      });
    } catch (error: any) {
      toast({
        title: 'Error rejecting event',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: 'Event deleted',
        description: 'The event has been permanently removed',
      });
    } catch (error: any) {
      toast({
        title: 'Error deleting event',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // If not admin, redirect to home
  if (!isLoading && !isAdmin) {
    return <Navigate to="/" />;
  }

  // If still checking admin status
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <p className="text-xl">Loading...</p>
        </div>
      </Layout>
    );
  }
  
  const pendingEvents = events.filter(event => event.status === 'pending');
  const approvedEvents = events.filter(event => event.status === 'approved');
  const rejectedEvents = events.filter(event => event.status === 'rejected');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending Events ({pendingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved Events ({approvedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected Events ({rejectedEvents.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <PendingEventsList 
              events={pendingEvents} 
              onApprove={handleApproveEvent} 
              onReject={handleRejectEvent}
              onDelete={handleDeleteEvent}
              isLoading={loading}
            />
          </TabsContent>
          
          <TabsContent value="approved">
            <ApprovedEventsList 
              events={approvedEvents}
              onReject={handleRejectEvent}
              onDelete={handleDeleteEvent} 
              isLoading={loading}
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <RejectedEventsList 
              events={rejectedEvents}
              onApprove={handleApproveEvent}
              onDelete={handleDeleteEvent}
              isLoading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
