"use server";

import { ReviewSchema } from "@/types/reviews-schema";
import { createSafeActionClient } from "next-safe-action";
import { auth } from "../auth";
import { db } from "..";
import { and, eq } from "drizzle-orm";
import { reviews } from "../schema";
import { revalidatePath } from "next/cache";

const action = createSafeActionClient();

export const addReview = action(
  ReviewSchema,
  async ({ productID, rating, comment }) => {
    try {
      const session = await auth();
      if (!session) return { error: "You must be logged in to leave a review" };

      const reviewExists = await db.query.reviews.findFirst({
        where: and(
          eq(reviews.productID, productID),
          eq(reviews.userID, session.user.id)
        ),
      });

      if (reviewExists) {
        return { error: "You have already left a review for this product" };
      }

      const newReview = await db
        .insert(reviews)
        .values({
          productID,
          rating,
          comment,
          userID: session.user.id,
        })
        .returning();

      revalidatePath(`/products/${productID}`);
      return { success: newReview[0] };
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }
);
