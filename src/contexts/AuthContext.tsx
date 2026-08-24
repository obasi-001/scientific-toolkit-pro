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
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";


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
        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {
                try {
                    if (currentUser) {
                        await createAIUserIfNeeded(
                            currentUser
                        );
                    }

                    setUser(currentUser);
                } catch (error) {
                    console.error(
                        "Unable to initialize AI user:",
                        error
                    );

                    setUser(currentUser);
                } finally {
                    setLoading(false);
                }
            }
        );

        return unsubscribe;
    }, []);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        await signInWithPopup(auth, provider);
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

