
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Event } from '@/types/event';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Format the date
  const formattedDate = format(new Date(event.date), "MMM d, yyyy 'at' h:mm a");
  
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
    <Card className="h-full overflow-hidden border-2 hover:border-tech-purple transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{event.name}</CardTitle>
            <CardDescription className="text-sm flex items-center gap-1 mt-1">
              <span className="font-medium">{event.college}</span> • {event.isOnline ? 'Online' : event.location}
            </CardDescription>
          </div>
          <Badge className={getTypeColor(event.type)}>
            {event.type.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <p className="line-clamp-3 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          asChild 
          variant="outline" 
          className="w-full hover:bg-tech-purple hover:text-white transition-all duration-200"
        >
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            View Event
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
