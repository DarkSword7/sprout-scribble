import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AddProduct() {
  const session = await auth();

  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  return (
    <div>
      <h1>Add Product</h1>
    </div>
  );
}
