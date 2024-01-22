import { createClient } from "@supabase/supabase-js";

export const useReports = () => {
  const getReports = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl) throw new Error("Missing VITE_SUPABASE_URL env variable");
    if (!supabaseKey) {
      throw new Error("Missing VITE_SUPABASE_ANON_KEY env variable");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from("reports").select("*");
    if (error) throw error;
    return data;
  };

  return {
    getReports,
  };
};
