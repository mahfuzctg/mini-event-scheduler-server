import express from "express";
import * as eventController from "../controllers/event.controller";

const router = express.Router();

// Important: Place this before /:id
router.get("/category/:category", eventController.getEventsByCategory);

router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/:id/archive", eventController.archiveEvent);
router.patch("/:id/unarchive", eventController.unarchiveEvent);

export default router;
