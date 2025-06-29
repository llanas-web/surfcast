import type { ConditionModel } from "@/model/condition.model";
import { ReportService } from "@/services/condition/reports.condition.service";
import { defineStore } from "pinia";
import { ref } from "vue";
import dayJs from "dayjs";

export const useReportsStore = defineStore("reports", () => {
  const reportService = new ReportService();
  const reports = ref<ConditionModel[]>([]);

  const retrieveReports = async () => {
    reports.value = await reportService.getCondition(
      dayJs().toDate(),
    );
    console.log(reports.value.map((report) => report.wind.direction));
  };

  return {
    reports,
    retrieveReports,
  };
});
