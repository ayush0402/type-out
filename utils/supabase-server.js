import { headers, cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default () =>
  createServerComponentClient({
    headers,
    cookies,
    options: {
      global: {
        fetch,
      },
    },
  });
