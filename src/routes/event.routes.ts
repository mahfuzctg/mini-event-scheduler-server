import express from "express";
import * as eventController from "../controllers/event.controller";

const router = express.Router();

router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.get("/:id", eventController.getEventById);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/:id/archive", eventController.archiveEvent);
router.patch("/:id/unarchive", eventController.unarchiveEvent);
router.get("/category/:category", eventController.getEventsByCategory);

export default router;
