
import React from 'react';
import { useEvents } from '@/context/EventContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { EnhancedEvent } from '@/pages/Admin';
import { useNavigate } from 'react-router-dom';

const UserEventsDashboard: React.FC = () => {
  const { userEvents, isLoading } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Sign in to manage your events</h3>
        <p className="text-gray-600 mb-4">Track your event submissions and their status</p>
        <Button 
          onClick={() => navigate('/auth')}
          className="bg-tech-purple hover:bg-tech-dark-purple text-white"
        >
          Sign In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center items-center p-8">
        <p>Loading your events...</p>
      </div>
    );
  }

  if (userEvents.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No events submitted yet</h3>
        <p className="text-gray-600 mb-4">Add your first tech event using the button above</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusMessage = (status: string) => {
    switch(status) {
      case 'pending':
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <Clock size={16} />
            <span>Your event is waiting for admin approval</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CalendarIcon size={16} />
            <span>Your event is live and visible to all users</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={16} />
            <span>Your event was rejected by an admin</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Your Events</h2>
      <div className="space-y-4">
        {userEvents.map((event) => {
          // Cast to EnhancedEvent to get the status property
          const enhancedEvent = event as unknown as EnhancedEvent;
          const status = enhancedEvent.status || 'pending';
          
          return (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  {getStatusBadge(status)}
                </div>
                <div className="text-sm text-gray-500">
                  Submitted: {enhancedEvent.created_at ? format(new Date(enhancedEvent.created_at), "MMM d, yyyy") : "Recently"}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {getStatusMessage(status)}
                <div className="mt-2 text-sm line-clamp-2">{event.description}</div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">View Details</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>{event.name}</SheetTitle>
                      <SheetDescription>
                        <div className="flex items-center gap-2 my-2">
                          {getStatusBadge(status)}
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Description</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Date</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {format(new Date(event.date), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Location</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.college} • {event.isOnline ? 'Online' : event.location}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Status</h4>
                        {getStatusMessage(status)}
                      </div>
                      <div className="pt-4">
                        <Button 
                          size="sm"
                          className="w-full"
                          variant="outline"
                          asChild
                        >
                          <a 
                            href={event.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View Event Link
                          </a>
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserEventsDashboard;
