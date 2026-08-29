import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

function Builder({
    back,
    goMarketplace,
    selectedClause,
    openEditor,
    contract,
    setContract
}) {
    const [form, setForm] = useState({
        contractType: "",
        partyOne: "",
        partyTwo: "",
        startDate: "",
        endDate: "",
        payment: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedClause) return;

        setForm(prev => {
            if (prev.description.includes(selectedClause)) {
                return prev;
            }

            return {
                ...prev,
                description:
                    prev.description.trim() === ""
                        ? selectedClause
                        : prev.description + "\n\n" + selectedClause
            };
        });
    }, [selectedClause]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const generateContract = async () => {
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/builder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();
            setContract(data.contract);
        } catch (error) {
            console.log(error);
            alert("Backend not running");
        }

        setLoading(false);
    };

    const downloadWord = async () => {
        if (!contract) return;

        const lines = contract.split("\n");

        const children = lines.map((line) => {
            if (line.startsWith("# ")) {
                return new Paragraph({
                    text: line.replace("# ", ""),
                    heading: HeadingLevel.HEADING_1
                });
            }

            if (line.startsWith("## ")) {
                return new Paragraph({
                    text: line.replace("## ", ""),
                    heading: HeadingLevel.HEADING_2
                });
            }

            return new Paragraph({
                text: line
            });
        });

        const doc = new Document({
            sections: [
                {
                    children
                }
            ]
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "Generated_Contract.docx");
    };

    const printContract = () => {
        const content = document.getElementById("contract-preview").innerHTML;

        const printWindow = window.open("", "", "width=1000,height=800");

        printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Contract</title>

<style>
body{
font-family:"Times New Roman",serif;
margin:45px;
color:#000;
line-height:1.8;
font-size:15px;
}

h1{
text-align:center;
font-size:30px;
margin-bottom:25px;
}

h2{
margin-top:30px;
border-bottom:2px solid #000;
padding-bottom:5px;
font-size:22px;
}

h3{
margin-top:22px;
font-size:18px;
}

p{
margin:10px 0;
text-align:justify;
}

hr{
border:none;
border-top:2px solid #555;
margin:30px 0;
}

strong{
font-weight:bold;
}

table{
width:100%;
border-collapse:collapse;
margin:20px 0;
}

th{
background:#e5e5e5;
}

th,td{
border:1px solid #000;
padding:10px;
text-align:left;
vertical-align:top;
}

ul,ol{
margin-left:25px;
}

li{
margin-bottom:8px;
}

blockquote{
border-left:4px solid #888;
padding-left:15px;
color:#444;
}

pre{
white-space:pre-wrap;
}

@page{
size:A4;
margin:20mm;
}
</style>

</head>

<body>
${content}
</body>
</html>
`);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div className="builder-page">
            <div className="builder-container">

                <button
                    className="back-btn"
                    onClick={back}
                >
                    ← Back
                </button>

                <button
                    className="builder-btn"
                    style={{ marginTop: "10px", background: "#7c3aed" }}
                    onClick={goMarketplace}
                >
                    📚 Open Marketplace
                </button>

                <h1>AI Contract Builder</h1>

                <p>
                    Create professional contracts using AI and legal clauses.
                </p>

                <div className="builder-grid">

                    <input
                        name="partyOne"
                        placeholder="Party One"
                        value={form.partyOne}
                        onChange={handleChange}
                    />

                    <input
                        name="partyTwo"
                        placeholder="Party Two"
                        value={form.partyTwo}
                        onChange={handleChange}
                    />

                    <select
                        name="contractType"
                        value={form.contractType}
                        onChange={handleChange}
                    >
                        <option value="">Select Contract</option>
                        <option>Employment Contract</option>
                        <option>Rental Agreement</option>
                        <option>NDA</option>
                        <option>Freelance Agreement</option>
                        <option>Service Agreement</option>
                    </select>

                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                    />

                    <input
                        name="payment"
                        placeholder="Payment Details"
                        value={form.payment}
                        onChange={handleChange}
                    />

                </div>

                <textarea
                    name="description"
                    rows="10"
                    placeholder="Agreement details or add clauses from marketplace..."
                    value={form.description}
                    onChange={handleChange}
                />

                <button
                    className="generate-btn"
                    onClick={generateContract}
                >
                    {loading ? "Generating..." : "Generate Contract"}
                </button>

                {contract && (
                    <div className="generated-contract">

                        <h2>Generated Contract</h2>

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                marginBottom: "20px"
                            }}
                        >

                            <button
                                className="builder-btn"
                                style={{
                                    width: "220px",
                                    background: "#f59e0b"
                                }}
                                onClick={() => openEditor(contract)}
                            >
                                ✏ Live Editor
                            </button>

                            <button
                                className="builder-btn"
                                style={{
                                    width: "220px",
                                    background: "#2563eb"
                                }}
                                onClick={downloadWord}
                            >
                                📄 Download Word
                            </button>

                            <button
                                className="builder-btn"
                                style={{
                                    width: "180px",
                                    background: "#16a34a"
                                }}
                                onClick={printContract}
                            >
                                🖨 Print
                            </button>

                        </div>

                        <div
                            id="contract-preview"
                            className="contract-view"
                        >
                            <ReactMarkdown>
                                {contract}
                            </ReactMarkdown>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default Builder;