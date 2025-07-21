import { v4 as uuidv4 } from "uuid";
import { Event } from "../models/event.model";
import { generateCategory } from "../utils/categorize";
import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "..", "data", "events.json");

const readEventsFromFile = (): Event[] => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(data) as Event[];
  } catch (error) {
    return [];
  }
};

const writeEventsToFile = (events: Event[]) => {
  fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
};

export const getAllEvents = (): Event[] => readEventsFromFile();

export const addEvent = (
  data: Omit<Event, "id" | "category" | "status">
): Event => {
  const events = readEventsFromFile();
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
  writeEventsToFile(events);
  return newEvent;
};

export const deleteEvent = (id: string): boolean => {
  let events = readEventsFromFile();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return false;
  events.splice(index, 1);
  writeEventsToFile(events);
  return true;
};

export const archiveEvent = (id: string): boolean => {
  let events = readEventsFromFile();
  const event = events.find((e) => e.id === id);
  if (!event) return false;
  event.status = "archived";
  writeEventsToFile(events);
  return true;
};

export const unarchiveEvent = (id: string): boolean => {
  let events = readEventsFromFile();
  const event = events.find((e) => e.id === id);
  if (!event) return false;
  event.status = "active";
  writeEventsToFile(events);
  return true;
};

export const getEventsByCategory = (category: string): Event[] => {
  const events = readEventsFromFile();
  return events.filter((e) => e.category === category);
};

export const getEventById = (id: string): Event | undefined => {
  const events = readEventsFromFile();
  return events.find((e) => e.id === id);
};

export const updateEvent = (
  id: string,
  data: Omit<Event, "id" | "category" | "status">
): Event | undefined => {
  let events = readEventsFromFile();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return undefined;
  const updatedEvent = {
    ...events[index],
    ...data,
    category: generateCategory(data.title),
  };
  events[index] = updatedEvent;
  writeEventsToFile(events);
  return updatedEvent;
};
