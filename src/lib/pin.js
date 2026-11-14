
import "server-only";

import { cookies } from "next/headers";

export async function sudahMasuk() {
  const cookieStore = await cookies();
  const pin = cookieStore.get("pin_admin");

  return (
    Boolean(pin) &&
    Boolean(process.env.ADMIN_PIN) &&
    pin.value === process.env.ADMIN_PIN
  );
}
