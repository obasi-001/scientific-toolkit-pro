import { createAIUserIfNeeded } from "../services/aiUserService";
import { auth } from "../services/firebase";


import {
    useCallback,
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    createUserWithEmailAndPassword,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    type User,
} from "firebase/auth";

const createGoogleProvider = () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: "select_account",
    });

    return provider;
};

const GOOGLE_SIGN_IN_TARGET_KEY =
    "scientific-toolkit-google-sign-in-target";

const getAuthErrorCode = (error: unknown): string => {
    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
    ) {
        return String(
            (error as { code?: unknown }).code
        );
    }

    return "";
};

const isLikelyMobileBrowser = () => {
    if (typeof navigator === "undefined") {
        return false;
    }

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|FBAN|FBAV|Instagram|Line|TikTok|Snapchat/i.test(
        navigator.userAgent
    );
};

const shouldFallbackToRedirect = (
    error: unknown
) => {
    const code = getAuthErrorCode(error);

    return (
        code === "auth/popup-blocked" ||
        code === "auth/cancelled-popup-request" ||
        code ===
            "auth/operation-not-supported-in-this-environment" ||
        (
            code === "auth/popup-closed-by-user" &&
            isLikelyMobileBrowser()
        )
    );
};

const isSafeInternalPath = (path: string) =>
    path.startsWith("/") && !path.startsWith("//");

const setPendingGoogleSignInTarget = (path: string) => {
    if (
        typeof window === "undefined" ||
        !isSafeInternalPath(path)
    ) {
        return;
    }

    try {
        window.sessionStorage.setItem(
            GOOGLE_SIGN_IN_TARGET_KEY,
            path
        );
    } catch (error) {
        console.error(
            "Unable to remember Google sign-in target:",
            error
        );
    }
};

const getPendingGoogleSignInTarget = () => {
    if (typeof window === "undefined") {
        return "";
    }

    try {
        return (
            window.sessionStorage.getItem(
                GOOGLE_SIGN_IN_TARGET_KEY
            ) ?? ""
        );
    } catch (error) {
        console.error(
            "Unable to read Google sign-in target:",
            error
        );
        return "";
    }
};

const clearPendingGoogleSignInTarget = () => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.sessionStorage.removeItem(
            GOOGLE_SIGN_IN_TARGET_KEY
        );
    } catch (error) {
        console.error(
            "Unable to clear Google sign-in target:",
            error
        );
    }
};

const redirectToPendingGoogleSignInTarget = (
    currentUser: User | null
) => {
    if (!currentUser || typeof window === "undefined") {
        return;
    }

    const targetPath = getPendingGoogleSignInTarget();

    if (!targetPath || !isSafeInternalPath(targetPath)) {
        return;
    }

    clearPendingGoogleSignInTarget();

    if (
        window.location.pathname !== targetPath
    ) {
        window.location.replace(targetPath);
    }
};


interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: (
        redirectPath?: string
    ) => Promise<User | null>;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    register: (
        email: string,
        password: string
    ) => Promise<void>;

    resetPassword: (
        email: string
    ) => Promise<void>;

    logout: () => Promise<void>;
}

const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

let redirectResultPromise: Promise<User | null> | null =
    null;

const getGoogleRedirectUser = () => {
    if (!redirectResultPromise) {
        redirectResultPromise = getRedirectResult(auth).then(
            (result) => result?.user ?? null
        );
    }

    return redirectResultPromise;
};

const initializeAIUser = async (
    currentUser: User
) => {
    try {
        await createAIUserIfNeeded(currentUser);
    } catch (error) {
        console.error(
            "Unable to initialize AI user:",
            error
        );
    }
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const syncAuthUser = useCallback(
        (currentUser: User | null) => {
            setUser(currentUser);
            setLoading(false);
            redirectToPendingGoogleSignInTarget(currentUser);

            if (currentUser) {
                void initializeAIUser(currentUser);
            }
        },
        []
    );

    useEffect(() => {
        let isActive = true;

        const updateAuthUser = (currentUser: User | null) => {
            if (!isActive) {
                return;
            }

            syncAuthUser(currentUser);
        };

        const unsubscribe = onAuthStateChanged(
            auth,
            updateAuthUser
        );

        void getGoogleRedirectUser()
            .then((redirectUser) => {
                if (redirectUser) {
                    updateAuthUser(redirectUser);
                }
            })
            .catch((error) => {
                if (isActive) {
                    console.error(
                        "Unable to complete Google redirect sign-in:",
                        error
                    );
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
            unsubscribe();
        };
    }, [syncAuthUser]);

    const loginWithGoogle = async (
        redirectPath = "/ai"
    ) => {
        const provider = createGoogleProvider();

        setPendingGoogleSignInTarget(redirectPath);

        if (isLikelyMobileBrowser()) {
            await signInWithRedirect(auth, provider);
            return null;
        }

        try {
            const result = await signInWithPopup(auth, provider);
            clearPendingGoogleSignInTarget();
            syncAuthUser(result.user);
            return result.user;
        } catch (error) {
            if (shouldFallbackToRedirect(error)) {
                await signInWithRedirect(auth, provider);
                return null;
            }

            clearPendingGoogleSignInTarget();
            throw error;
        }
    };

    const login = async (
        email: string,
        password: string
    ) => {
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    const register = async (
        email: string,
        password: string
    ) => {
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    const resetPassword = async (
        email: string
    ) => {
        await sendPasswordResetEmail(
            auth,
            email
        );
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginWithGoogle,
                login,
                register,
                resetPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};

