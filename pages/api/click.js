import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const store = getStore("clicks");

    const { asin, country } = req.body;

    const key = `${asin}-${Date.now()}`;

    await store.set(
      key,
      JSON.stringify({
        asin,
        country,
        time: new Date().toISOString()
      })
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("CLICK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
