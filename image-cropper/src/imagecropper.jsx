import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiDownload, FiCrop } from "react-icons/fi";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = () => {
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [croppedDimensions, setCroppedDimensions] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(""); // Error message state

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        setImage(null);
        setCroppedImage(null);
        setOriginalDimensions({ width: 0, height: 0 });
        setCroppedDimensions({ width: 0, height: 0 });
        return;
      }

      setError(""); // Clear any previous error message
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      setCroppedImage(croppedCanvas.toDataURL());
      setCroppedDimensions({
        width: croppedCanvas.width,
        height: croppedCanvas.height,
      });
    }
  };

  const handleCropperReady = () => {
    const cropper = cropperRef.current.cropper;
    if (cropper) {
      const imageData = cropper.getImageData();
      setOriginalDimensions({
        width: Math.round(imageData.naturalWidth),
        height: Math.round(imageData.naturalHeight),
      });
    }
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = croppedImage;
    a.download = "cropped-image.png";
    a.click();
  };

  const handleUploadAnother = () => {
    setImage(null);
    setCroppedImage(null);
    setOriginalDimensions({ width: 0, height: 0 });
    setCroppedDimensions({ width: 0, height: 0 });
    setError(""); // Clear error on new upload
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f4f7fc",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {error && (
        <div style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {!image && (
        <h4 style={{ color: "#333", fontSize: "22px", margin: "0px" }}>
          Upload Image to Crop
        </h4>
      )}

      {image && (
        <button
          onClick={handleUploadAnother}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            backgroundColor: "#ff4c4c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <FiUpload style={{ marginRight: "8px" }} />
          Upload Another Image
        </button>
      )}

      {!image && (
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #ddd",
            padding: "40px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <input {...getInputProps()} />
          <FiUpload style={{ fontSize: "60px", color: "#888", marginBottom: "15px" }} />
          <p style={{ color: "#888", fontSize: "16px", fontWeight: "bold" }}>
            Drag & drop an image here, or click to select a file
          </p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {image && (
          <div
            style={{
              flex: 1,
              maxWidth: "400px",
              height: "400px",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Cropper
              src={image}
              style={{ height: "100%", width: "100%" }}
              guides={true}
              ref={cropperRef}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={handleCropperReady}
            />
          </div>
        )}
        {croppedImage && (
          <div
            style={{
              flex: 1,
              maxWidth: "400px",
              height: "400px",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={croppedImage}
              alt="Cropped"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>

      {/* Buttons Below the Containers */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {image && (
          <button
            onClick={handleCrop}
            style={{
              padding: "12px 25px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <FiCrop style={{ marginRight: "8px" }} />
            Crop
          </button>
        )}

        {croppedImage && (
          <button
            onClick={handleDownload}
            style={{
              padding: "12px 25px",
              backgroundColor: "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <FiDownload style={{ marginRight: "8px" }} />
            Download Cropped Image
          </button>
        )}
      </div>

      {originalDimensions.width > 0 && originalDimensions.height > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#333", fontWeight: "bold" }}>Original Dimensions:</h3>
          <p style={{ color: "#888", fontSize: "16px" }}>
            Width: {originalDimensions.width}px
          </p>
          <p style={{ color: "#888", fontSize: "16px" }}>
            Height: {originalDimensions.height}px
          </p>
        </div>
      )}
      {croppedDimensions.width > 0 && croppedDimensions.height > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#333", fontWeight: "bold" }}>Cropped Dimensions:</h3>
          <p style={{ color: "#888", fontSize: "16px" }}>
            Width: {croppedDimensions.width}px
          </p>
          <p style={{ color: "#888", fontSize: "16px" }}>
            Height: {croppedDimensions.height}px
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
