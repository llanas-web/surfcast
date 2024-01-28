import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";

export const useReports = () => {
  const getReports = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl) throw new Error("Missing VITE_SUPABASE_URL env variable");
    if (!supabaseKey) {
      throw new Error("Missing VITE_SUPABASE_ANON_KEY env variable");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from("reports").select("*").gte(
      "condition_date",
      dayjs().toISOString(),
    ).order(
      "condition_date",
      { ascending: true },
    );
    if (error) throw error;
    return data;
  };

  return {
    getReports,
  };
};
