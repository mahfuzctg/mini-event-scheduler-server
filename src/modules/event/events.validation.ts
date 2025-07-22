import { z } from "zod";

const createEventValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Event title is required" })
      .max(100, { message: "Title cannot exceed 100 characters" }),

    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in YYYY-MM-DD format",
    }),

    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Time must be in HH:MM format (24-hour)",
    }),

    notes: z
      .string()
      .max(500, { message: "Notes cannot exceed 500 characters" })
      .optional(),
  }),
});

const updateEventValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: "Title cannot be empty" })
      .max(100, { message: "Title cannot exceed 100 characters" })
      .optional(),

    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format",
      })
      .optional(),

    time: z
      .string()
      .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Time must be in HH:MM format (24-hour)",
      })
      .optional(),

    notes: z
      .string()
      .max(500, { message: "Notes cannot exceed 500 characters" })
      .optional(),

    archived: z.boolean().optional(),

    category: z.string().optional(),
  }),
});

export const EventValidation = {
  createEventValidationSchema,
  updateEventValidationSchema,
};
