import { useEffect, useState } from "react";

export default function SharePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((data) => {
        const today = new Date().toISOString().slice(0, 10);
        const todaysProducts = data.filter(p => p.date === today);
        setProducts(todaysProducts);
      });
  }, []);

  function shareLinks(p) {
    const text = `Check this product on Amazon 👇\n${p.link}`;

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(p.link)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(p.link)}&text=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    };
  }

  return (
    <div style={styles.container}>
      <h2>📢 Today’s Share Products</h2>

      {products.length === 0 && <p>No products added today</p>}

      {products.map((p) => {
        const links = shareLinks(p);

        return (
          <div key={p.asin} style={styles.card}>
            <img src={p.image} style={styles.image} />

            <h3>{p.asin}</h3>

            <div style={styles.buttons}>
              <a href={links.whatsapp} target="_blank">WhatsApp</a>
              <a href={links.facebook} target="_blank">Facebook</a>
              <a href={links.telegram} target="_blank">Telegram</a>
              <a href={links.twitter} target="_blank">Twitter</a>
            </div>
          </div>
        );
      })}

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
    textAlign: "center"
  },

  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    background: "#fff",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
  },

  image: {
    width: 120,
    marginBottom: 10
  },

  buttons: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap"
  },

  note: {
    fontSize: 12,
    color: "#555",
    marginTop: 30
  }
};
