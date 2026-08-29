function Dashboard({ analysis, reset, openBuilder, openMarketplace, openEditor}) {
  if (!analysis) return null;

  const getRiskColor = (level) => {
    switch ((level || "").toLowerCase()) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#22c55e";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Contract Analysis</h1>

        <button className="new-btn" onClick={reset}>
          Analyze Another Contract
        </button>
        <button
    className="new-btn"
    onClick={() => {
        console.log(analysis);
        console.log(analysis.contract_text);
        openEditor(analysis.contract_text);
    }}
>
    ✏ Live Editor
</button>
      </div>

      <div className="top-grid">

        <div className="card">

          <h3>Contract Type</h3>

          <p className="big-text">
            {analysis.contract_type || "Unknown"}
          </p>

        </div>

        <div className="card">

          <h3>Risk Level</h3>

          <p
            className="big-text"
            style={{
              color: getRiskColor(analysis.risk_level),
            }}
          >
            {analysis.risk_level || "Unknown"}
          </p>

        </div>

        <div className="card score-card">

          <h3>Risk Score</h3>

          <div className="score-circle">
            {analysis.risk_score ?? 0}
          </div>

        </div>

      </div>

      <div className="card">

        <h2>Summary</h2>

        <p className="summary">
          {analysis.summary || "No summary available."}
        </p>

      </div>

      <div className="grid-two">

        <div className="card">

          <h2>Missing Clauses</h2>

          {analysis.missing_clauses &&
          analysis.missing_clauses.length > 0 ? (
            <ul>

              {analysis.missing_clauses.map((item, index) => (
                <li key={index}>
                  ❌ {item}
                </li>
              ))}

            </ul>
          ) : (
            <p>No missing clauses.</p>
          )}

        </div>

        <div className="card">

          <h2>Recommendations</h2>

          {analysis.recommendations &&
          analysis.recommendations.length > 0 ? (
            <ul>

              {analysis.recommendations.map((item, index) => (
                <li key={index}>
                  ✅ {item}
                </li>
              ))}

            </ul>
          ) : (
            <p>No recommendations.</p>
          )}

        </div>

      </div>

      <div className="card">

        <h2>Extracted Clauses</h2>

        {analysis.clauses && analysis.clauses.length > 0 ? (

          <div className="clauses">

            {analysis.clauses.map((clause, index) => (
              <div className="clause-box" key={index}>

                {typeof clause === "string" ? (
                  <p>{clause}</p>
                ) : (
                  <>
                    <h4>{clause.title}</h4>
                    <p>{clause.description}</p>
                  </>
                )}

              </div>
            ))}

          </div>

        ) : (
          <p>No clauses extracted.</p>
        )}

      </div>

    </div>
  );
}

export default Dashboard;