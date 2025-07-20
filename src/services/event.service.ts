import { v4 as uuidv4 } from "uuid";
import { Event } from "../models/event.model";
import { generateCategory } from "../utils/categorize";

let events: Event[] = [];

export const getAllEvents = (): Event[] => events;

export const addEvent = (
  data: Omit<Event, "id" | "category" | "status">
): Event => {
  const newEvent: Event = {
    id: uuidv4(),
    title: data.title,
    date: data.date,
    time: data.time,
    notes: data.notes,
    category: generateCategory(data.title),
    status: "active",
  };
  events.push(newEvent);
  return newEvent;
};

export const deleteEvent = (id: string): boolean => {
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return false;
  events.splice(index, 1);
  return true;
};

export const archiveEvent = (id: string): boolean => {
  const event = events.find((e) => e.id === id);
  if (!event) return false;
  event.status = "archived";
  return true;
};
