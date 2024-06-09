"use client";

import { Button } from "../ui/button";
import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="font-medium w-full">
      <Link aria-label={label} href={href}>
        {label}
      </Link>
    </Button>
  );
};
