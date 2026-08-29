import { useState } from "react";
import clauses from "./clauses";

function Marketplace({ back, selectClause }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const categories = [
        "All",
        "General",
        "Legal",
        "Finance",
        "Employment",
        "Rental",
        "Technology",
        "Business",
        "Vendor",
        "Risk"
    ];

    const filteredClauses = clauses.filter((clause) => {
        const matchSearch =
            clause.title.toLowerCase().includes(search.toLowerCase()) ||
            clause.text.toLowerCase().includes(search.toLowerCase());

        const matchCategory =
            category === "All" ||
            clause.category === category;

        return matchSearch && matchCategory;
    });

    return (
        <div className="marketplace-page">
            <div className="marketplace-container">

                <div className="market-header-card">
                    <div>
                        <h1>📚 Clause Marketplace</h1>
                        <p>
                            Browse professionally written legal clauses and
                            insert them directly into your contract.
                        </p>
                    </div>

                    <button
                        className="back-btn"
                        onClick={back}
                    >
                        ← Back
                    </button>
                </div>

                <div className="market-filter-card">
                    <div className="market-search">
                        <label>Search Clauses</label>

                        <input
                            type="text"
                            placeholder="Search by title or keyword..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="market-category">
                        <label>Category</label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((cat, index) => (
                                <option key={index}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="market-results">
                    <h3>
                        {filteredClauses.length} Clause
                        {filteredClauses.length !== 1 ? "s" : ""} Found
                    </h3>

                    <span>
                        Category: {category}
                    </span>
                </div>

                <div className="clause-grid">
                    {filteredClauses.map((clause, index) => (
                        <div
                            className="market-card"
                            key={index}
                        >
                            <div className="market-header">
                                <h3>{clause.title}</h3>

                                <span className="category-badge">
                                    {clause.category}
                                </span>
                            </div>

                            <div className="clause-preview">
                                {clause.text}
                            </div>

                            <button
                                className="use-clause-btn"
                                onClick={() => selectClause(clause.text)}
                            >
                                ➕ Add to Contract
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Marketplace;