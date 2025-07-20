import { Request, Response } from "express";
import * as eventService from "../services/event.service";

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
