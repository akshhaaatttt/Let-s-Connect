
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Globe, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { EnhancedEvent } from '@/pages/Admin';
import { Separator } from '@/components/ui/separator';

interface Action {
  label: string;
  onClick: () => void;
  color: string;
}

interface AdminEventCardProps {
  event: EnhancedEvent;
  actions: Action[];
}

const AdminEventCard: React.FC<AdminEventCardProps> = ({ event, actions }) => {
  // Format dates
  const formattedDate = event.date ? format(new Date(event.date), "MMM d, yyyy 'at' h:mm a") : 'Date not specified';
  const createdAt = event.created_at ? format(new Date(event.created_at), "MMM d, yyyy 'at' h:mm a") : 'Unknown';

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'approved':
        return 'bg-green-500 hover:bg-green-600';
      case 'rejected':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Get type badge color
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'hackathon':
        return 'bg-tech-purple hover:bg-tech-dark-purple text-white';
      case 'tech-talk':
        return 'bg-tech-light-purple hover:bg-tech-purple text-white';
      case 'workshop':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'conference':
        return 'bg-green-500 hover:bg-green-600 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  return (
    <Card className="border-2 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-semibold">{event.name}</h3>
            <p className="text-sm text-muted-foreground">
              {event.college} • {event.isOnline ? 'Online' : event.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusBadgeColor(event.status)}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
            <Badge className={getTypeColor(event.type)}>
              {event.type.replace('-', ' ')}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <CalendarIcon className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          
          <p className="text-sm">{event.description}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              {event.isOnline ? (
                <>
                  <Globe className="h-4 w-4" />
                  <span>Online</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </>
              )}
            </div>
            <div className="text-muted-foreground">
              Submitted: {createdAt}
            </div>
          </div>
          
          <div>
            <a 
              href={event.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-tech-purple hover:text-tech-dark-purple text-sm transition-colors"
            >
              Event link
            </a>
          </div>
        </div>
      </CardContent>
      
      <Separator />
      
      <CardFooter className="pt-4">
        <div className="flex flex-wrap gap-2 w-full">
          {actions.map((action, index) => (
            <Button 
              key={index}
              onClick={action.onClick}
              className={`${action.color} text-white`}
              size="sm"
            >
              {action.label}
            </Button>
          ))}
          
          <a 
            href={`/events/${event.id}`} 
            className="ml-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View details
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AdminEventCard;
