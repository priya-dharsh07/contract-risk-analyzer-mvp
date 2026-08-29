import { useState } from "react";
import "./App.css";

import UploadSection from "./UploadSection";
import Dashboard from "./Dashboard";
import Builder from "./Builder";
import Marketplace from "./Marketplace";
import LiveEditor from "./LiveEditor";

function App() {
    const [analysis, setAnalysis] = useState(null);
    const [page, setPage] = useState("upload");
    const [selectedClause, setSelectedClause] = useState("");
    const [editorText, setEditorText] = useState("");
    const [previousPage, setPreviousPage] = useState("");

    const [generatedContract, setGeneratedContract] = useState("");
    const openEditor = (text) => {
        const openEditor = (text) => {
    console.log("Received by editor:", text);

    setEditorText(text);
    setPreviousPage(page);
    setPage("editor");
};
        setEditorText(text);
        setPreviousPage(page);
        setPage("editor");
    };

    return (
        <div className="app">
            {page === "upload" && (
                <UploadSection
                    setAnalysis={(data) => {
                        setAnalysis(data);
                        setPage("dashboard");
                    }}
                    goBuilder={() => setPage("builder")}
                    goMarketplace={() => setPage("marketplace")}
                />
            )}

            {page === "dashboard" && analysis && (
                <Dashboard
                    analysis={{
                        ...analysis,
                        summary: editorText || analysis.summary
                    }}
                    reset={() => {
                        setAnalysis(null);
                        setEditorText("");
                        setGeneratedContract("");
                        setPage("upload");
                    }}
                    openBuilder={() => setPage("builder")}
                    openMarketplace={() => setPage("marketplace")}
                    openEditor={() => openEditor(editorText || analysis.summary)}
                />
            )}

            {page === "builder" && (
                <Builder
                    back={() => {
                        if (selectedClause) {
                            setPage("marketplace");
                        } else {
                            setPage("upload");
                        }
                    }}
                    goMarketplace={() => setPage("marketplace")}
                    selectedClause={selectedClause}
                    openEditor={openEditor}
                    contract={generatedContract}
                    setContract={setGeneratedContract}
                />
            )}

            {page === "marketplace" && (
                <Marketplace
                    back={() => {
                        if (analysis) {
                            setPage("dashboard");
                        } else {
                            setPage("upload");
                        }
                    }}
                    selectClause={(clause) => {
                        setSelectedClause(clause);
                        setPage("builder");
                    }}
                />
            )}

            {page === "editor" && (
                <LiveEditor
                    contract={editorText}
                    onSave={(updatedContract) => {
                        setEditorText(updatedContract);

                        if (previousPage === "builder") {
                            setGeneratedContract(updatedContract);
                        }

                        if (previousPage === "dashboard") {
                            setAnalysis((prev) => ({
                                ...prev,
                                summary: updatedContract
                            }));
                        }

                        setPage(previousPage);
                    }}
                    back={() => setPage(previousPage)}
                />
            )}
        </div>
    );
}

export default App;