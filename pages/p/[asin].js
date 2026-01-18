import Head from "next/head";

export async function getServerSideProps({ params, req }) {
  const country =
    req.headers["x-country"] ||
    req.headers["x-vercel-ip-country"] ||
    "IN";

  return {
    props: {
      asin: params.asin,
      country
    }
  };
}

export default function Product({ asin, country }) {
  const image = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX300_.jpg`;

  const domains = {
    IN: "amazon.in",
    US: "amazon.com",
    GB: "amazon.co.uk"
  };

  const domain = domains[country] || "amazon.in";

  const amazon =
    `https://${domain}/dp/${asin}?tag=nbaffiliate0c-21`;

  return (
    <>
      <Head>
        <meta property="og:title" content="View Product on Amazon" />
        <meta property="og:description" content="Check details and buy securely" />
        <meta property="og:image" content={image} />
      </Head>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            fetch("/api/click", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ asin, country: "${country}" })
            });
            setTimeout(()=>{window.location.href="${amazon}"},500);
          `
        }}
      />
    </>
  );
}
