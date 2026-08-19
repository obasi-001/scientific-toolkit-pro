export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };

  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
  };
}