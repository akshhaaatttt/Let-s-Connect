
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEvents } from '@/context/EventContext';

const EventFilters: React.FC = () => {
  const { filters, setFilters, resetFilters, colleges, eventTypes } = useEvents();

  return (
    <div className="bg-card mb-6 p-4 rounded-lg border shadow-sm">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button 
          variant="link" 
          className="ml-auto text-tech-purple hover:text-tech-dark-purple"
          onClick={resetFilters}
        >
          Reset
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="space-y-2">
          <div className="flex items-center">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label htmlFor="search">Search</Label>
          </div>
          <Input
            id="search"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
        
        {/* Event Type Select */}
        <div className="space-y-2">
          <Label htmlFor="event-type">Event Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters(prev => ({ ...prev, type: value as any }))}
          >
            <SelectTrigger id="event-type">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type || "all"}>
                  {type ? type.replace('-', ' ') : 'All types'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* College Select */}
        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Select
            value={filters.college}
            onValueChange={(value) => setFilters(prev => ({ ...prev, college: value }))}
          >
            <SelectTrigger id="college">
              <SelectValue placeholder="All colleges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All colleges</SelectItem>
              {colleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>Date Range</Label>
          <div className="grid grid-cols-2 gap-2">
            {/* Start Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? format(filters.startDate, "MMM d, yyyy") : <span>Start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.startDate ?? undefined}
                  onSelect={(date) => setFilters(prev => ({ ...prev, startDate: date }))}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* End Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.endDate ? format(filters.endDate, "MMM d, yyyy") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={filters.endDate ?? undefined}
                  onSelect={(date) => setFilters(prev => ({ ...prev, endDate: date }))}
                  initialFocus
                  disabled={(date) => filters.startDate ? date < filters.startDate : false}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      {/* Online Only Toggle */}
      <div className="mt-4 flex items-center space-x-2">
        <Switch
          id="online-only"
          checked={filters.isOnlineOnly}
          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isOnlineOnly: checked }))}
        />
        <Label htmlFor="online-only">Online events only</Label>
      </div>
    </div>
  );
};

export default EventFilters;
