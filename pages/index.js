import { useEffect, useState } from "react";

export default function Home() {
  const [asin, setAsin] = useState("");
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);

  const image =
    asin &&
    `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX300_.jpg`;

  const shareUrl =
    asin && `//offerpulse.in/p/${asin}`;

  // ✅ Load latest 10 products
  async function loadProducts() {
    try {
      const res = await fetch("/api/data");
      if (!res.ok) return;
      const data = await res.json();
      setProducts(data.slice(-10).reverse()); // latest 10
    } catch (err) {
      console.error("LOAD PRODUCTS ERROR", err);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function generate() {
    if (asin.length !== 10) {
      alert("Enter valid 10-character ASIN");
      return;
    }
    setShow(true);
  }

  // ✅ Save product THEN open buy page
  async function saveAndOpen() {
    try {
      await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asin,
          image,
          link: shareUrl
        })
      });

      await loadProducts();

      window.open(shareUrl, "_blank");
    } catch (err) {
      console.error("SAVE ERROR", err);
      window.open(shareUrl, "_blank"); // still open even if save fails
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amazon Affiliate Generator</h2>

      <input
        placeholder="Enter ASIN (Example: B00HUJQIZK)"
        value={asin}
        onChange={(e) => setAsin(e.target.value.trim().toUpperCase())}
        style={styles.input}
      />

      <button onClick={generate} style={styles.button}>
        Generate
      </button>

      {show && (
        <div style={styles.card}>
          <img src={image} style={{ maxWidth: "100%" }} />
          <p>Share this product or buy on Amazon</p>

          <button onClick={saveAndOpen} style={styles.link}>
            🔗 Open Share / Buy Page
          </button>
        </div>
      )}

      {/* ✅ Latest Products */}
      <h3 style={{ marginTop: 40 }}>Latest Products</h3>

{products.length === 0 && <p>No products yet</p>}

<div style={styles.grid}>
  {products.map((p) => (
    <div key={p.asin} style={styles.cardItem}>
      <img src={p.image} style={styles.productImage} />

      <div style={styles.cardContent}>
        <h4 style={styles.asin}>{p.asin}</h4>

        <a href={p.link} target="_blank" style={styles.viewBtn}>
          View on Amazon
        </a>
      </div>
    </div>
  ))}
</div>


      <p style={styles.note}>
        Disclosure: As an Amazon Associate I earn from qualifying purchases.
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
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
    fontWeight: "bold",
    borderRadius: 6
  },

  card: {
    marginTop: 20,
    border: "1px solid #eee",
    padding: 15,
    borderRadius: 8,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  link: {
    display: "inline-block",
    marginTop: 10,
    padding: "12px 18px",
    background: "#ff9900",
    borderRadius: 6,
    textDecoration: "none",
    color: "#000",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
    marginTop: 20
  },

  cardItem: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 16,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
  },

  productImage: {
    width: 90,
    height: "auto",
    objectFit: "contain"
  },

  cardContent: {
    textAlign: "left",
    flex: 1
  },

  asin: {
    margin: "0 0 8px",
    fontSize: 16,
    fontWeight: "bold"
  },

  viewBtn: {
    display: "inline-block",
    padding: "8px 14px",
    background: "#0073e6",
    color: "#fff",
    borderRadius: 5,
    textDecoration: "none",
    fontSize: 14
  },

  note: {
    fontSize: 12,
    color: "#555",
    marginTop: 30
  }
};
