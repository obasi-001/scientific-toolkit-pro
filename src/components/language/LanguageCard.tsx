import type { Language } from "../../types/language";

interface LanguageCardProps {
    languages: Language[];
    sourceLanguage: string;
    targetLanguage: string;
    text: string;
    translatedText: string;
    loading: boolean;

    onSourceLanguageChange: (value: string) => void;
    onTargetLanguageChange: (value: string) => void;
    onTextChange: (value: string) => void;

    onTranslate: () => void;
    onSwap: () => void;
    onClear: () => void;
    onCopy: () => void;
}

const LanguageCard = ({
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
}: LanguageCardProps) => {
    return (
        <div className="card shadow-sm">
            <div className="card-body p-4">

                <div className="row g-3 align-items-end">

                    <div className="col-md-5">
                        <label className="form-label fw-semibold">
                            From
                        </label>

                        <select
                            className="form-select"
                            value={sourceLanguage}
                            onChange={(e) =>
                                onSourceLanguageChange(e.target.value)
                            }
                        >
                            {languages.map((language) => (
                                <option
                                    key={language.code}
                                    value={language.code}
                                >
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-2 text-center">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onSwap}
                            aria-label="Swap languages"
                        >
                            ⇄
                        </button>
                    </div>

                    <div className="col-md-5">
                        <label className="form-label fw-semibold">
                            To
                        </label>

                        <select
                            className="form-select"
                            value={targetLanguage}
                            onChange={(e) =>
                                onTargetLanguageChange(e.target.value)
                            }
                        >
                            {languages.map((language) => (
                                <option
                                    key={language.code}
                                    value={language.code}
                                >
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="row g-4 mt-1">

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">
                            Text
                        </label>

                        <textarea
                            className="form-control"
                            rows={8}
                            placeholder="Enter text to translate..."
                            value={text}
                            onChange={(e) =>
                                onTextChange(e.target.value)
                            }
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">
                            Translation
                        </label>

                        <textarea
                            className="form-control"
                            rows={8}
                            value={translatedText}
                            placeholder="Translation will appear here..."
                            readOnly
                        />
                    </div>

                </div>

                <div className="d-flex flex-wrap gap-2 mt-4">

                    <button
                        type="button"
                        className="btn btn-primary flex-grow-1"
                        onClick={onTranslate}
                        disabled={loading || !text.trim()}
                    >
                        {loading
                            ? "Translating..."
                            : "Translate"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCopy}
                        disabled={!translatedText}
                    >
                        Copy
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={onClear}
                        disabled={!text && !translatedText}
                    >
                        Clear
                    </button>

                </div>

            </div>
        </div>
    );
};

export default LanguageCard;