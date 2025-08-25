import axios from "axios";

export async function uploadToCDN(file) {
  const formData = new FormData();
  formData.append("file", file);
  // If using Cloudinary:
  formData.append("upload_preset", "lvpdhl8c");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dv8a41bod/upload",
    formData
  );

  return res.data.secure_url; // this is the file URL
}
