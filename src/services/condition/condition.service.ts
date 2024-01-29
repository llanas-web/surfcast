import type { ConditionModel } from "@/model/condition.model";

export interface ConditionService {
  getCondition: (date: Date) => Promise<ConditionModel[]>;
}
