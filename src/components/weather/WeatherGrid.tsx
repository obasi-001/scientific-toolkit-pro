import WeatherCard from "./WeatherCard";
import type { WeatherData } from "../../types/weather";

interface WeatherGridProps {
  weather: WeatherData;
}

const WeatherGrid = ({ weather }: WeatherGridProps) => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <WeatherCard weather={weather} />
      </div>
    </div>
  );
};

export default WeatherGrid;