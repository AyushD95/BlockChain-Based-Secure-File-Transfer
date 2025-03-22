import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import QRCode from "react-qr-code";

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filePreview, setFilePreview] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFilePreview(URL.createObjectURL(file)); // Preview before upload

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    axios.post("http://localhost:5000/api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percent);
      },
    })
    .then((res) => {
      setFileUrl(`https://ipfs.io/ipfs/${res.data.ipfsHash}`);
      setUploading(false);
    })
    .catch((error) => {
      console.error("Upload failed:", error);
      setUploading(false);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <div className="card w-full max-w-lg bg-white shadow-xl p-6">
        <h2 className="text-xl font-bold text-center mb-4">Upload Your File</h2>

        {/* Drag & Drop Section */}
        <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-10 text-center cursor-pointer bg-gray-50 rounded-lg hover:bg-gray-200">
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag & drop a file here, or click to select one</p>
        </div>

        {/* File Preview */}
        {filePreview && (
          <div className="mt-4 flex flex-col items-center">
            <span className="text-sm text-gray-500">File Preview:</span>
            <img src={filePreview} alt="Preview" className="w-40 h-40 object-contain border rounded mt-2" />
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-4 flex flex-col items-center">
            <span className="text-sm text-gray-500">Uploading: {progress}%</span>
            <progress className="progress progress-primary w-56" value={progress} max="100"></progress>
          </div>
        )}

        {/* Uploaded File Link */}
        {fileUrl && (
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">File Uploaded Successfully!</span>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline block mt-1">
              View File
            </a>

            {/* QR Code for Sharing */}
            <div className="mt-4">
              <span className="text-sm text-gray-500">Share via QR Code:</span>
              <QRCode value={fileUrl} className="mt-2" />
            </div>
          </div>
        )}

        {/* Upload Another Button */}
        <button className="btn btn-primary w-full mt-4" onClick={() => window.location.reload()}>
          Upload Another File
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
