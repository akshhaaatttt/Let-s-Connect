
export type EventType = 'hackathon' | 'tech-talk' | 'workshop' | 'conference' | 'other';
export type EventStatus = 'pending' | 'approved' | 'rejected';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  endDate?: string; // This will map to end_date in the database
  location: string;
  college: string;
  type: EventType;
  link: string;
  image?: string;
  isOnline?: boolean; // This will map to is_online in the database
  status?: EventStatus; 
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
