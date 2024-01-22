// deno-lint-ignore-file
import dayjs from "https://deno.land/x/deno_dayjs@v0.5.0/mod.ts";

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
  const fetchSurflineResponse = await fetch(surflineUrl);
  const mapResponse = new Map<number, any>();
  const json = await fetchSurflineResponse.json();
  for (let i = 0; i < json.data.rating.length; i++) {
    const hourIterator = json.data.rating[i];
    const dayDate = dayjs(hourIterator.timestamp * 1000);
    mapResponse.set(dayDate.valueOf(), hourIterator.rating);
  }
  return mapResponse;
};

Deno.serve(async (req) => {
  console.log(req.method);
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
    return new Response(JSON.stringify(responseArray), {
      status: 200,
      headers: {
        ...corsHeaders,
        "content-type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "content-type": "application/json" },
    });
  }
});
