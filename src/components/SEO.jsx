import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical, image }) => {
  const siteUrl = "https://portfolio-5o7s2occz-vedant-patels-projects-856b225a.vercel.app/";
  const defaultTitle = "Vedant Patel | MERN Stack Developer";
  const defaultDescription = "Professional portfolio of Vedant Patel, a MERN Stack Developer specializing in React, Node.js, and modern web solutions.";
  
  const seoTitle = title ? `${title} | Vedant Patel` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoUrl = canonical || siteUrl;
  const seoImage = image || `${siteUrl}vedant_patel_brand.webp`;

  return (
    <Helmet>
      {/* Standard metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;
