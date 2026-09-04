import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuthErrorMessage } from "../utils/errorMessages";

const AILogin = () => {
    const navigate = useNavigate();

    const {
        login,
        loginWithGoogle,
        loading: authLoading,
        user,
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const googleLoginInFlightRef = useRef(false);
    const isSigningIn = loading || authLoading;

    useEffect(() => {
        if (user) {
            navigate("/ai", { replace: true });
        }
    }, [navigate, user]);

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            setError(
                "Please enter your email and password."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            await login(
                email.trim(),
                password
            );

            navigate("/ai");
        } catch (err) {
            console.error("AI sign-in failed:", err);

            setError(
                getAuthErrorMessage(
                    err,
                    "Unable to sign in."
                )
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        if (isSigningIn || googleLoginInFlightRef.current) {
            return;
        }

        googleLoginInFlightRef.current = true;

        try {
            setLoading(true);
            setError("");

            const signedInUser = await loginWithGoogle("/ai");

            if (signedInUser) {
                navigate("/ai", { replace: true });
            }
        } catch (err) {
            console.error("Google AI sign-in failed:", err);

            setError(
                getAuthErrorMessage(err)
            );
        } finally {
            googleLoginInFlightRef.current = false;
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
                                    AI Assistant
                                </h2>

                                <p className="text-muted mb-0">
                                    Sign in to unlock your
                                    intelligent assistant.
                                </p>

                            </div>

                            {error && (
                                <div className="alert alert-danger auth-error-message">
                                    {error}
                                </div>
                            )}

                            <button
                                type="button"
                                className="btn auth-google-button w-100 mb-4"
                                onClick={handleGoogleLogin}
                                disabled={isSigningIn}
                            >
                                {isSigningIn
                                    ? "Signing in..."
                                    : "Continue with Google"}
                            </button>

                            <div className="d-flex align-items-center gap-3 mb-4">

                                <hr className="flex-grow-1" />

                                <span className="text-muted small">
                                    OR
                                </span>

                                <hr className="flex-grow-1" />

                            </div>

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="ai-email"
                                        className="form-label fw-semibold"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="ai-email"
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

                                <div className="mb-2">

                                    <label
                                        htmlFor="ai-password"
                                        className="form-label fw-semibold"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="ai-password"
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                    />

                                </div>

                                <div className="text-end mb-4">

                                    <Link
                                        to="/ai-forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot password?
                                    </Link>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={isSigningIn}
                                >
                                    {isSigningIn
                                        ? "Signing in..."
                                        : "Sign In"}
                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Don't have an account?{" "}
                                </span>

                                <Link
                                    to="/ai-register"
                                    className="text-decoration-none fw-semibold"
                                >
                                    Create account
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

export default AILogin;
