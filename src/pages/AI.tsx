import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const AI = () => {
    const { user, logout } = useAuth();

    const [prompt, setPrompt] = useState("");

    const suggestions = [
        "Explain a calculation",
        "Solve a math problem",
        "Explain this formula",
        "Help me with statistics",
        "Explain a scientific concept",
        "Ask anything",
    ];

    const handleSuggestion = (suggestion: string) => {
        setPrompt(suggestion);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            return;
        }

        // AI service will be connected here.
        console.log("AI prompt:", prompt);
    };

    return (
        <div className="container-fluid">

            <div className="mb-4">
                <h2 className="fw-bold mb-1">
                    AI Assistant
                </h2>

                <p className="text-muted mb-0">
                    Your intelligent assistant for mathematics,
                    science, statistics, and everyday questions.
                </p>
            </div>

            {!user ? (
                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card shadow-sm border-0 text-center">

                            <div className="card-body p-5">

                                <div
                                    className="mb-4"
                                    style={{ fontSize: "3rem" }}
                                >
                                    🤖
                                </div>

                                <h3 className="fw-bold">
                                    Sign in to use AI
                                </h3>

                                <p className="text-muted mb-4">
                                    Sign in with Google or create an
                                    account to use the AI Assistant.
                                    Your conversations will be securely
                                    associated with your account.
                                </p>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        window.location.href = "/ai-login"
                                    }
                                >
                                    Continue to AI
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            ) : (
                <div className="row justify-content-center">

                    <div className="col-12 col-lg-10 col-xl-9">

                        <div className="card shadow-sm border-0">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <div>
                                        <h4 className="fw-bold mb-1">
                                            How can I help you?
                                        </h4>

                                        <p className="text-muted mb-0">
                                            Choose a suggestion or ask me
                                            anything.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={logout}
                                    >
                                        Sign Out
                                    </button>

                                </div>

                                <div className="d-flex flex-wrap gap-2 mb-4">

                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                handleSuggestion(
                                                    suggestion
                                                )
                                            }
                                        >
                                            {suggestion}
                                        </button>
                                    ))}

                                </div>

                                <div
                                    className="border rounded p-4 mb-4"
                                    style={{
                                        minHeight: "300px",
                                    }}
                                >
                                    <div className="text-muted text-center">
                                        Your AI conversation will
                                        appear here.
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="d-flex gap-2"
                                >

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={prompt}
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        placeholder="Ask the AI anything..."
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={!prompt.trim()}
                                    >
                                        Send
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default AI;