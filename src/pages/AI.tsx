import { useEffect, useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { generateAIResponse } from "../services/aiService";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

import {
    createConversation,
    getConversations,
    updateConversation,
    deleteConversation,
} from "../services/aiConversationService";

import type {
    AIConversation,
    AIMessage,
} from "../services/aiConversationService";




const AI = () => {
    const { user, logout } = useAuth();

    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<AIMessage[]>([]);
    const [conversations, setConversations] = useState<
        AIConversation[]
    >([]);

    const [conversationId, setConversationId] =
        useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [loadingConversations, setLoadingConversations] =
        useState(false);

    const [error, setError] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

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

    const handleCopy = async (content: string, messageId: number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedMessageId(messageId);

            setTimeout(() => {
                setCopiedMessageId(null);
            }, 1500);
        } catch (err) {
            console.error("Failed to copy message:", err);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    useEffect(() => {
        if (!user) {
            setConversations([]);
            return;
        }

        const loadConversations = async () => {
            setLoadingConversations(true);
            setError("");

            try {
                const savedConversations =
                    await getConversations(user.uid);

                setConversations(savedConversations);
            } catch (err) {
                console.error(
                    "Failed to load conversations:",
                    err
                );

                setError(
                    "Unable to load your saved conversations."
                );
            } finally {
                setLoadingConversations(false);
            }
        };

        loadConversations();
    }, [user]);

    const handleSelectConversation = (
        conversation: AIConversation
    ) => {
        if (loading) {
            return;
        }

        setConversationId(conversation.id);
        setMessages(conversation.messages ?? []);
        setPrompt("");
        setError("");
    };

    const handleNewChat = () => {
        if (loading) {
            return;
        }

        setConversationId(null);
        setMessages([]);
        setPrompt("");
        setError("");
    };

    const handleDeleteConversation = async (conversationIdToDelete: string) => {
        if (loading || !user) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this conversation?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await deleteConversation(user.uid, conversationIdToDelete);

            setConversations((previous) =>
                previous.filter(
                    (conversation) =>
                        conversation.id !== conversationIdToDelete
                )
            );

            if (conversationId === conversationIdToDelete) {
                setConversationId(null);
                setMessages([]);
                setPrompt("");
            }
        } catch (err) {
            console.error("Failed to delete conversation:", err);

            setError(
                "Unable to delete this conversation."
            );
        }
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const trimmedPrompt = prompt.trim();

        if (!trimmedPrompt || loading || !user) {
            return;
        }

        setLoading(true);
        setError("");

        const userMessage: AIMessage = {
            id: Date.now(),
            role: "user",
            content: trimmedPrompt,
        };

        const updatedMessages: AIMessage[] = [
            ...messages,
            userMessage,
        ];

        setMessages(updatedMessages);
        setPrompt("");

        try {
            const result =
                await generateAIResponse(trimmedPrompt);

            const assistantMessage: AIMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: result,
            };

            const finalMessages: AIMessage[] = [
                ...updatedMessages,
                assistantMessage,
            ];

            setMessages(finalMessages);

            if (!conversationId) {
                const title =
                    trimmedPrompt.length > 50
                        ? `${trimmedPrompt.slice(0, 50)}...`
                        : trimmedPrompt;

                const newConversationId =
                    await createConversation(
                        user.uid,
                        title,
                        finalMessages
                    );

                setConversationId(newConversationId);

                const newConversation: AIConversation = {
                    id: newConversationId,
                    title,
                    messages: finalMessages,
                };

                setConversations((previous) => [
                    newConversation,
                    ...previous,
                ]);
            } else {
                await updateConversation(
                    user.uid,
                    conversationId,
                    finalMessages
                );

                setConversations((previous) =>
                    previous.map((conversation) =>
                        conversation.id === conversationId
                            ? {
                                ...conversation,
                                messages: finalMessages,
                            }
                            : conversation
                    )
                );
            }
        } catch (err) {
            console.error(
                "AI request failed:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong while contacting the AI."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="container-fluid">

                <div className="mb-4">
                    <h2 className="fw-bold mb-1">
                        AI Assistant
                    </h2>

                    <p className="text-muted mb-0">
                        Your intelligent assistant for
                        mathematics, science, statistics,
                        and everyday questions.
                    </p>
                </div>

                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card shadow-sm border-0 text-center">

                            <div className="card-body p-5">

                                <div
                                    className="mb-4"
                                    style={{
                                        fontSize: "3rem",
                                    }}
                                >
                                    🤖
                                </div>

                                <h3 className="fw-bold">
                                    Sign in to use AI
                                </h3>

                                <p className="text-muted mb-4">
                                    Sign in with Google or
                                    create an account to use
                                    the AI Assistant.
                                </p>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                    (window.location.href =
                                        "/ai-login")
                                    }
                                >
                                    Continue to AI
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="container-fluid">

            <div className="mb-4">
                <h2 className="fw-bold mb-1">
                    AI Assistant
                </h2>

                <p className="text-muted mb-0">
                    Your intelligent assistant for
                    mathematics, science, statistics,
                    and everyday questions.
                </p>
            </div>

            <div className="row g-4">

                <div className="col-12 col-lg-3">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="fw-bold mb-0">
                                    Conversations
                                </h5>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={handleNewChat}
                                    disabled={loading}
                                >
                                    New
                                </button>

                            </div>

                            {loadingConversations ? (
                                <p className="text-muted mb-0">
                                    Loading...
                                </p>
                            ) : conversations.length === 0 ? (
                                <p className="text-muted mb-0">
                                    No saved conversations yet.
                                </p>
                            ) : (
                                <div className="d-flex flex-column gap-2">

                                    {conversations.map(
                                        (conversation) => (
                                            <div
                                                key={conversation.id}
                                                className="d-flex gap-2"
                                            >

                                                <button
                                                    type="button"
                                                    className={`btn text-start flex-grow-1 ${conversation.id === conversationId
                                                        ? "btn-primary"
                                                        : "btn-outline-secondary"
                                                        }`}
                                                    onClick={() =>
                                                        handleSelectConversation(
                                                            conversation
                                                        )
                                                    }
                                                    disabled={loading}
                                                >
                                                    {conversation.title}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleDeleteConversation(
                                                            conversation.id
                                                        )
                                                    }
                                                    disabled={loading}
                                                    title="Delete conversation"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>

                                            </div>
                                        )
                                    )}

                                </div>
                            )}

                        </div>

                    </div>

                </div>

                <div className="col-12 col-lg-9">

                    <div className="card shadow-sm border-0">

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>
                                    <h4 className="fw-bold mb-1">
                                        How can I help you?
                                    </h4>

                                    <p className="text-muted mb-0">
                                        Choose a suggestion or
                                        ask me anything.
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

                            {messages.length === 0 && (
                                <div className="d-flex flex-wrap gap-2 mb-4">

                                    {suggestions.map(
                                        (suggestion) => (
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
                                        )
                                    )}

                                </div>
                            )}

                            <div
                                className="border rounded p-4 mb-4"
                                style={{
                                    minHeight: "300px",
                                    maxHeight: "500px",
                                    overflowY: "auto",
                                }}
                            >

                                {messages.length === 0 ? (
                                    <div className="text-muted text-center">
                                        Your AI conversation
                                        will appear here.
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column gap-3">

                                        {messages.map(
                                            (message) => (
                                                <div
                                                    key={message.id}
                                                    className={
                                                        message.role ===
                                                            "user"
                                                            ? "text-end"
                                                            : "text-start"
                                                    }
                                                >

                                                    <div
                                                        className={
                                                            message.role === "user"
                                                                ? "d-inline-block bg-primary text-white rounded p-3"
                                                                : "d-inline-block bg-light rounded p-3"
                                                        }
                                                        style={{
                                                            maxWidth: "85%",
                                                            whiteSpace: "normal",
                                                        }}
                                                    >
                                                        <ReactMarkdown
                                                            remarkPlugins={[remarkMath]}
                                                            rehypePlugins={[rehypeKatex]}
                                                        >
                                                            {message.content}
                                                        </ReactMarkdown>

                                                        <div className="mt-2 text-start">
                                                            <button
                                                                type="button"
                                                                className={
                                                                    message.role === "user"
                                                                        ? "btn btn-sm btn-outline-light"
                                                                        : "btn btn-sm btn-outline-secondary"
                                                                }
                                                                onClick={() =>
                                                                    handleCopy(message.content, message.id)
                                                                }
                                                            >
                                                                <i
                                                                    className={
                                                                        copiedMessageId === message.id
                                                                            ? "bi bi-check2"
                                                                            : "bi bi-clipboard"
                                                                    }
                                                                ></i>{" "}
                                                                {copiedMessageId === message.id
                                                                    ? "Copied"
                                                                    : "Copy"}
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        )}

                                        {loading && (
                                            <div className="text-start">

                                                <div className="d-inline-block bg-light rounded p-3 text-muted">
                                                    Thinking...
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                )}

                                <div ref={messagesEndRef} />

                            </div>

                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="d-flex gap-2"
                            >

                                <input
                                    type="text"
                                    className="form-control"
                                    value={prompt}
                                    onChange={(e) =>
                                        setPrompt(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Ask the AI anything..."
                                    disabled={loading}
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={
                                        !prompt.trim() ||
                                        loading
                                    }
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AI;