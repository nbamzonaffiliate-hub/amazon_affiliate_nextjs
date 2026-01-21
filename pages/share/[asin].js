import Head from "next/head";

export async function getServerSideProps({ params }) {
  return { props: { asin: params.asin } };
}

export default function Share({ asin }) {
  const image = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX300_.jpg`;
  const link = `//offerpulse.in/p/${asin}`;

  const text = `I found this useful product.
Check details and buy securely 👇
${link}`;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center", fontFamily: "Arial" }}>
      <Head>
        <title>Share Product</title>
      </Head>

      <img src={image} style={{ maxWidth: "100%" }} />
      <h3>Share this product</h3>

      <a href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank">WhatsApp</a><br/><br/>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} target="_blank">Facebook</a><br/><br/>
      <a href={`https://t.me/share/url?url=${link}&text=${encodeURIComponent(text)}`} target="_blank">Telegram</a><br/><br/>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`} target="_blank">Twitter (X)</a>
    </div>
  );
}
