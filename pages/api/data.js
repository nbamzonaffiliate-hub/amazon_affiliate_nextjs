import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  try {
    const store = getStore("products");

    const keys = await store.list();
    const items = [];

    for (const key of keys) {
      const value = await store.get(key);
      items.push(JSON.parse(value));
    }

    res.status(200).json(items);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}
