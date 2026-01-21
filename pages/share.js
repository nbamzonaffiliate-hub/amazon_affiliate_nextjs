import { useEffect, useState } from "react";

export default function SharePage() {
  const [products, setProducts] = useState([]);
  const [asinSearch, setAsinSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  // Fetch saved products
  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data.reverse());
        }
      })
      .catch(() => setProducts([]));
  }, []);

  // Filters
  const filtered = products.filter((p) => {
    if (asinSearch && !p.asin.includes(asinSearch)) return false;
    if (dateFilter && p.date !== dateFilter) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = filtered.slice(start, start + PAGE_SIZE);

  function share(platform, asin) {
    const link = `//offerpulse.in/p/${asin}`;
    const text = `I found this useful product.\nBuy securely on Amazon 👇\n${link}`;
    const encoded = encodeURIComponent(text);

    let url = "";
    if (platform === "whatsapp") url = `https://wa.me/?text=${encoded}`;
    if (platform === "facebook")
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`;
    if (platform === "telegram")
      url = `https://t.me/share/url?url=${encodeURIComponent(
        link
      )}&text=${encoded}`;
    if (platform === "twitter")
      url = `https://twitter.com/intent/tweet?text=${encoded}`;

    window.open(url, "_blank");
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📣 Share Products</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          placeholder="Search ASIN"
          value={asinSearch}
          onChange={(e) => setAsinSearch(e.target.value)}
          style={styles.input}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Product Cards */}
      {current.map((p) => (
        <div key={p.asin} style={styles.card}>
          <img
            src={`https://images-na.ssl-images-amazon.com/images/P/${p.asin}.01._SX300_.jpg`}
            alt={p.asin}
            style={styles.image}
          />

          <div style={{ flex: 1 }}>
            <div style={styles.asin}>{p.asin}</div>
            <div style={styles.date}>{p.date}</div>

            <div style={styles.buttons}>
              <button
                style={{ ...styles.btn, ...styles.whatsapp }}
                onClick={() => share("whatsapp", p.asin)}
              >
                WhatsApp
              </button>
              <button
                style={{ ...styles.btn, ...styles.facebook }}
                onClick={() => share("facebook", p.asin)}
              >
                Facebook
              </button>
              <button
                style={{ ...styles.btn, ...styles.telegram }}
                onClick={() => share("telegram", p.asin)}
              >
                Telegram
              </button>
              <button
                style={{ ...styles.btn, ...styles.twitter }}
                onClick={() => share("twitter", p.asin)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            ...styles.pageBtn,
            ...(page === 1 ? styles.disabled : {}),
          }}
        >
          ◀ Prev
        </button>

        <div>
          Page {page} / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            ...styles.pageBtn,
            ...(page === totalPages ? styles.disabled : {}),
          }}
        >
          Next ▶
        </button>
      </div>

      <p style={styles.note}>
        Disclosure: As an Amazon Associate I earn from qualifying purchases.
      </p>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    maxWidth: 900,
    margin: "30px auto",
    padding: "0 16px",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    marginBottom: 20,
  },

  filters: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
  },

  input: {
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #ccc",
    minWidth: 180,
  },

  card: {
    display: "flex",
    gap: 20,
    padding: 18,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    marginBottom: 20,
    alignItems: "center",
  },

  image: {
    width: 110,
    height: 110,
    objectFit: "contain",
    background: "#fafafa",
    borderRadius: 8,
    padding: 8,
  },

  asin: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  date: {
    fontSize: 12,
    color: "#777",
    marginBottom: 10,
  },

  buttons: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  btn: {
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
  },

  whatsapp: { background: "#25D366", color: "#fff" },
  facebook: { background: "#1877F2", color: "#fff" },
  telegram: { background: "#229ED9", color: "#fff" },
  twitter: { background: "#000", color: "#fff" },

  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  pageBtn: {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },

  disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },

  note: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
    marginTop: 40,
  },
};
