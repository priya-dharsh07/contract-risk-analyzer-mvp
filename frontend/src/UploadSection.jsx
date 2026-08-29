import { useState } from "react";

function UploadSection({ setAnalysis, goBuilder, goMarketplace }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("contract", selectedFile);

        try {
            const response = await fetch(
                "http://localhost:8080/analyze",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();
            setAnalysis(data);
        }
        catch (err) {
            console.log(err);
            alert("Backend is not running.");
        }

        setLoading(false);
    };

    return (
        <div className="upload-wrapper">

            <div className="hero-section">
                <h1>Contract Risk Analyzer</h1>

                <p>
                    Upload contracts, analyze legal risks, build new agreements,
                    and enhance them with professional legal clauses.
                </p>
            </div>

            <div className="home-grid">

                <div className="home-card">

                    <div className="card-icon">
                        📄
                    </div>

                    <h2>Analyze Existing Contract</h2>

                    <p>
                        Upload a PDF and let AI detect contract type,
                        risks, missing clauses and recommendations.
                    </p>

                    <input
                        type="file"
                        accept=".pdf"
                        id="pdf"
                        hidden
                        onChange={handleFileChange}
                    />

                    <label
                        htmlFor="pdf"
                        className="choose-btn"
                    >
                        Choose PDF
                    </label>

                    {selectedFile &&
                        <div className="filename">
                            {selectedFile.name}
                        </div>
                    }

                    <button
                        className="analyze-btn"
                        disabled={!selectedFile || loading}
                        onClick={handleAnalyze}
                    >
                        {loading
                            ? "Analyzing..."
                            : "Analyze Contract"}
                    </button>

                </div>

                <div className="home-card">

                    <div className="card-icon">
                        ✨
                    </div>

                    <h2>Create New Contract</h2>

                    <p>
                        Generate professional contracts with AI or
                        browse hundreds of reusable legal clauses.
                    </p>

                    <button
                        className="builder-btn"
                        onClick={goBuilder}
                    >
                        AI Contract Builder
                    </button>

                    <button
                        className="market-btn"
                        onClick={goMarketplace}
                    >
                        Browse Clause Marketplace
                    </button>

                </div>

            </div>

        </div>
    );
}

export default UploadSection;