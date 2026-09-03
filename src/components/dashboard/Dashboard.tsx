import DashboardGrid from "./DashboardGrid";

const Dashboard = () => {
    return (
        <>
            <div className="mb-4">
                <h2 className="fw-bold mb-1">
                    Dashboard
                </h2>

                <p className="text-muted mb-0">
                    Your calculation and utility workspace.
                </p>
            </div>

            <DashboardGrid />
        </>
    );
};

export default Dashboard;
