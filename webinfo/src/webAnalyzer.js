// WebsiteAnalyzer.js
import React, { useState } from 'react';
import axios from 'axios';


const WebsiteAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const analyzeWebsite = async () => {
    try {
      // Fetch the HTML content of the specified URL from the backend
      const response = await axios.get(`/fetch-html?url=${encodeURIComponent(url)}`);
      const html = response.data;

      const techDetails = {};

      // CMS Detection
      if (html.includes("wp-content")) techDetails.cms = "WordPress";
      else if (html.includes("drupal")) techDetails.cms = "Drupal";
      else if (html.includes("Joomla")) techDetails.cms = "Joomla";
      else if (html.includes("ghost")) techDetails.cms = "Ghost";
      else if (html.includes("squarespace")) techDetails.cms = "Squarespace";
      else if (html.includes("wix.com")) techDetails.cms = "Wix";

      // CSS Framework Detection
      if (html.includes("bootstrap.min.css")) techDetails.cssFramework = "Bootstrap";
      if (html.includes("tailwind.min.css")) techDetails.cssFramework = "Tailwind CSS";
      if (html.includes("foundation.min.css")) techDetails.cssFramework = "Foundation";
      if (html.includes("bulma.css")) techDetails.cssFramework = "Bulma";
      if (html.includes("semantic.min.css")) techDetails.cssFramework = "Semantic UI";

      // JavaScript Library Detection
      if (html.includes("React")) techDetails.frontendLibrary = "React";
      if (html.includes("Vue")) techDetails.frontendLibrary = "Vue.js";
      if (html.includes("angular.js")) techDetails.frontendLibrary = "AngularJS";
      if (html.includes("jquery.min.js")) techDetails.jsLibrary = "jQuery";
      if (html.includes("three.min.js")) techDetails.jsLibrary = "Three.js";
      if (html.includes("chart.min.js")) techDetails.jsLibrary = "Chart.js";
      if (html.includes("d3.min.js")) techDetails.jsLibrary = "D3.js";
      if (html.includes("lodash.min.js")) techDetails.jsLibrary = "Lodash";

      // Analytics and Tracking Detection
      if (html.includes("google-analytics.com/analytics.js")) techDetails.analytics = "Google Analytics";
      if (html.includes("connect.facebook.net/en_US/fbevents.js")) techDetails.analytics = "Facebook Pixel";
      if (html.includes("static.hotjar.com")) techDetails.analytics = "Hotjar";
      if (html.includes("www.googletagmanager.com/gtm.js")) techDetails.analytics = "Google Tag Manager";
      if (html.includes("segment.com")) techDetails.analytics = "Segment";

      // CDN Detection
      if (html.includes("cdn.cloudflare.com")) techDetails.cdn = "Cloudflare";
      if (html.includes("akamai")) techDetails.cdn = "Akamai";
      if (html.includes("stackpath.bootstrapcdn.com")) techDetails.cdn = "StackPath";
      if (html.includes("maxcdn.bootstrapcdn.com")) techDetails.cdn = "MaxCDN";
      if (html.includes("jsdelivr.net")) techDetails.cdn = "jsDelivr";

      // E-commerce Platform Detection
      if (html.includes("cdn.shopify.com")) techDetails.ecommercePlatform = "Shopify";
      if (html.includes("woocommerce")) techDetails.ecommercePlatform = "WooCommerce";
      if (html.includes("bigcommerce")) techDetails.ecommercePlatform = "BigCommerce";
      if (html.includes("magento")) techDetails.ecommercePlatform = "Magento";
      if (html.includes("prestashop")) techDetails.ecommercePlatform = "PrestaShop";

      // Email Marketing Platform Detection
      if (html.includes("list-manage.com")) techDetails.emailMarketing = "Mailchimp";
      if (html.includes("hubspot.com")) techDetails.emailMarketing = "HubSpot";
      if (html.includes("marketo")) techDetails.emailMarketing = "Marketo";
      if (html.includes("pardot")) techDetails.emailMarketing = "Pardot";

      // Hosting Platform Detection
      if (response.headers.server?.includes("Netlify")) techDetails.hostingProvider = "Netlify";
      if (html.includes("amazonaws.com")) techDetails.hostingProvider = "Amazon Web Services";
      if (html.includes("azurewebsites.net")) techDetails.hostingProvider = "Microsoft Azure";
      if (html.includes("herokuapp.com")) techDetails.hostingProvider = "Heroku";

      // Server Detection from Headers (if available)
      techDetails.server = response.headers.server || "Unknown";

      // Programming Language or Backend Framework Detection via Cookies and Headers
      if (response.headers["x-powered-by"]?.includes("PHP") || html.includes("PHPSESSID")) techDetails.backendLanguage = "PHP";
      if (response.headers["x-powered-by"]?.includes("Express") || response.headers["x-powered-by"]?.includes("Node.js")) techDetails.backendFramework = "Node.js (Express)";
      if (response.headers["x-powered-by"]?.includes("ASP.NET") || html.includes("ASP.NET_SessionId")) techDetails.backendFramework = "ASP.NET";
      if (html.includes("rails") || html.includes("turbo-links")) techDetails.backendFramework = "Ruby on Rails";
      if (response.headers["x-powered-by"]?.includes("Django")) techDetails.backendFramework = "Django";
      if (response.headers["x-powered-by"]?.includes("Flask")) techDetails.backendFramework = "Flask";

      // Security Headers Detection
      if (response.headers["content-security-policy"]) techDetails.securityHeaders = "Content Security Policy (CSP)";
      if (response.headers["x-frame-options"]) techDetails.securityHeaders = "X-Frame-Options";
      if (response.headers["strict-transport-security"]) techDetails.securityHeaders = "Strict-Transport-Security (HSTS)";
      if (response.headers["x-content-type-options"]) techDetails.securityHeaders = "X-Content-Type-Options";

      setResult(techDetails);
    } catch (error) {
      console.error("Error fetching or analyzing website HTML:", error);
    }
  };

  return (
    <div>
      <h2>Website Technology Analyzer</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
      />
      <button onClick={analyzeWebsite}>Analyze</button>

      {result && (
        <div>
          <h3>Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WebsiteAnalyzer;
