type ErrorWithCode = {
    code?: unknown;
    message?: unknown;
};

const GOOGLE_POPUP_ERROR_MESSAGE =
    "Unable to sign in. Please try again. If you're using Google, wait a few seconds and retry, or use your email and password instead. Don't have an account? Create an account below to continue.";

const getErrorCode = (error: unknown): string => {
    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
    ) {
        return String((error as ErrorWithCode).code);
    }

    return "";
};

const getErrorText = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
    ) {
        return String((error as ErrorWithCode).message);
    }

    return "";
};

export const getAuthErrorMessage = (
    error: unknown,
    fallback = GOOGLE_POPUP_ERROR_MESSAGE
): string => {
    const code = getErrorCode(error);

    if (
        code === "auth/popup-blocked" ||
        code === "auth/cancelled-popup-request" ||
        code === "auth/popup-closed-by-user" ||
        code === "auth/operation-not-supported-in-this-environment"
    ) {
        return GOOGLE_POPUP_ERROR_MESSAGE;
    }

    if (code === "auth/network-request-failed") {
        return "Unable to sign in. Check your connection and try again.";
    }

    if (code === "auth/unauthorized-domain") {
        return "Unable to sign in from this domain. Try again or create an account below to continue.";
    }

    if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
    ) {
        return "Invalid email or password.";
    }

    return fallback;
};

export const getAIErrorMessage = (
    error: unknown
): string => {
    const message = getErrorText(error);

    if (
        /app check|token|401|403|firebasevertexai|fetch/i.test(
            message
        )
    ) {
        return "Unable to contact the AI right now. Please try again shortly.";
    }

    return "Something went wrong while contacting the AI.";
};
