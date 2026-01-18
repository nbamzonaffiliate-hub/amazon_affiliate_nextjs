import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 🔑 Get Netlify Blob Store
    const store = getStore("products");

    const { asin, image, link } = req.body;

    if (!asin) {
      return res.status(400).json({ error: "ASIN required" });
    }

    const data = {
      asin,
      image,
      link,
      createdAt: new Date().toISOString()
    };

    // ✅ Save using ASIN as key
    await store.set(asin, JSON.stringify(data));

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("SAVE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
