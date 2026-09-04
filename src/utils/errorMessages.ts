type ErrorWithCode = {
    code?: unknown;
    message?: unknown;
};

const GOOGLE_POPUP_ERROR_MESSAGE =
    "Google sign-in did not finish. Tap Continue with Google again, or create an account below to continue.";

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
    fallback = "Unable to sign in. Try again or create an account below to continue."
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
