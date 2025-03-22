import {Router} from "express"
import multer from "multer";
import { create } from "ipfs-http-client";
import File  from "../model/File.js";
import { checkAuthToken } from "../middleware/auth.js";

const router=Router()
const upload = multer({ dest: "uploads/" });

// Connect to IPFS
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

// Upload File to IPFS
router.post("/upload", checkAuthToken(), upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const fileData = await ipfs.add(file.buffer);

    // Save to MongoDB
    const newFile = new File({
      filename: file.originalname,
      ipfsHash: fileData.path,
      owner: req.user.id,
    });

    await newFile.save();

    res.json({ ipfsHash: fileData.path, filename: file.originalname });
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
