import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
    initializeAppCheck,
    ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

import { getAI, GoogleAIBackend } from "firebase/ai";

const getFirebaseAuthDomain = () => {
    const configuredAuthDomain =
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;

    if (typeof window === "undefined") {
        return configuredAuthDomain;
    }

    const { hostname } = window.location;
    const isLocalHost =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "::1";
    const isLocalNetworkIp =
        /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);

    if (isLocalHost || isLocalNetworkIp) {
        return configuredAuthDomain;
    }

    return hostname;
};

// Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: getFirebaseAuthDomain(),
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Cloud Firestore
export const db = getFirestore(app);

// Firebase App Check
if (import.meta.env.DEV) {
    (
        self as typeof globalThis & {
            FIREBASE_APPCHECK_DEBUG_TOKEN?: string | boolean;
        }
    ).FIREBASE_APPCHECK_DEBUG_TOKEN =
        import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;
}

export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(
        import.meta.env.VITE_RECAPTCHA_ENTERPRISE_KEY
    ),
    isTokenAutoRefreshEnabled: true,
});

// Firebase AI Logic
export const ai = getAI(app, {
    backend: new GoogleAIBackend(),
});

export default app;
