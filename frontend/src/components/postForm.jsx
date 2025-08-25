import { useState } from "react";
import api from "@/api"; // axios instance
import { resourceConfig } from "@/formConfig";
// import { uploadToCDN } from "@/uploadToCdn";

export default function ContentForm({ resourceType }) {
  const { endpoint, fields } = resourceConfig[resourceType];
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  console.log("Submitting data:", data); // 👈 should include Cloudinary URL

  try {
    await api.post(endpoint, data);
    alert(`${resourceType} created successfully!`);
    setData({});
  } catch (err) {
    console.error(err.response?.data || err);
    alert("Error creating " + resourceType);
  } finally {
    setLoading(false);
  }
};

  const renderField = (field) => {
    const value = data[field.name] || "";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            key={field.name}
            placeholder={field.label}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 rounded bg-gray-300 shadow-lg dark:bg-gray-700"
            rows="5"
          />
        );

      case "select":
        return (
          <select
            key={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 rounded bg-gray-300 shadow-lg dark:bg-gray-700"
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

    case "file":
  return (
    <input
      key={field.name}
      type="file"
      accept={field.accept || "image/*"}
      onChange={async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "lvpdhl8c");

          const res = await fetch("https://api.cloudinary.com/v1_1/dv8a41bod/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          console.log("Uploaded to Cloudinary:", data);

          // ✅ Save the Cloudinary URL in your form state
          handleChange(field.name, data.secure_url);
        } catch (err) {
          console.error("Upload failed", err);
          alert("File upload failed");
        }
      }}
      className="w-full p-2 rounded bg-gray-300 shadow-lg dark:bg-gray-700"
    />
  );



      default: // text, url
        return (
          <input
            key={field.name}
            type={field.type}
            placeholder={field.label}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 rounded bg-gray-300 shadow-lg dark:bg-gray-700"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {fields.map((field) => renderField(field))}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
