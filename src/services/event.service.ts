import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { Event } from "../models/event.model";
import { generateCategory } from "../utils/categorize";

const dataPath = path.join(__dirname, "..", "data", "events.json");

const readEvents = (): Event[] => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeEvents = (events: Event[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
};

export const getAllEvents = (): Event[] => {
  return readEvents().sort((a, b) =>
    a.date === b.date
      ? a.time.localeCompare(b.time)
      : a.date.localeCompare(b.date)
  );
};

export const addEvent = (data: {
  title: string;
  date: string;
  time: string;
  notes?: string;
}): Event => {
  const events = readEvents();
  const newEvent: Event = {
    id: uuidv4(),
    title: data.title,
    date: data.date,
    time: data.time,
    notes: data.notes,
    category: generateCategory(data.title, data.notes),
    status: "active",
  };
  events.push(newEvent);
  writeEvents(events);
  return newEvent;
};

export const deleteEvent = (id: string): boolean => {
  const events = readEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (events.length === filtered.length) return false;
  writeEvents(filtered);
  return true;
};

export const archiveEvent = (id: string): boolean => {
  const events = readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return false;
  event.status = "archived";
  writeEvents(events);
  return true;
};

export const unarchiveEvent = (id: string): boolean => {
  const events = readEvents();
  const event = events.find((e) => e.id === id);
  if (!event) return false;
  event.status = "active";
  writeEvents(events);
  return true;
};

export const getEventsByCategory = (category: string): Event[] => {
  return readEvents().filter((e) => e.category === category);
};

export const getEventById = (id: string): Event | undefined => {
  return readEvents().find((e) => e.id === id);
};

export const updateEvent = (
  id: string,
  data: {
    title: string;
    date: string;
    time: string;
    notes?: string;
  }
): Event | undefined => {
  const events = readEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return undefined;

  const updated: Event = {
    ...events[index],
    ...data,
    category: generateCategory(data.title, data.notes),
  };

  events[index] = updated;
  writeEvents(events);
  return updated;
};
