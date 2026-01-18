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
            <div style={styles.header}>
                <h2>📣 Share Products</h2>
            </div>
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
            <button
                style={{
                    ...styles.pageBtn,
                    ...(page === 1 ? styles.disabled : {}),
                }}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                ◀ Prev
            </button>

            <button
                style={{
                    ...styles.pageBtn,
                    ...(page === totalPages ? styles.disabled : {}),
                }}
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next ▶
            </button>


            <p style={styles.note}>
                Disclosure: As an Amazon Associate I earn from qualifying purchases.
            </p>
        </div>
    );
}

cconst styles = {
    container: {
        maxWidth: 900,
        margin: "30px auto",
        padding: "0 16px",
        fontFamily: "Inter, Arial, sans-serif",
    },

    header: {
        display: "flex",
        alignItems: "center",
        gap: 10,
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
        borderRadius: 8,
        background: "#fafafa",
        padding: 8,
    },

    asin: {
        fontSize: 18,
        fontWeight: 600,
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
        fontSize: 14,
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        fontWeight: 500,
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
