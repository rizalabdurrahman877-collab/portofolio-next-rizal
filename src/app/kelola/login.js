
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData) {
  const pin = String(formData.get("pin") || "");

  if (!process.env.ADMIN_PIN || pin !== process.env.ADMIN_PIN) {
    redirect("/kelola?error=pin");
  }

  const cookieStore = await cookies();

  cookieStore.set("pin_admin", pin, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/kelola");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("pin_admin");

  redirect("/kelola");
}
