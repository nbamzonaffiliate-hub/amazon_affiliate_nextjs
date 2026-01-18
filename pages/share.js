import { useEffect, useState } from "react";

const PAGE_SIZE = 5;

export default function SharePage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [asinSearch, setAsinSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setProducts(list);
        setFiltered(list);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (asinSearch) {
      temp = temp.filter((p) =>
        p.asin.toLowerCase().includes(asinSearch.toLowerCase())
      );
    }

    if (dateFilter) {
      temp = temp.filter((p) => p.date === dateFilter);
    }

    setFiltered(temp);
    setPage(1);
  }, [asinSearch, dateFilter, products]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function caption(platform, asin) {
    const link = `https://affiliate-marketing-nb.netlify.app/p/${asin}`;

    if (platform === "whatsapp")
      return `I found this useful product 👇\n${link}`;
    if (platform === "facebook")
      return `Check this product on Amazon:\n${link}`;
    if (platform === "telegram")
      return `🔥 Amazon Deal\n${link}`;
    if (platform === "twitter")
      return `Useful Amazon product 👉 ${link}`;

    return link;
  }

  function share(platform, asin) {
    const text = encodeURIComponent(caption(platform, asin));

    let url = "";
    if (platform === "whatsapp") url = `https://wa.me/?text=${text}`;
    if (platform === "facebook")
      url = `https://www.facebook.com/sharer/sharer.php?u=https://affiliate-marketing-nb.netlify.app/p/${asin}`;
    if_toggle:
    if (platform === "telegram")
      url = `https://t.me/share/url?text=${text}`;
    if (platform === "twitter")
      url = `https://twitter.com/intent/tweet?text=${text}`;

    window.open(url, "_blank");
  }

  return (
    <div style={styles.container}>
      <h2>📢 Share Products</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          placeholder="Search ASIN"
          value={asinSearch}
          onChange={(e) => setAsinSearch(e.target.value)}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Product List */}
      {visible.map((p) => (
        <div key={p.asin} style={styles.card}>
          <img
            src={p.image}
            alt={p.asin}
            style={styles.image}
          />

          <div style={{ flex: 1 }}>
            <strong>{p.asin}</strong>
            <p style={styles.date}>{p.date}</p>

            <div style={styles.buttons}>
              <button onClick={() => share("whatsapp", p.asin)}>WhatsApp</button>
              <button onClick={() => share("facebook", p.asin)}>Facebook</button>
              <button onClick={() => share("telegram", p.asin)}>Telegram</button>
              <button onClick={() => share("twitter", p.asin)}>X</button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div style={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>

        <span>
          Page {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
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

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 20,
    fontFamily: "Arial",
  },
  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    display: "flex",
    gap: 15,
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 6,
    marginBottom: 15,
  },
  image: {
    width: 100,
    objectFit: "contain",
  },
  buttons: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 8,
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  note: {
    marginTop: 30,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
};
