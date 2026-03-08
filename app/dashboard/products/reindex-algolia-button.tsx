"use client";

import { Button } from "@/components/ui/button";
import { reindexProducts } from "@/server/actions/reindex-products";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export default function ReindexAlgoliaButton() {
  const { execute, status } = useAction(reindexProducts, {
    onExecute: () => {
      toast.loading("Reindexing Algolia...", { duration: 1000 });
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
      }

      if (data?.success) {
        toast.success(data.success);
      }
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      disabled={status === "executing"}
      onClick={() => execute({})}
    >
      Reindex Algolia
    </Button>
  );
}
