import type { TranslationResult } from "../types/language";

const BASE_URL = "https://api.mymemory.translated.net/get";

const normalizeLanguageCode = (code: string): string => {
  return code.split("-")[0].toLowerCase();
};

export const translateText = async (
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<TranslationResult> => {
  if (!text.trim()) {
    throw new Error("Please enter text to translate.");
  }

  if (sourceLanguage === targetLanguage) {
    return {
      translatedText: text,
      sourceLanguage,
      targetLanguage,
    };
  }

  const source = normalizeLanguageCode(sourceLanguage);
  const target = normalizeLanguageCode(targetLanguage);

  const params = new URLSearchParams({
    q: text.trim(),
    langpair: `${source}|${target}`,
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Unable to translate text.");
  }

  const data = await response.json();
  // console.log("Translation API response:", data);

  const translatedText =
    data?.responseData?.translatedText;

  if (!translatedText) {
    throw new Error("Translation was unavailable.");
  }

  return {
    translatedText,
    sourceLanguage,
    targetLanguage,
  };
};