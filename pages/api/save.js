import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  const store = getStore("products");
  const { asin, image, link } = req.body;

  await store.set(asin, {
    asin,
    image,
    link,
    date: new Date().toISOString()
  });

  res.status(200).json({ success: true });
}
