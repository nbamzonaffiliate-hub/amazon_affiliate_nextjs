import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  try {
    const store = getStore("products");

    const result = await store.list();

    const items = [];

    // ✅ FIX: iterate result.blobs
    if (result && Array.isArray(result.blobs)) {
      for (const blob of result.blobs) {
        const value = await store.get(blob.key);
        if (value) {
          items.push(JSON.parse(value));
        }
      }
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
