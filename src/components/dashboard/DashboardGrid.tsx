import DashboardCard from "./DashboardCard";
import { useNavigate } from "react-router-dom";

import {
  FaCloudSun,
  FaGlobe,
  FaMoneyBillWave,
  FaRulerCombined,
  FaClock,
  FaCalculator,
  FaRobot
} from "react-icons/fa";

const DashboardGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="row g-4">

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Calculator"
          icon={<FaCalculator />}
        >
          <p className="mb-3">
            Launch the professional scientific calculator.
          </p>

          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/calculator")}
          >
            Open Calculator
          </button>
        </DashboardCard>
      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Currency"
          icon={<FaMoneyBillWave />}
        >

          <p className="mb-3">
            Convert between different currencies using live exchange rates.
          </p>


          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/currency")}
          >
            Open Currency Converter
          </button>
        </DashboardCard>

      </div>

      <div className="col-lg-4 col-md-6">

        <DashboardCard
          title="Unit Converter"
          icon={<FaRulerCombined />}
        >

          <p className="mb-3">
            Convert measurements across different units and categories.
          </p>

          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/unit-converter")}
          >
            Open Unit Converter
          </button>
        </DashboardCard>
      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Weather"
          icon={<FaCloudSun />}
        >
          <p className="mb-3">
            Check current weather conditions and forecasts.
          </p>

          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/weather")}
          >
            Open Weather
          </button>
        </DashboardCard>
      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Translator"
          icon={<FaGlobe />}
        >
          <p className="mb-3">
            Translate text between different languages.
          </p>

          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/translator")}
          >
            Open Translator
          </button>
        </DashboardCard>

      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Clock"
          icon={<FaClock />}
        >
          <p className="mb-3">
            View time across different timezones.
          </p>
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/clock")}
          >
            Open Clock
          </button>
        </DashboardCard>
      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="AI Assistant"
          icon={<FaRobot />}
        >
          <p className="mb-0">
            Get intelligent help with mathematics, science,
            statistics, and more.
          </p>

          <button
            className="btn btn-primary w-100 mt-3"
            onClick={() => navigate("/ai")}
          >
            Open AI Assistant
          </button>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardGrid;