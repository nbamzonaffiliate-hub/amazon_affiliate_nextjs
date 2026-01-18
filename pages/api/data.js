import { getStore } from "@netlify/blobs";

export default async function handler(req, res) {
  const products = [];
  const clicks = [];

  const pStore = getStore("products");
  const cStore = getStore("clicks");

  for await (const key of pStore.list()) {
    products.push(await pStore.get(key));
  }

  for await (const key of cStore.list()) {
    clicks.push(await cStore.get(key));
  }

  res.status(200).json({ products, clicks });
}
