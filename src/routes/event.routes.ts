import express from "express";
import * as eventController from "../controllers/event.controller";

const router = express.Router();

router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/:id/archive", eventController.archiveEvent);

export default router;
