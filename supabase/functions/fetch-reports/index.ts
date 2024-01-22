// deno-lint-ignore-file
import dayjs from "https://deno.land/x/deno_dayjs@v0.5.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

console.log(`Function "browser-with-cors" up and running!`);

const fetchAllosurf = async () => {
  const allosurfUrl = Deno.env.get("URL_ALLOSURF");
  if (!allosurfUrl) throw new Error("Missing URL_ALLOSURF env variable");
  const fetchAllosurf = await fetch(allosurfUrl);
  const mapResponse = new Map<number, any>();
  const json = await fetchAllosurf.json();
  for (let i = 0; i < json.jour.length; i++) {
    const dayIterator = json.jour[i];
    const dayDate = dayjs(dayIterator.date);
    // Iterate through dayIterator.heures object values
    Object.values(dayIterator.heures).forEach((hourIterator) => {
      // @ts-ignore
      const hourDate = dayDate.hour(hourIterator.hour);
      mapResponse.set(hourDate.valueOf(), hourIterator);
    });
  }
  return mapResponse;
};

const fetchSurfline = async () => {
  const surflineUrl = Deno.env.get("URL_SURFLINE");
  if (!surflineUrl) throw new Error("Missing URL_SURFLINE env variable");
  const fetchSurflineResponse = await fetch(surflineUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)",
    },
  });
  const mapResponse = new Map<number, any>();
  const json = await fetchSurflineResponse.json();
  for (let i = 0; i < json.data.rating.length; i++) {
    const hourIterator = json.data.rating[i];
    const dayDate = dayjs(hourIterator.timestamp * 1000);
    mapResponse.set(dayDate.valueOf(), hourIterator.rating);
  }
  return mapResponse;
};

const upsertDatabase = async (data: any[]) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl) throw new Error("Missing SUPABASE_URL env variable");
  if (!supabaseKey) throw new Error("Missing SUPABASE_KEY env variable");
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: reports, error } = await supabase
    .from("reports")
    .upsert(data, { onConflict: "timestamp" });
  if (error) throw error;
  return reports;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const alloSurfResponse = await fetchAllosurf();
    const surflineResponse = await fetchSurfline();
    const responseArray: any[] = [];
    for (const [key, value] of surflineResponse) {
      // @ts-ignore
      responseArray.push({
        timestamp: key,
        allosurf: alloSurfResponse.get(key),
        surfline: value,
      });
    }
    if (
      Array.from(new Set(responseArray.map((item) => item.timestamp)))
        .length !== responseArray.length
    ) throw new Error("Duplicate timestamp");
    await upsertDatabase(responseArray);
    return new Response(JSON.stringify(responseArray), {
      status: 200,
      headers: {
        ...corsHeaders,
        "content-type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
