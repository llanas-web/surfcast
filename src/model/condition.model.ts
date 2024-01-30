interface WaveCondition {
  height: number;
  period: number;
  direction?: string;
}

interface SwellCondition {
  height: number;
  period: number;
  direction?: string;
}

interface WindCondition {
  speed: number;
  direction: string;
  peak?: number;
}

interface ConditionModel {
  date: string;
  wave: WaveCondition;
  swell: SwellCondition;
  wind: WindCondition;
  seaTemperature?: number;
  airTemperature?: number;
  rating?: number;
}

interface ConditionDay {
  date: string;
  conditions: ConditionModel[];
}

export type {
  ConditionDay,
  ConditionModel,
  SwellCondition,
  WaveCondition,
  WindCondition,
};
