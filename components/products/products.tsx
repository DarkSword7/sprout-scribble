"use client";

import { VariantsWithProduct } from "@/lib/infer-type";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import formatPrice from "@/lib/format-price";

type ProductTypes = {
  variants: VariantsWithProduct[];
};

export default function products({ variants }: ProductTypes) {
  return (
    <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
      {variants.map((variant) => (
        <Link
          className="py-2"
          key={variant.id}
          href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
        >
          <Image
            className="rounded-md pb-2"
            src={variant.variantImages[0].url}
            alt={variant.product.title}
            width={720}
            height={480}
            loading="lazy"
          />
          <div className="flex justify-between">
            <div className="font-medium">
              <h2>{variant.product.title}</h2>
              <p className="text-sm text-muted-foreground">
                {variant.productType}
              </p>
            </div>
            <div>
              <Badge variant={"secondary"} className="text-sm">
                {formatPrice(variant.product.price)}
              </Badge>
            </div>
          </div>
        </Link>
      ))}
    </main>
  );
}
