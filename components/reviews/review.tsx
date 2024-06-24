"use client";

import { ReviewsWithUser } from "@/lib/infer-type";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import Image from "next/image";
import { formatDistance, subDays } from "date-fns";

export default function Review({ reviews }: { reviews: ReviewsWithUser[] }) {
  return (
    <motion.div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <Card key={review.id} className="p-4">
          <div className="flex gap-2 items-center">
            <Image
              src={review.user.image!}
              alt={review.user.name!}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-bold">{review.user.name}</p>
              <div className="flex items-center gap-2">
                <h1>stars</h1>
                <p className="text-xs font-bold text-muted-foreground">
                  {formatDistance(subDays(review.created!, 0), new Date())}
                </p>
              </div>
            </div>
          </div>
          <p className="text-lg font-medium">{review.comment}</p>
        </Card>
      ))}
    </motion.div>
  );
}
