/// <reference lib="deno.ns" />

import dayjs from "https://deno.land/x/deno_dayjs@v0.5.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const LIST_EMAIL = ["b.maurence@gmail.com"];
// const listSms = ["+33626356980"];

console.log("Notification function started");

let supabase: any;

const sendEmail = (message: string, listEmail: string[]) => {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (!resendApiKey) throw new Error("Missing RESEND_API_KEY env variable");

  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
    },
    body: JSON.stringify({
      from: "surfcast.llanas.dev <onboarding@resend.dev>",
      to: listEmail,
      subject: "Surf conditions REPORTS",
      html: message,
    }),
  });
};

// const sendSms = (message: string) => {
//   const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
//   const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
//   const messageServiceId = Deno.env.get("TWILIO_MESSAGE_SERVICE_ID");
//   if (!accountSid) throw new Error("Missing TWILIO_ACCOUNT_SID env variable");
//   if (!authToken) throw new Error("Missing TWILIO_AUTH_TOKEN env variable");
//   if (!messageServiceId) {
//     throw new Error("Missing TWILIO_MESSAGE_SERVICE_ID env variable");
//   }
//   return fetch(
//     `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
//     {
//       method: "POST",
//       headers: {
//         "Authorization": `Basic ${btoa(`${accountSid}:${authToken}`)}`,
//       },
//       body: new URLSearchParams({
//         "To": listSms.join(","),
//         "MessagingServiceSid": messageServiceId,
//         "Body": message,
//       }),
//     },
//   );
// };

const persistNotification = async (
  date: string,
  rating: number,
  listEmail: string[],
) => {
  const { data: reports, error } = await supabase
    .from("notifications")
    .insert(listEmail.map((email) => ({
      email,
      date,
      condition: rating,
    })));
  if (error) throw error;
  return reports;
};

const generateMessage = (date: string, rating: number) => `
SURF ALERT! Des conditions prévu ce ${
  dayjs(date).format("DD/MM/YYYY")
} avec une note de ${rating}/5.
  Plus d'infos sur https://surfcast.llanas.dev/
`;

const hasAlreadybeenNotified = async (listEmail: string[], date: string) => {
  const { data: reports, error } = await supabase
    .from("notifications")
    .select("*")
    .in("email", listEmail)
    .eq("date", date);
  if (error) throw error;
  return reports;
};

Deno.serve(async (req) => {
  const { old_row, new_row } = await req.json();
  if (!new_row) {
    console.error("Missing new_row");
    return new Response(
      JSON.stringify({ error: "Missing new_row" }),
      { headers: { "Content-Type": "application/json" }, status: 403 },
    );
  }
  const date = new_row.date;
  const rating = new_row.condition;
  if (!!old_row && old_row.condition !== new_row.condition) {
    console.log(
      `Condition updated from ${old_row?.condition} to ${new_row.condition} for ${date}`,
    );
  } else if (!old_row) {
    console.log(
      `New condition created with ${new_row.condition} for ${date}`,
    );
  }
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl) throw new Error("Missing SUPABASE_URL env variable");
    if (!supabaseKey) throw new Error("Missing SUPABASE_KEY env variable");
    supabase = createClient(supabaseUrl, supabaseKey);
    const message = generateMessage(date, rating);
    const listNotifications = await hasAlreadybeenNotified(LIST_EMAIL, date);
    const listEmailToNotify = LIST_EMAIL.filter((email) =>
      !listNotifications.find((notification: any) =>
        notification.email === email
      )
    );
    await sendEmail(message, listEmailToNotify);
    // await sendSms(message);
    await persistNotification(date, rating, listEmailToNotify);
    return new Response(
      JSON.stringify(message),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
