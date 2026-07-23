import DashboardCard from "./DashboardCard";

import {
  FaCloudSun,
  FaGlobe,
  FaMoneyBillWave,
  FaRulerCombined,
  FaClock,
  FaCalculator,
} from "react-icons/fa";

const DashboardGrid = () => {
  return (
    <div className="row g-4">
      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Calculator"
          icon={<FaCalculator />}
        >
          <p className="mb-0">
            Calculator widget coming soon.
          </p>
        </DashboardCard>
      </div>
      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Weather"
          icon={<FaCloudSun />}
        >
          <p className="mb-0">
            Weather widget coming soon.
          </p>
        </DashboardCard>
      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Translator"
          icon={<FaGlobe />}
        >
          <p className="mb-0">
            Language translator coming soon.
          </p>
        </DashboardCard>

      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Currency"
          icon={<FaMoneyBillWave />}
        >
          <p className="mb-0">
            Currency converter coming soon.
          </p>
        </DashboardCard>

      </div>

      <div className="col-lg-4 col-md-6">

        <DashboardCard
          title="Unit Converter"
          icon={<FaRulerCombined />}
        >
          <p className="mb-0">
            Unit converter coming soon.
          </p>
        </DashboardCard>
      </div>

      <div className="col-lg-4 col-md-6">
        <DashboardCard
          title="Clock"
          icon={<FaClock />}
        >
          <p className="mb-0">
            Live clock coming soon.
          </p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardGrid;