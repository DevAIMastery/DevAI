import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTrashAlt, FaDownload, FaEraser } from 'react-icons/fa';

const BackgroundRemover = () => {
  const [image, setImage] = useState(null);
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
    setIsBackgroundRemoved(false);
  };

  const handleRemoveBackground = () => {
    setIsBackgroundRemoved(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'image-no-bg.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setIsBackgroundRemoved(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  return (
    <div style={styles.container}>
      
      {!image && (
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          <FaUpload style={styles.uploadIcon} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
      )}

      {image && (
        <div style={styles.imageContainer}>
          <div
            style={{
              ...styles.imageWrapper,
              backgroundColor: isBackgroundRemoved ? 'white' : 'transparent',
            }}
          >
            <img src={image} alt="Uploaded" style={styles.image} />
          </div>

          <div style={styles.buttonContainer}>
            <button onClick={handleRemoveBackground} style={styles.button}>
              <FaEraser style={styles.icon} />
              Remove Background
            </button>
            <button onClick={handleDownload} style={styles.button}>
              <FaDownload style={styles.icon} />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '60vh',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '500px',
    margin: '0 auto',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  dropzone: {
    border: '2px dashed #ccc',
    borderRadius: '10px',
    padding: '30px',
    textAlign: 'center',
    color: '#666',
    cursor: 'pointer',
    width: '80%',
    marginBottom: '20px',
  },
  uploadIcon: {
    fontSize: '40px',
    color: '#007bff',
    marginBottom: '10px',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100%',
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    overflow: 'hidden',
    padding: '10px',
    maxWidth: '100%',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '20px',
  },
};

export default BackgroundRemover;
