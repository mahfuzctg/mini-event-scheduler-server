import httpStatus from "http-status";

import CatchAsync from "../../utils/CatchAsync";
import SendResponse from "../../utils/SendResponse";
import { EventServices } from "./event.service";
import { TEvent } from "./events.interface";

const createEvent = CatchAsync(async (req: { body: TEvent }, res: any) => {
  const result = await EventServices.createEventIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Event is created successfully",
    data: result,
  });
});

const getAllEvents = CatchAsync(async (req, res) => {
  const result = await EventServices.getAllEventsFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Events are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleEvent = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.getSingleEventFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is retrieved successfully",
    data: result,
  });
});

const updateEvent = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.updateEventIntoDB(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is updated successfully",
    data: result,
  });
});

const deleteEvent = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.deleteEventFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is deleted successfully",
    data: result,
  });
});

const archiveEvent = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await EventServices.archiveEventFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event is archived successfully",
    data: result,
  });
});

export const EventControllers = {
  createEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  archiveEvent,
};
