import { useState } from "react";
import LanguageGrid from "../components/language/LanguageGrid";
import { LANGUAGES } from "../components/constants/languages";
import { translateText } from "../services/languageApi";
import { useToast } from "../contexts/ToastContext";


const Translator = () => {
    const { showToast } = useToast();
    const [sourceLanguage, setSourceLanguage] = useState("en-GB");
    const [targetLanguage, setTargetLanguage] = useState("es-ES");

    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [copied, setCopied] = useState(false);

    const handleTranslate = async () => {
        if (!text.trim()) {
            setError("Please enter text to translate.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await translateText(
                text,
                sourceLanguage,
                targetLanguage
            );

            setTranslatedText(result.translatedText);
        } catch (err) {
            setTranslatedText("");

            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to translate text."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSwap = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);

        if (translatedText) {
            setText(translatedText);
            setTranslatedText(text);
        }
    };

    const handleClear = () => {
        setText("");
        setTranslatedText("");
        setError("");
        // setCopied(false);
    };

    const handleCopy = async () => {
        if (!translatedText) {
            return;
        }

        try {
            await navigator.clipboard.writeText(translatedText);

            showToast(
                "Translation copied to clipboard",
                "success"
            );
        } catch {
            showToast(
                "Unable to copy translation",
                "error"
            );
        }
    };
    return (
        <div className="container-fluid tool-page translator-page">

            <div className="mb-4">
                <h2 className="fw-bold mb-1">
                    Translator
                </h2>

                <p className="text-muted mb-0">
                    Translate text between different languages.
                </p>
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <LanguageGrid
                languages={LANGUAGES}
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                text={text}
                translatedText={translatedText}
                loading={loading}
                onSourceLanguageChange={(value) => {
                    setSourceLanguage(value);
                    setTranslatedText("");
                }}
                onTargetLanguageChange={(value) => {
                    setTargetLanguage(value);
                    setTranslatedText("");
                }}
                onTextChange={(value) => {
                    setText(value);
                    setError("");
                }}
                onTranslate={handleTranslate}
                onSwap={handleSwap}
                onClear={handleClear}
                onCopy={handleCopy}
                // copied={copied}
            />

        </div>
    );
};

export default Translator;
