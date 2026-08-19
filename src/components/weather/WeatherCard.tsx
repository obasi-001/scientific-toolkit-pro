import type { WeatherData } from "../../types/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="fw-bold mb-1">
              {weather.location.name}
            </h4>

            <p className="text-muted mb-0">
              {weather.location.country}
            </p>
          </div>

          <img
            src={`https:${weather.current.icon}`}
            alt={weather.current.condition}
            width="64"
            height="64"
          />
        </div>

        <div className="text-center my-4">
          <h1 className="display-3 fw-bold mb-1">
            {weather.current.temperature}°C
          </h1>

          <h5 className="text-muted">
            {weather.current.condition}
          </h5>
        </div>

        <div className="row g-3 text-center">

          <div className="col-md-4">
            <div className="border rounded p-3">
              <small className="text-muted d-block">
                Feels Like
              </small>

              <strong>
                {weather.current.feelsLike}°C
              </strong>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded p-3">
              <small className="text-muted d-block">
                Humidity
              </small>

              <strong>
                {weather.current.humidity}%
              </strong>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border rounded p-3">
              <small className="text-muted d-block">
                Wind
              </small>

              <strong>
                {weather.current.windSpeed} km/h
              </strong>
            </div>
          </div>

        </div>

        <p className="text-muted text-center mt-3 mb-0">
          Local time: {weather.location.localtime}
        </p>

      </div>
    </div>
  );
};

export default WeatherCard;