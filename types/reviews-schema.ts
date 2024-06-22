import * as z from "zod";

export const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Rating must be at least one star" })
    .max(5, { message: "Rating must be at most five stars" }),

  comment: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" })
    .max(1000, { message: "Review must be at most 1000 characters" }),
});
