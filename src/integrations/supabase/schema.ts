
// Custom type definitions to extend Supabase's generated types
import { Database } from './types';

export type EventType = 'hackathon' | 'tech-talk' | 'workshop' | 'conference' | 'other';
export type EventStatus = 'pending' | 'approved' | 'rejected';

export interface EventRow {
  id: string;
  name: string;
  description: string;
  date: string;
  end_date: string | null;
  location: string;
  college: string;
  type: EventType;
  link: string;
  image: string | null;
  is_online: boolean;
  status: EventStatus;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Instead of extending the Database interface, we'll just use it directly
// to avoid typechecking issues with the Relationships property
export type { Database };
