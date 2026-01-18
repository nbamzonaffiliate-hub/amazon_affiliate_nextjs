import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState({ products: [], clicks: [] });

  useEffect(() => {
    fetch("/api/data").then(r => r.json()).then(setData);
  }, []);

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Admin Dashboard</h2>

      <h3>Saved Products</h3>
      {data.products.map(p => (
        <div key={p.asin}>
          <img src={p.image} width="80" /> {p.asin}
        </div>
      ))}

      <h3>Clicks</h3>
      {data.clicks.map((c, i) => (
        <div key={i}>
          {c.asin} — {c.country} — {c.time}
        </div>
      ))}
    </div>
  );
}
