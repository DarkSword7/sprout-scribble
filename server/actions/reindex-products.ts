"use server";

import { createSafeActionClient } from "next-safe-action";
import * as z from "zod";
import algoliasearch from "algoliasearch";
import { db } from "..";
import { auth } from "../auth";

const action = createSafeActionClient();

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.ALGOLIA_ADMIN!
);

const algoliaIndex = client.initIndex("products");

const isMissingIndexError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const maybeStatus = (error as { status?: number }).status;
  const maybeMessage = (error as { message?: string }).message;
  return maybeStatus === 404 || maybeMessage?.includes("does not exist");
};

export const reindexProducts = action(
  z.object({}),
  async () => {
    try {
      const session = await auth();
      if (session?.user?.role !== "admin") {
        return { error: "Unauthorized" };
      }

      const variants = await db.query.productVariants.findMany({
        with: {
          product: true,
          variantImages: true,
        },
      });

      const records = variants
        .filter((variant) => variant.product)
        .map((variant) => ({
          objectID: variant.id.toString(),
          id: variant.productID,
          title: variant.product.title,
          price: variant.product.price,
          productType: variant.productType,
          variantImages: variant.variantImages[0]?.url ?? "",
        }));

      try {
        await algoliaIndex.clearObjects();
      } catch (error) {
        if (!isMissingIndexError(error)) {
          throw error;
        }
      }

      if (records.length > 0) {
        await algoliaIndex.saveObjects(records);
      } else {
        await algoliaIndex.setSettings({
          searchableAttributes: ["title", "productType"],
        });
      }

      return { success: `Algolia reindexed ${records.length} records` };
    } catch (error) {
      return { error: "Failed to reindex Algolia products" };
    }
  }
);
