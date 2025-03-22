import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: String,
  ipfsHash: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("File", FileSchema);
