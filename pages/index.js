import { useState } from "react";

export default function Home() {
  const [asin, setAsin] = useState("");
  const [show, setShow] = useState(false);

  const image =
    asin && `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX300_.jpg`;

  const shareUrl =
    asin && `https://affiliate-marketing-nb.netlify.app/p/${asin}`;

  function generate() {
    if (asin.length !== 10) {
      alert("Enter valid 10-character ASIN");
      return;
    }
    setShow(true);
  }

  return (
    <div style={styles.container}>
      <h2>Amazon Affiliate Generator</h2>

      <input
        placeholder="Enter ASIN (Example: B00HUJQIZK)"
        value={asin}
        onChange={(e) => setAsin(e.target.value.trim())}
        style={styles.input}
      />

      <button onClick={generate} style={styles.button}>
        Generate
      </button>

      {show && (
        <div style={styles.card}>
          <img src={image} style={{ maxWidth: "100%" }} />
          <p>Share this product or buy on Amazon</p>

          <a href={shareUrl} target="_blank" style={styles.link}>
            🔗 Open Share / Buy Page
          </a>
        </div>
      )}

      <p style={styles.note}>
        Disclosure: As an Amazon Associate I earn from qualifying purchases.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    fontFamily: "Arial",
    textAlign: "center"
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    marginBottom: 10
  },
  button: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    background: "#ff9900",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  },
  card: {
    marginTop: 20,
    border: "1px solid #ddd",
    padding: 15,
    borderRadius: 6
  },
  link: {
    display: "inline-block",
    marginTop: 10,
    padding: 12,
    background: "#ff9900",
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold"
  },
  note: {
    fontSize: 12,
    color: "#555",
    marginTop: 20
  }
};
