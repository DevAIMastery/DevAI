import React, { useState } from 'react';

const WebContentExtractor = () => {
  const [url, setUrl] = useState('');
  const [metaData, setMetaData] = useState({});
  const [assets, setAssets] = useState([]);
  const [textContent, setTextContent] = useState('');

  const handleExtract = async () => {
    if (!url) return;

    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      const htmlText = await response.text();

      // Create a DOMParser to parse the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Extract meta data
      const metaTags = doc.getElementsByTagName('meta');
      const metaInfo = {};
      Array.from(metaTags).forEach(tag => {
        const name = tag.getAttribute('name') || tag.getAttribute('property');
        if (name) {
          metaInfo[name] = tag.getAttribute('content');
        }
      });
      setMetaData(metaInfo);

      // Extract assets (images, stylesheets, etc.)
      const imageTags = doc.getElementsByTagName('img');
      const imageAssets = Array.from(imageTags).map(img => img.src);
      setAssets(imageAssets);

      // Extract all text content
      const text = doc.body.textContent || '';
      setTextContent(text);
    } catch (error) {
      console.error('Error extracting content:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
      />
      <button onClick={handleExtract}>Extract Content</button>

      <div>
        <h3>Meta Data:</h3>
        <pre>{JSON.stringify(metaData, null, 2)}</pre>
      </div>

      <div>
        <h3>Assets (Images):</h3>
        <ul>
          {assets.map((asset, index) => (
            <li key={index}>
              <img src={asset} alt={`asset-${index}`} width="100" />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Text Content:</h3>
        <pre>{textContent}</pre>
      </div>
    </div>
  );
};

export default WebContentExtractor;
