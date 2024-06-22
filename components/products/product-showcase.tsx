"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VariantsWithImagesTags } from "@/lib/infer-type";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductShowcase({
  variants,
}: {
  variants: VariantsWithImagesTags[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeThumbnail, setActiveThumbnail] = useState([0]);
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("type") || variants[0].productType;

  const updatePreview = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("slidesInView", (e) => {
      setActiveThumbnail(e.slidesInView());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {variants.map(
          (variant) =>
            variant.productType === selectedColor &&
            variant.variantImages.map((img) => {
              return (
                <CarouselItem key={img.url}>
                  {img.url ? (
                    <Image
                      className="rounded-md"
                      src={img.url}
                      alt={img.name}
                      width={1280}
                      height={720}
                      priority
                    />
                  ) : null}
                </CarouselItem>
              );
            })
        )}
      </CarouselContent>
      <div className="flex overflow-clip py-2 gap-4">
        {variants.map(
          (variant) =>
            variant.productType === selectedColor &&
            variant.variantImages.map((img, index) => {
              return (
                <div key={img.url}>
                  {img.url ? (
                    <Image
                      onClick={() => updatePreview(index)}
                      className={cn(
                        index === activeThumbnail[0]
                          ? "opacity-100"
                          : "opacity-75",
                        "rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:opacity-100"
                      )}
                      src={img.url}
                      alt={img.name}
                      width={72}
                      height={48}
                      priority
                    />
                  ) : null}
                </div>
              );
            })
        )}
      </div>
    </Carousel>
  );
}
