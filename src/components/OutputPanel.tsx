import React from 'react';

interface OutputPanelProps {
    result: string | null;
    isError: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({result, isError}) => {
    if (result === null) return null;

    return (
        <div
            style={{
                marginTop: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: isError ? '#fdd' : '#dfd',
                color: isError ? '#900' : '#090',
            }}
        >
            <pre>{result}</pre>
        </div>
    );
};

export default OutputPanel;
