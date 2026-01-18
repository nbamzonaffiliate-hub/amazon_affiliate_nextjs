import { useEffect, useState } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(setProducts)
      .catch(err => {
        console.error(err);
        setError("Failed to load data");
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length === 0 && !error && <p>No products saved yet</p>}

      {products.map(p => (
        <div key={p.asin} style={{ marginBottom: 20 }}>
          <img src={p.image} width="120" />
          <p>{p.asin}</p>
          <a href={p.link} target="_blank">Amazon Link</a>
        </div>
      ))}
    </div>
  );
}
