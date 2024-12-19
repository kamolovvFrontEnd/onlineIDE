import React from 'react';

interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (newLanguage: string) => void;
}

const languages = ['javascript', 'python'];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            style={{ margin: '10px 0', padding: '5px', fontSize: '16px' }}
        >
            {languages.map((lang) => (
                <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
