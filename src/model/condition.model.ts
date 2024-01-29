interface ConditionModel {
  date: Date;
  wave: WaveCondition;
  swell: SwellCondition;
  wind: WindCondition;
  seaTemperature?: number;
  airTemperature?: number;
  rating?: number;
}

type WaveCondition = {
  height: number;
  period: number;
  direction?: string;
};

type SwellCondition = {
  height: number;
  period: number;
  direction?: string;
};

type WindCondition = {
  speed: number;
  direction: string;
  peak?: number;
};

export type { ConditionModel, SwellCondition, WaveCondition, WindCondition };
