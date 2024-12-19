import React from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

interface CodeEditorProps {
    language: string;
    code: string;
    onCodeChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, code, onCodeChange }) => {
    const handleEditorChange: OnChange = (value) => {
        onCodeChange(value || '');
    };

    return (
        <div style={{ height: '300px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Editor
                height="100%"
                language={language}
                value={code}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CodeEditor;
