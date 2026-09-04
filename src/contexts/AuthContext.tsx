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
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";

const createGoogleProvider = () => {
    const provider = new GoogleAuthProvider();

    return provider;
};

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<User | null>;

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

        return () => {
            isActive = false;
            unsubscribe();
        };
    }, [syncAuthUser]);

    const loginWithGoogle = async () => {
        const provider = createGoogleProvider();

        const result = await signInWithPopup(auth, provider);
        syncAuthUser(result.user);
        return result.user;
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

