import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const SettingsCard = ({
  title,
  description,
  children,
}: SettingsCardProps) => {
  return (
    <div className="card shadow-sm mb-4 settings-card">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-1">
          {title}
        </h5>

        {description && (
          <p className="text-muted mb-4">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );

};

export default SettingsCard;