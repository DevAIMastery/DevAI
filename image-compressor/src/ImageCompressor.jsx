import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaDownload } from "react-icons/fa";

const ImageCompressor = () => {
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [imageSize, setImageSize] = useState({ initial: 0, final: 0 });
  const [compressionPercentage, setCompressionPercentage] = useState(100);
  const [error, setError] = useState(""); // For displaying error messages

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check if the uploaded file is an image
    if (!["image/png", "image/svg+xml"].includes(file.type)) {
      setError("Please upload a valid image file (png or svg).");
      setImage(null);
      setCompressedImage(null);
      setImageSize({ initial: 0, final: 0 });
      return;
    }

    setError(""); // Clear any previous error messages
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
    setError(""); // Clear error message on reset
  };

  return (
    <div className="image-compressor" style={{ fontFamily: "'Arial', sans-serif", padding: "20px", maxWidth: "700px", margin: "auto", borderRadius: "10px", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}>
    
      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {error}
        </div>
      )}
      {!image && (

        
        
  <div
    {...getRootProps()}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: "30px",
      border: "2px dashed #ccc",
      borderRadius: "8px",
      transition: "border-color 0.2s ease-out",
      "&:hover": {
        borderColor: "#999",
      },
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eef3f9")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f7f9fc")}
  >
    
    <h3>Upload Image to Compress</h3>
    <input {...getInputProps()} />
    <FaUpload size={60} color="#073653" />
    <p style={{ fontSize: "16px", color: "#333" }}>
      Drag and drop an image here, or click to select one
    </p>
  </div>
)}

        

      {compressedImage && (
        <button
          onClick={handleUploadAnother}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            fontSize: "16px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            maxWidth: "300px",
            margin: "20px auto",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          <FaUpload /> Upload Another Image
        </button>
      )}

      {image && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            margin: "20px 0",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f7f9fc",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Original"
              width="100%"
              style={{
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                maxWidth: "200px",
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
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  maxWidth: "200px",
                }}
              />
              <p>Compressed Size: <b>{(imageSize.final / 1024).toFixed(2)} KB</b></p>
            </div>
          )}
        </div>
      )}

      {image && (
        <div style={{ textAlign: "center", marginTop: "20px", maxWidth: "300px", margin: "auto" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            Adjust Compression: <b>{compressionPercentage}%</b>
          </label>
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

      {compressedImage && (
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            maxWidth: "300px",
            margin: "20px auto",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          <FaDownload /> Download Compressed Image
        </button>
      )}
    </div>
  );
};

export default ImageCompressor;
