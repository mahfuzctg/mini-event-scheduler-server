export type EventStatus = "active" | "archived";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: string;
  status: EventStatus;
}
