import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  const store = getStore("clicks");
  const { asin, country } = req.body;

  await store.set(`${asin}-${Date.now()}`, {
    asin,
    country,
    time: new Date().toISOString()
  });

  res.status(200).json({ ok: true });
}
