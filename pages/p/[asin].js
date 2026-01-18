import Head from "next/head";

export async function getServerSideProps({ params }) {
  return {
    props: {
      asin: params.asin
    }
  };
}

export default function Product({ asin }) {
  const image =
    `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SX300_.jpg`;

  const amazonLink =
    `https://www.amazon.in/dp/${asin}?tag=nbaffiliate0c-21`;

  return (
    <>
      <Head>
        <title>View Product on Amazon</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content="View Product on Amazon" />
        <meta
          property="og:description"
          content="Check details and buy securely on Amazon"
        />
        <meta property="og:image" content={image} />
      </Head>

      {/* Redirect user AFTER social preview loads */}
      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(()=>{window.location.href="${amazonLink}"},500);`
        }}
      />
    </>
  );
}
