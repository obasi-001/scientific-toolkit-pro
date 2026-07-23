import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const DashboardCard = ({
  title,
  icon,
  children,
}: DashboardCardProps) => {
  return (
    <div className="card dashboard-card h-100 border-0">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <span className="me-2 fs-4">
            {icon}
          </span>

          <h5 className="mb-0 fw-bold">
            {title}
          </h5>

        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;