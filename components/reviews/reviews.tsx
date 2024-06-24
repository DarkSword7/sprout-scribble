import { db } from "@/server";
import Review from "./review";
import ReviewsForm from "./reviews-form";
import { desc, eq } from "drizzle-orm";
import { reviews } from "@/server/schema";

export default async function Reviews({ productID }: { productID: number }) {
  const data = await db.query.reviews.findMany({
    with: { user: true },
    where: eq(reviews.productID, productID),
    orderBy: [desc(reviews.created)],
  });

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div>
        <ReviewsForm />
        <Review reviews={data} />
      </div>
    </section>
  );
}
