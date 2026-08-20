import LanguageCard from "./LanguageCard";
import type { Language } from "../../types/language";

interface LanguageGridProps {
    languages: Language[];
    sourceLanguage: string;
    targetLanguage: string;
    text: string;
    translatedText: string;
    loading: boolean;
    copied: boolean;

    onSourceLanguageChange: (value: string) => void;
    onTargetLanguageChange: (value: string) => void;
    onTextChange: (value: string) => void;

    onTranslate: () => void;
    onSwap: () => void;
    onClear: () => void;
    onCopy: () => void;
}

const LanguageGrid = ({
    languages,
    sourceLanguage,
    targetLanguage,
    text,
    translatedText,
    loading,
    onSourceLanguageChange,
    onTargetLanguageChange,
    onTextChange,
    onTranslate,
    onSwap,
    onClear,
    onCopy,
    copied,
}: LanguageGridProps) => {
    return (
        <div className="row g-4">
            <div className="col-12 col-lg-10 mx-auto">
                <LanguageCard
                    languages={languages}
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    text={text}
                    translatedText={translatedText}
                    loading={loading}
                    onSourceLanguageChange={onSourceLanguageChange}
                    onTargetLanguageChange={onTargetLanguageChange}
                    onTextChange={onTextChange}
                    onTranslate={onTranslate}
                    onSwap={onSwap}
                    onClear={onClear}
                    onCopy={onCopy}
                    copied={copied}
                />
            </div>
        </div>
    );
};

export default LanguageGrid;