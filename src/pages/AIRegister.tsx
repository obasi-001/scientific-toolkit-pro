import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AIRegister = () => {
    const navigate = useNavigate();

    const { register } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password || !confirmPassword) {
            setError(
                "Please complete all fields."
            );
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Passwords do not match."
            );
            return;
        }

        try {
            setLoading(true);

            await register(
                email.trim(),
                password
            );

            navigate("/ai");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to create your account."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <div
                                    className="mb-3"
                                    style={{ fontSize: "3rem" }}
                                >
                                    🤖
                                </div>

                                <h2 className="fw-bold mb-1">
                                    Create AI Account
                                </h2>

                                <p className="text-muted mb-0">
                                    Create an account to use the
                                    AI Assistant.
                                </p>

                            </div>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="ai-register-email"
                                        className="form-label fw-semibold"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="ai-register-email"
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        htmlFor="ai-register-password"
                                        className="form-label fw-semibold"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="ai-register-password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                    />

                                </div>

                                <div className="mb-4">

                                    <label
                                        htmlFor="ai-register-confirm-password"
                                        className="form-label fw-semibold"
                                    >
                                        Confirm Password
                                    </label>

                                    <input
                                        id="ai-register-confirm-password"
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create Account"}
                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Already have an account?{" "}
                                </span>

                                <Link
                                    to="/ai-login"
                                    className="text-decoration-none fw-semibold"
                                >
                                    Sign in
                                </Link>

                            </div>

                            <div className="text-center mt-3">

                                <button
                                    type="button"
                                    className="btn btn-link text-muted text-decoration-none"
                                    onClick={() =>
                                        navigate("/ai")
                                    }
                                >
                                    ← Back to AI Assistant
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AIRegister;