"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

export default function Socials() {
  return (
    <div>
      <Button
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Sign in with Google
      </Button>
      <Button
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        Sign in with Github
      </Button>
    </div>
  );
}
