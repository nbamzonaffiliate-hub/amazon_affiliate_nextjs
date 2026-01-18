import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [asin, setAsin] = useState("");
  const [error, setError] = useState("");

  function extractASIN(input) {
    const match = input.match(/\/(dp|gp\/product)\/([A-Z0-9]{10})/);
    return match ? match[2] : null;
  }

  function handleExtract() {
    const result = extractASIN(url.trim());

    if (!result) {
      setError("Invalid Amazon product URL");
      setAsin("");
      return;
    }

    setAsin(result);
    setError("");
  }

  return (
    <div style={styles.container}>
      <h2>Amazon Product ID Extractor</h2>

      <input
        placeholder="Paste Amazon product URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleExtract} style={styles.button}>
        Get Product ID
      </button>

      {asin && (
        <div style={styles.result}>
          <strong>Product ID (ASIN):</strong>
          <div style={styles.asin}>{asin}</div>

          <img
            src={`https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX300_.jpg`}
            alt={asin}
            style={styles.image}
          />
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: 600,
    margin: "50px auto",
    padding: 20,
    fontFamily: "Arial",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    background: "#ff9900",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  result: {
    marginTop: 20,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 6,
  },
  asin: {
    fontSize: 20,
    fontWeight: "bold",
    margin: "10px 0",
  },
  image: {
    maxWidth: "100%",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
};
