import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export type AIMessage = {
    id: number;
    role: "user" | "assistant";
    content: string;
};

export type AIConversation = {
    id: string;
    title: string;
    messages: AIMessage[];
    createdAt?: unknown;
    updatedAt?: unknown;
};

const conversationsCollection = (userId: string) =>
    collection(
        db,
        "users",
        userId,
        "aiConversations"
    );

export const createConversation = async (
    userId: string,
    title: string,
    messages: AIMessage[]
) => {
    const conversationRef = await addDoc(
        conversationsCollection(userId),
        {
            title,
            messages,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
    );

    return conversationRef.id;
};

export const updateConversation = async (
    userId: string,
    conversationId: string,
    messages: AIMessage[]
) => {
    const conversationRef = doc(
        db,
        "users",
        userId,
        "aiConversations",
        conversationId
    );

    await updateDoc(conversationRef, {
        messages,
        updatedAt: serverTimestamp(),
    });
};

export const getConversations = async (
    userId: string
): Promise<AIConversation[]> => {
    const conversationsQuery = query(
        conversationsCollection(userId),
        orderBy("updatedAt", "desc")
    );

    const snapshot = await getDocs(conversationsQuery);

    return snapshot.docs.map((conversation) => ({
        id: conversation.id,
        ...(conversation.data() as Omit<
            AIConversation,
            "id"
        >),
    }));
};

export const deleteConversation = async (
    userId: string,
    conversationId: string
) => {
    const conversationRef = doc(
        db,
        "users",
        userId,
        "aiConversations",
        conversationId
    );

    await deleteDoc(conversationRef);
};