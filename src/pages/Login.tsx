import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAuthErrorMessage } from "../utils/errorMessages";

const Login = () => {
    const navigate = useNavigate();

    const {
        login,
        loginWithGoogle,
        user,
    } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const googleLoginInFlightRef = useRef(false);

    useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true });
        }
    }, [navigate, user]);

    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await login(
                email.trim(),
                password
            );

            navigate("/dashboard");
        } catch (err) {
            console.error("Sign-in failed:", err);

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
        if (loading || googleLoginInFlightRef.current) {
            return;
        }

        googleLoginInFlightRef.current = true;

        try {
            setLoading(true);
            setError("");

            const signedInUser = await loginWithGoogle(
                "/dashboard"
            );

            if (signedInUser) {
                navigate("/dashboard", { replace: true });
            }
        } catch (err) {
            console.error("Google sign-in failed:", err);

            setError(
                getAuthErrorMessage(err)
            );
        } finally {
            googleLoginInFlightRef.current = false;
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-7 col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold">
                                    Welcome Back
                                </h2>

                                <p className="text-muted mb-0">
                                    Sign in to Scientific Toolkit Pro
                                </p>

                            </div>

                            {error && (
                                <div className="alert alert-danger auth-error-message">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
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
                                        htmlFor="password"
                                        className="form-label fw-semibold"
                                    >
                                        Password
                                    </label>

                                    <input
                                        id="password"
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
                                        to="/forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot password?
                                    </Link>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Signing in..."
                                        : "Sign In"}
                                </button>

                            </form>

                            <div className="d-flex align-items-center gap-3 my-4">

                                <hr className="flex-grow-1" />

                                <span className="text-muted small">
                                    OR
                                </span>

                                <hr className="flex-grow-1" />

                            </div>

                            <button
                                type="button"
                                className="btn auth-google-button w-100"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                            >
                                Continue with Google
                            </button>

                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Don't have an account?{" "}
                                </span>

                                <Link
                                    to="/register"
                                    className="text-decoration-none fw-semibold"
                                >
                                    Create account
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;
