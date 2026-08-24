import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";

import type { User } from "firebase/auth";

import { db } from "./firebase";

export const createAIUserIfNeeded = async (
    user: User
) => {
    const userRef = doc(
        db,
        "users",
        user.uid
    );

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return;
    }

    await setDoc(userRef, {
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? "",
        provider: user.providerData[0]?.providerId ?? "",
        createdAt: serverTimestamp(),
    });
};