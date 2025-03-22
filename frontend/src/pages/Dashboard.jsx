import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/files/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center">Your Uploaded Files</h2>
      <div className="mt-4">
        {files.map((file) => (
          <div key={file._id} className="card bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <a href={`https://ipfs.io/ipfs/${file.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                {file.filename}
              </a>
              <QRCode value={`https://ipfs.io/ipfs/${file.ipfsHash}`} size={50} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
