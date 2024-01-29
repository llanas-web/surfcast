import type { ConditionModel } from "@/model/condition.model";
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import type { Database } from "supabase/types";
import type { ConditionService } from "./condition.service";

const mapFromSupabaseReportToConditionModel = (report: any) => {
  const date = dayjs(report.condition_date).toDate();
  const wave = {
    height: report.allosurf?.s_wht,
    period: report.allosurf?.mean_fr,
    direction: report.allosurf?.gly_ori_wav,
  };
  const swell = {
    height: report.allosurf?.swe_h,
    period: report.allosurf?.meansfr,
    direction: report.allosurf?.gly_ori_swe,
  };
  const wind = {
    speed: report.allosurf?.wind_10m_kmh,
    peak: report.allosurf?.gust_10m_kmh,
    direction: report.allosurf?.gly_ori_wsp,
  };
  const seaTemperature = report.allosurf?.temp;
  const rating = report.surfline?.value;
  return {
    date,
    wave,
    swell,
    wind,
    seaTemperature,
    rating,
  };
};

export class ReportService implements ConditionService {
  async getCondition(date: Date): Promise<ConditionModel[]> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!supabaseUrl) throw new Error("Missing VITE_SUPABASE_URL env variable");
    if (!supabaseKey) {
      throw new Error("Missing VITE_SUPABASE_ANON_KEY env variable");
    }
    const supabase = createClient<Database>(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from("reports").select("*").gte(
      "condition_date",
      dayjs(date).toISOString(),
    ).order(
      "condition_date",
      { ascending: true },
    );
    if (error) throw error;
    return data.map(mapFromSupabaseReportToConditionModel);
  }
}
