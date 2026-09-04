import { createAIUserIfNeeded } from "../services/aiUserService";
import { auth } from "../services/firebase";


import {
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

const shouldUseRedirectForGoogleSignIn = () => {
    if (typeof navigator === "undefined") {
        return false;
    }

    const userAgent = navigator.userAgent;

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|FBAN|FBAV|Instagram|Line|TikTok|Snapchat/i.test(
        userAgent
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
            "auth/operation-not-supported-in-this-environment"
    );
};


interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;

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

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

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

        const updateAuthUser = (currentUser: User | null) => {
            if (!isActive) {
                return;
            }

            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                void initializeAIUser(currentUser);
            }
        };

        const unsubscribe = onAuthStateChanged(
            auth,
            updateAuthUser
        );

        void getRedirectResult(auth)
            .then((result) => {
                if (result?.user) {
                    updateAuthUser(result.user);
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
    }, []);

    const loginWithGoogle = async () => {
        const provider = createGoogleProvider();

        if (shouldUseRedirectForGoogleSignIn()) {
            await signInWithRedirect(auth, provider);
            return;
        }

        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            if (shouldFallbackToRedirect(error)) {
                await signInWithRedirect(auth, provider);
                return;
            }

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

