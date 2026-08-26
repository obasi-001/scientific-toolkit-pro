import {
    getGenerativeModel,
    type GenerativeModel,
} from "firebase/ai";

import { ai } from "./firebase";

const model: GenerativeModel = getGenerativeModel(ai, {
    model: "gemini-3.6-flash",
});

export const generateAIResponse = async (
    prompt: string
): Promise<string> => {
    if (!prompt.trim()) {
        throw new Error("Please enter a question.");
    }

    const result = await model.generateContent(prompt);

    const response = result.response;

    return response.text();
};