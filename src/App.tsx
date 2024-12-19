import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import OutputPanel from './components/OutputPanel';
import { makeServer } from './mockServer';

makeServer(); // Инициализация MirageJS

const App: React.FC = () => {
    const [language, setLanguage] = useState<string>('javascript');
    const [code, setCode] = useState<string>('// Write your code here');
    const [output, setOutput] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const runCode = async () => {
        try {
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, code }),
            });

            const result = await response.json();

            if (result.status === 'success') {
                setOutput(result.output);
                setIsError(false);
            } else {
                setOutput(result.error);
                setIsError(true);
            }
        } catch (error) {
            setOutput('Unexpected error occurred.');
            setIsError(true);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Online Code Runner</h1>
            <p>Select a language, write your code, and run it.</p>
            <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
            <CodeEditor language={language} code={code} onCodeChange={setCode} />
            <button
                onClick={runCode}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                Run
            </button>
            <OutputPanel result={output} isError={isError} />
        </div>
    );
};

export default App;
