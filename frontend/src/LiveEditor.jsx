import { useEffect, useState } from "react";

function LiveEditor({
    contract,
    back,
    onSave,
    downloadWord,
    printContract
}) {
    const [text, setText] = useState("");

    useEffect(() => {
        setText(contract || "");
    }, [contract]);

    return (
        <div className="editor-page">

            <div className="editor-header">

                <button
                    className="back-btn"
                    onClick={back}
                >
                    ← Back
                </button>

                <h1>Live Contract Editor</h1>

            </div>

            <div className="editor-toolbar">

                {downloadWord && (
                    <button
                        className="toolbar-btn"
                        onClick={downloadWord}
                    >
                        📄 Download Word
                    </button>
                )}

                {printContract && (
                    <button
                        className="toolbar-btn"
                        onClick={printContract}
                    >
                        🖨 Print
                    </button>
                )}

                <button
                    className="toolbar-btn"
                    onClick={() => onSave(text)}
                >
                    💾 Save
                </button>

            </div>

            <textarea
                className="editor-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

        </div>
    );
}

export default LiveEditor;