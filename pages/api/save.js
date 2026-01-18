import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { asin, title, image } = req.body;

  if (!asin || !title || !image) {
    return res.status(400).json({ error: "Missing fields" });
  }

  let data = [];

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  data.unshift({
    asin,
    title,
    image,
    date: new Date().toISOString().slice(0, 10),
  });

  fs.writeFileSync(filePath, JSON.stringify(data.slice(0, 100), null, 2));

  res.status(200).json({ success: true });
}
