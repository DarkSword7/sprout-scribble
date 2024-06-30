"use client";

import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductTags() {
  const router = useRouter();
  const searchparams = useSearchParams();
  const tag = searchparams.get("tag");

  const setFilter = (tag: string) => {
    if (tag) {
      router.push(`?tag=${tag}`);
    }
    if (!tag) {
      router.push(`/`);
    }
  };
  return (
    <div className="my-4 flex items-center gap-4 justify-center">
      <Badge
        onClick={() => setFilter("")}
        className={cn(
          "cursor-pointer bg-black hover:bg-black/75 hover:opacity-100",
          !tag ? "opacity-100" : "opacity-50"
        )}
      >
        All
      </Badge>
      <Badge
        onClick={() => setFilter("blue")}
        className={cn(
          "cursor-pointer bg-blue-500 hover:bg-blue-600 hover:opacity-100",
          tag === "blue" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Blue
      </Badge>
      <Badge
        onClick={() => setFilter("orange")}
        className={cn(
          "cursor-pointer bg-orange-500 hover:bg-orange-600 hover:opacity-100",
          tag === "orange" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Orange
      </Badge>
      <Badge
        onClick={() => setFilter("green")}
        className={cn(
          "cursor-pointer bg-green-500 hover:bg-green-600 hover:opacity-100",
          tag === "green" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Green
      </Badge>
      <Badge
        onClick={() => setFilter("purple")}
        className={cn(
          "cursor-pointer bg-purple-500 hover:bg-purple-600 hover:opacity-100",
          tag === "purple" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Purple
      </Badge>
    </div>
  );
}
