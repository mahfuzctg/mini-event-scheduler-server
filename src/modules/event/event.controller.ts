import { Request, Response } from "express";
import * as eventService from "../event/event.service";

export const getEvents = (_req: Request, res: Response) => {
  res.json(eventService.getAllEvents());
};

export const createEvent = (req: Request, res: Response) => {
  const { title, date, time, notes } = req.body;
  if (!title || !date || !time) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  const event = eventService.addEvent({ title, date, time, notes });
  res.status(201).json(event);
};

export const deleteEvent = (req: Request, res: Response) => {
  const id = req.params.id;
  const success = eventService.deleteEvent(id);
  if (!success) return res.status(404).json({ message: "Event not found." });
  res.json({ message: "Event deleted." });
};

export const archiveEvent = (req: Request, res: Response) => {
  const id = req.params.id;
  const success = eventService.archiveEvent(id);
  if (!success) return res.status(404).json({ message: "Event not found." });
  res.json({ message: "Event archived." });
};

export const unarchiveEvent = (req: Request, res: Response) => {
  const id = req.params.id;
  const success = eventService.unarchiveEvent(id);
  if (!success) return res.status(404).json({ message: "Event not found." });
  res.json({ message: "Event unarchived." });
};

export const getEventsByCategory = (req: Request, res: Response) => {
  const category = req.params.category;
  res.json(eventService.getEventsByCategory(category));
};

export const getEventById = (req: Request, res: Response) => {
  const id = req.params.id;
  const event = eventService.getEventById(id);
  if (!event) return res.status(404).json({ message: "Event not found." });
  res.json(event);
};

export const updateEvent = (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, date, time, notes } = req.body;
  if (!title || !date || !time) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  const event = eventService.updateEvent(id, { title, date, time, notes });
  if (!event) return res.status(404).json({ message: "Event not found." });
  res.json(event);
};
