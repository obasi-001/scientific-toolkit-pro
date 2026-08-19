import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export const getWeather = async (
  city: string
): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error("Weather API key is missing.");
  }

  if (!city.trim()) {
    throw new Error("Please enter a city.");
  }

  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
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