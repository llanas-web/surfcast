import { fetchWeatherApi } from "openmeteo";

const params = {
  "latitude": 42.7,
  "longitude": 3.03,
  "current": [
    "wave_height",
    "wave_direction",
    "wave_period",
    "wind_wave_height",
    "wind_wave_direction",
    "wind_wave_period",
    "wind_wave_peak_period",
    "swell_wave_height",
    "swell_wave_direction",
    "swell_wave_period",
    "swell_wave_peak_period",
  ],
  "hourly": [
    "wave_height",
    "wave_direction",
    "wave_period",
    "wind_wave_height",
    "wind_wave_direction",
    "wind_wave_period",
    "wind_wave_peak_period",
    "swell_wave_height",
    "swell_wave_direction",
    "swell_wave_period",
    "swell_wave_peak_period",
  ],
  "daily": [
    "wave_height_max",
    "wave_direction_dominant",
    "wave_period_max",
    "wind_wave_height_max",
    "wind_wave_direction_dominant",
    "wind_wave_period_max",
    "wind_wave_peak_period_max",
    "swell_wave_height_max",
    "swell_wave_direction_dominant",
    "swell_wave_period_max",
    "swell_wave_peak_period_max",
  ],
  "timezone": "Europe/Berlin",
};

const url = "https://marine-api.open-meteo.com/v1/marine";

const fetch = async () => {
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      waveHeight: current.variables(0)!.value(),
      waveDirection: current.variables(1)!.value(),
      wavePeriod: current.variables(2)!.value(),
      windWaveHeight: current.variables(3)!.value(),
      windWaveDirection: current.variables(4)!.value(),
      windWavePeriod: current.variables(5)!.value(),
      windWavePeakPeriod: current.variables(6)!.value(),
      swellWaveHeight: current.variables(7)!.value(),
      swellWaveDirection: current.variables(8)!.value(),
      swellWavePeriod: current.variables(9)!.value(),
      swellWavePeakPeriod: current.variables(10)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000),
      ),
      waveHeight: hourly.variables(0)!.valuesArray()!,
      waveDirection: hourly.variables(1)!.valuesArray()!,
      wavePeriod: hourly.variables(2)!.valuesArray()!,
      windWaveHeight: hourly.variables(3)!.valuesArray()!,
      windWaveDirection: hourly.variables(4)!.valuesArray()!,
      windWavePeriod: hourly.variables(5)!.valuesArray()!,
      windWavePeakPeriod: hourly.variables(6)!.valuesArray()!,
      swellWaveHeight: hourly.variables(7)!.valuesArray()!,
      swellWaveDirection: hourly.variables(8)!.valuesArray()!,
      swellWavePeriod: hourly.variables(9)!.valuesArray()!,
      swellWavePeakPeriod: hourly.variables(10)!.valuesArray()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      )
        .map(
          (t) => new Date((t + utcOffsetSeconds) * 1000),
        ),
      waveHeightMax: daily.variables(0)!.valuesArray()!,
      waveDirectionDominant: daily.variables(1)!.valuesArray()!,
      wavePeriodMax: daily.variables(2)!.valuesArray()!,
      windWaveHeightMax: daily.variables(3)!.valuesArray()!,
      windWaveDirectionDominant: daily.variables(4)!.valuesArray()!,
      windWavePeriodMax: daily.variables(5)!.valuesArray()!,
      windWavePeakPeriodMax: daily.variables(6)!.valuesArray()!,
      swellWaveHeightMax: daily.variables(7)!.valuesArray()!,
      swellWaveDirectionDominant: daily.variables(8)!.valuesArray()!,
      swellWavePeriodMax: daily.variables(9)!.valuesArray()!,
      swellWavePeakPeriodMax: daily.variables(10)!.valuesArray()!,
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
      weatherData.hourly.time[i].toISOString(),
      weatherData.hourly.waveHeight[i],
      weatherData.hourly.waveDirection[i],
      weatherData.hourly.wavePeriod[i],
      weatherData.hourly.windWaveHeight[i],
      weatherData.hourly.windWaveDirection[i],
      weatherData.hourly.windWavePeriod[i],
      weatherData.hourly.windWavePeakPeriod[i],
      weatherData.hourly.swellWaveHeight[i],
      weatherData.hourly.swellWaveDirection[i],
      weatherData.hourly.swellWavePeriod[i],
      weatherData.hourly.swellWavePeakPeriod[i],
    );
  }
  for (let i = 0; i < weatherData.daily.time.length; i++) {
    console.log(
      weatherData.daily.time[i].toISOString(),
      weatherData.daily.waveHeightMax[i],
      weatherData.daily.waveDirectionDominant[i],
      weatherData.daily.wavePeriodMax[i],
      weatherData.daily.windWaveHeightMax[i],
      weatherData.daily.windWaveDirectionDominant[i],
      weatherData.daily.windWavePeriodMax[i],
      weatherData.daily.windWavePeakPeriodMax[i],
      weatherData.daily.swellWaveHeightMax[i],
      weatherData.daily.swellWaveDirectionDominant[i],
      weatherData.daily.swellWavePeriodMax[i],
      weatherData.daily.swellWavePeakPeriodMax[i],
    );
  }
  return weatherData;
};

export default fetch;
