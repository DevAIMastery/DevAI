import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaDownload } from "react-icons/fa";

const ImageCompressor = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [imageSize, setImageSize] = useState({ initial: 0, final: 0 });
  const [compressionPercentage, setCompressionPercentage] = useState(100);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setImage(file);
    setImageSize({ initial: file.size, final: 0 });

    await compressImage(file, compressionPercentage);
  };

  const compressImage = async (file, percentage) => {
    const options = {
      maxSizeMB: 4,
      maxWidthOrHeight: 1920,
      initialQuality: percentage / 100,
    };

    try {
      const compressed = await imageCompression(file, options);
      setCompressedImage(URL.createObjectURL(compressed));
      setImageSize((prevState) => ({
        initial: file.size,
        final: compressed.size,
      }));
    } catch (error) {
      console.error("Error during image compression:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleQualityChange = async (event) => {
    const newCompressionPercentage = event.target.value;
    setCompressionPercentage(newCompressionPercentage);

    if (image) {
      await compressImage(image, newCompressionPercentage);
    }
  };

  const handleDownload = () => {
    if (compressedImage && image) {
      const originalName = image.name;
      const dotIndex = originalName.lastIndexOf(".");
      const nameWithoutExtension = originalName.substring(0, dotIndex);
      const extension = originalName.substring(dotIndex);

      const compressedFileName = `${nameWithoutExtension}_compressed${extension}`;

      const link = document.createElement("a");
      link.href = compressedImage;
      link.download = compressedFileName;
      link.click();
    }
  };

  const handleUploadAnother = () => {
    setImage(null);
    setCompressedImage(null);
    setImageSize({ initial: 0, final: 0 });
    setCompressionPercentage(100);
  };

  return (
    <div className="image-compressor">
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #007bff",
          padding: "20px",
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "20px",
          maxWidth: "500px",
          margin: "auto",
          display: image ? "none" : "block",
        }}
      >
        <input {...getInputProps()} />
        <div>
          <FaUpload size={40} color="#007bff" />
          <p>Drag and drop an image here, or click to select one</p>
        </div>
      </div>

      {/* Upload Another Image Button */}
      {compressedImage && (
        <div style={{ textAlign: "center", marginTop: "20px" , marginBottom: "20px"}}>
          <button
            onClick={handleUploadAnother}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              fontSize: "16px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.3s ease",
              maxWidth: "300px",
              margin: "auto",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            <FaUpload /> Upload Another Image
          </button>
        </div>
      )}

      {/* Image Preview Section */}
      {image && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            justifyItems: "center",
            margin: "auto",
            maxWidth: "500px",
            marginTop: compressedImage ? "20px" : "0px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Initial"
              width="100%"
              style={{
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <p>Original Size: <b>{(imageSize.initial / 1024).toFixed(2)} KB</b></p>
          </div>

          {compressedImage && (
            <div style={{ textAlign: "center" }}>
              <img
                src={compressedImage}
                alt="Compressed"
                width="100%"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
              <p>Compressed Size: <b>{(imageSize.final / 1024).toFixed(2)} KB</b></p>
            </div>
          )}
        </div>
      )}

      {/* Adjust Quality Slider */}
      {image && (
        <div style={{ textAlign: "center", marginTop: "20px", maxWidth: "300px", margin: "auto" }}>
          <label>Adjust Compression: <b>{(Math.round(compressionPercentage * 100) / 100)}%</b></label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={compressionPercentage}
            onChange={handleQualityChange}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {/* Download Button */}
      {compressedImage && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "background-color 0.3s ease",
              maxWidth: "300px",
              margin: "auto",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            <FaDownload /> Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
