// src/pages/admin/contentForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api";
import { resourceConfig } from "@/formConfig";

export default function ContentForm() {
  const { resourceType, id } = useParams(); // e.g. post, song, video, beat
  const { endpoint, fields } = resourceConfig[resourceType]; // comes from config
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ If editing, fetch existing record
  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`${endpoint}${resourceType}/${id}/`)
        .then((res) => setData(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, endpoint, resourceType]);

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // ✅ Edit mode
        await api.put(`${resourceConfig[resourceType].endpoint}${resourceType}/${id}/`, data);
        alert(`${resourceType} updated successfully!`);
      } else {
        // ✅ Create mode
        await api.post(`${resourceConfig[resourceType].endpoint}${resourceType}/`, data);
        alert(`${resourceType} created successfully!`);
      }
      navigate(`/admin/${resourceType}`); // go back to list page
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Error saving " + resourceType);
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

                const res = await fetch(
                  "https://api.cloudinary.com/v1_1/dv8a41bod/upload",
                  {
                    method: "POST",
                    body: formData,
                  }
                );

                const upload = await res.json();
                handleChange(field.name, upload.secure_url);
                alert("File upload successful ✔");
              } catch (err) {
                console.error("Upload failed", err);
                alert("File upload failed");
              }
            }}
            className="w-full p-2 rounded bg-gray-300 shadow-lg dark:bg-gray-700"
          />
        );

      default: // text, url, number
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
        {loading ? "Saving..." : id ? "Update" : "Create"}
      </button>
    </form>
  );
}
