import type { WeatherData } from "../types/weather";

export const getWeather = async (
  city: string
): Promise<WeatherData> => {
  if (!city.trim()) {
    throw new Error("Please enter a city.");
  }

  const response = await fetch(
    `/api/weather?city=${encodeURIComponent(city)}`
  );

  if (!response.ok) {
    throw new Error("Unable to fetch weather data.");
  }

  const data = await response.json();

  return {
    location: {
      name: data.location.name,
      country: data.location.country,
      localtime: data.location.localtime,
    },

    current: {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      feelsLike: data.current.feelslike_c,
    },
  };
};