// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export default async function handler(req, res) {
//   const supabase = createRouteHandlerClient({ cookies });

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const { speed, user } = req.body; // Access the speed value from the request body
//     // fix user
//     console.log("user", user);
//     console.log("speed", speed);
//     // You can now process the 'speed' data and store it in the database or perform any other operations as needed.
//     // const { data, error } = await supabase.from("session_data").select("*");
//     // console.log("data chal gya w", data);
//     // Return a response to the client
//     return res.status(200).json({ message: "Data received successfully" });
//   } catch (error) {
//     console.error("Error processing the request:", error);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// }
