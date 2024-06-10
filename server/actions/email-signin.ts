"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";

const action = createSafeActionClient();

export const emailSignin = action(
  LoginSchema,
  async ({ email, password, code }) => {
    //Check if user is in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "Email not found" };
    }

    // if(existingUser.emailVerified){

    // }

    console.log(email, password, code);
    return { success: email };
  }
);
