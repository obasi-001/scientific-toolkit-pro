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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const suggestions = [
        "Explain a calculation",
        "Solve a math problem",
        "Explain this formula",
        "Help me with statistics",
        "Explain a scientific concept",
        "Ask anything",
    ];

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleToggleMobileMenu = () => {
        setMobileMenuOpen((previous) => !previous);
    };

    const handleSuggestion = (suggestion: string) => {
        setPrompt(suggestion);
        closeMobileMenu();
    };

    const handleLogout = () => {
        closeMobileMenu();
        void logout();
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
        if (!mobileMenuOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [mobileMenuOpen]);

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
        closeMobileMenu();
    };

    const handleNewChat = () => {
        if (loading) {
            return;
        }

        setConversationId(null);
        setMessages([]);
        setPrompt("");
        setError("");
        closeMobileMenu();
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

    const renderConversationList = () => {
        if (loadingConversations) {
            return (
                <p className="ai-menu-empty mb-0">
                    Loading...
                </p>
            );
        }

        if (conversations.length === 0) {
            return (
                <p className="ai-menu-empty mb-0">
                    No saved conversations yet.
                </p>
            );
        }

        return (
            <div className="ai-conversation-list">
                {conversations.map((conversation) => (
                    <div
                        key={conversation.id}
                        className="ai-conversation-item"
                    >
                        <button
                            type="button"
                            className={`ai-conversation-button ${
                                conversation.id === conversationId
                                    ? "is-active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleSelectConversation(
                                    conversation
                                )
                            }
                            disabled={loading}
                        >
                            <span>
                                {conversation.title}
                            </span>
                        </button>

                        <button
                            type="button"
                            className="ai-delete-button"
                            onClick={() =>
                                handleDeleteConversation(
                                    conversation.id
                                )
                            }
                            disabled={loading}
                            aria-label={`Delete ${conversation.title}`}
                            title="Delete conversation"
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        );
    };

    const renderSuggestions = () => (
        <div className="ai-suggestion-list">
            {suggestions.map((suggestion) => (
                <button
                    key={suggestion}
                    type="button"
                    className="ai-suggestion-button"
                    onClick={() =>
                        handleSuggestion(suggestion)
                    }
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );

    const renderMenuContent = (
        includeSuggestions: boolean
    ) => (
        <>
            <section className="ai-menu-section">
                <div className="ai-menu-section-header">
                    <h3>Last chats</h3>

                    <button
                        type="button"
                        className="ai-new-chat-button"
                        onClick={handleNewChat}
                        disabled={loading}
                    >
                        <i className="bi bi-pencil-square"></i>
                        <span>New</span>
                    </button>
                </div>

                {renderConversationList()}
            </section>

            {includeSuggestions && (
                <section className="ai-menu-section">
                    <h3>Ask me anything</h3>
                    {renderSuggestions()}
                </section>
            )}
        </>
    );

    if (!user) {
        return (
            <div className="container-fluid ai-page ai-page-guest">

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
        <div
            className={`container-fluid ai-page ${
                mobileMenuOpen ? "ai-menu-open" : ""
            }`}
        >
            <div className="ai-mobile-topbar">
                <button
                    type="button"
                    className="ai-mobile-icon-button"
                    onClick={handleToggleMobileMenu}
                    aria-label={
                        mobileMenuOpen
                            ? "Close AI menu"
                            : "Open AI menu"
                    }
                    aria-controls="ai-mobile-menu"
                    aria-expanded={mobileMenuOpen}
                >
                    <i className="bi bi-list"></i>
                </button>

                <div className="ai-mobile-title">
                    <span>AI Assistant</span>
                    <small>
                        {conversationId ? "Chat" : "New chat"}
                    </small>
                </div>

                <button
                    type="button"
                    className="ai-mobile-icon-button"
                    onClick={handleNewChat}
                    disabled={loading}
                    aria-label="Start new chat"
                    title="New chat"
                >
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>

            <button
                type="button"
                className={`ai-mobile-backdrop ${
                    mobileMenuOpen ? "is-open" : ""
                }`}
                onClick={closeMobileMenu}
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-label="Close AI menu"
            />

            <aside
                id="ai-mobile-menu"
                className={`ai-mobile-drawer ${
                    mobileMenuOpen ? "is-open" : ""
                }`}
                aria-hidden={!mobileMenuOpen}
            >
                <div className="ai-drawer-header">
                    <div>
                        <span className="ai-drawer-kicker">
                            AI Assistant
                        </span>
                        <h2>Chats</h2>
                    </div>

                    <button
                        type="button"
                        className="ai-mobile-icon-button"
                        onClick={closeMobileMenu}
                        aria-label="Close AI menu"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="ai-drawer-body">
                    {renderMenuContent(true)}
                </div>

                <button
                    type="button"
                    className="ai-drawer-logout"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </button>
            </aside>

            <div className="ai-page-heading mb-4">
                <h2 className="fw-bold mb-1">
                    AI Assistant
                </h2>

                <p className="text-muted mb-0">
                    Your intelligent assistant for
                    mathematics, science, statistics,
                    and everyday questions.
                </p>
            </div>

            <div className="ai-layout">
                <aside className="ai-desktop-sidebar">
                    {renderMenuContent(false)}
                </aside>

                <section
                    className="ai-chat-panel"
                    aria-label="AI conversation"
                >
                    <header className="ai-chat-header">
                        <div>
                            <h4>How can I help you?</h4>

                            <p className="text-muted mb-0">
                                Choose a suggestion or ask me
                                anything.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-danger ai-desktop-signout"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    </header>

                    {messages.length === 0 && (
                        <div className="ai-desktop-suggestions">
                            {renderSuggestions()}
                        </div>
                    )}

                    <div className="ai-chat-window">
                        {messages.length === 0 ? (
                            <div className="ai-empty-chat">
                                <i className="bi bi-stars"></i>
                                <h3>Ask me anything</h3>
                                <p>
                                    Math, science, statistics,
                                    and everyday questions.
                                </p>
                            </div>
                        ) : (
                            <div className="ai-message-list">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`ai-message-row ${
                                            message.role === "user"
                                                ? "is-user"
                                                : "is-assistant"
                                        }`}
                                    >
                                        <div
                                            className={
                                                message.role === "user"
                                                    ? "ai-message-bubble ai-message-user"
                                                    : "ai-message-bubble ai-message-assistant"
                                            }
                                        >
                                            <ReactMarkdown
                                                remarkPlugins={[
                                                    remarkMath,
                                                ]}
                                                rehypePlugins={[
                                                    rehypeKatex,
                                                ]}
                                            >
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>

                                        <button
                                            type="button"
                                            className={`ai-copy-icon-button ${
                                                message.role === "user"
                                                    ? "is-user"
                                                    : "is-assistant"
                                            }`}
                                            onClick={() =>
                                                handleCopy(
                                                    message.content,
                                                    message.id
                                                )
                                            }
                                            aria-label={
                                                copiedMessageId ===
                                                message.id
                                                    ? "Message copied"
                                                    : "Copy message"
                                            }
                                            title={
                                                copiedMessageId ===
                                                message.id
                                                    ? "Copied"
                                                    : "Copy"
                                            }
                                        >
                                            <i
                                                className={
                                                    copiedMessageId ===
                                                    message.id
                                                        ? "bi bi-check2"
                                                        : "bi bi-clipboard"
                                                }
                                            ></i>
                                        </button>
                                    </div>
                                ))}

                                {loading && (
                                    <div className="ai-message-row is-assistant">
                                        <div className="ai-message-bubble ai-message-assistant ai-message-loading">
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
                            className="alert alert-danger ai-chat-error"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="ai-prompt-form"
                    >
                        <input
                            type="text"
                            className="form-control ai-prompt-input"
                            value={prompt}
                            onChange={(e) =>
                                setPrompt(e.target.value)
                            }
                            placeholder="Ask the AI anything..."
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary ai-send-button"
                            disabled={!prompt.trim() || loading}
                        >
                            <span>
                                {loading ? "Sending..." : "Send"}
                            </span>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AI;
