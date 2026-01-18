import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [asin, setAsin] = useState("");
  const [title, setTitle] = useState("");
  const [manualImage, setManualImage] = useState("");
  const [imageOk, setImageOk] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function extractASIN(input) {
    const match = input.match(/\/(dp|gp\/product)\/([A-Z0-9]{10})/);
    return match ? match[2] : null;
  }

  function handleExtract() {
    const result = extractASIN(url.trim());
    if (!result) {
      setError("Invalid Amazon product URL");
      return;
    }
    setAsin(result);
    setError("");
    setImageOk(true);
    setSaved(false);
  }

  const autoImage =
    asin && `https://m.media-amazon.com/images/P/${asin}.01._SX300_.jpg`;

  const finalImage = imageOk ? autoImage : manualImage;

  async function saveProduct() {
    if (!title || !finalImage) {
      alert("Title and Image are required");
      return;
    }

    await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        asin,
        title,
        image: finalImage,
      }),
    });

    setSaved(true);
  }

  return (
    <div style={styles.container}>
      <h2>Amazon Product Creator</h2>

      <input
        placeholder="Paste Amazon product URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleExtract} style={styles.button}>
        Extract Product
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {asin && (
        <div style={styles.card}>
          <strong>ASIN:</strong>
          <div style={styles.asin}>{asin}</div>

          <input
            placeholder="Enter Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <img
            src={finalImage}
            style={styles.image}
            onError={() => setImageOk(false)}
          />

          {!imageOk && (
            <input
              placeholder="Paste Image URL manually"
              value={manualImage}
              onChange={(e) => setManualImage(e.target.value)}
              style={styles.input}
            />
          )}

          <button onClick={saveProduct} style={styles.saveBtn}>
            💾 Save Product
          </button>

          {saved && <p style={styles.success}>✅ Saved Successfully</p>}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    fontFamily: "Arial",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    fontSize: 15,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#ff9900",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  saveBtn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#28a745",
    color: "#fff",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  card: {
    marginTop: 20,
    border: "1px solid #ddd",
    padding: 15,
    borderRadius: 8,
  },
  asin: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    maxWidth: "100%",
    marginBottom: 10,
    borderRadius: 6,
  },
  success: {
    color: "green",
    marginTop: 10,
  },
  error: {
    color: "red",
  },
};
