import { upload } from "@imagekit/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FormField } from "./Listingform";

const MediaUpload = ({
  data,
  handleChange,
  onFilesChange,
  initialFiles = [],
  maxFiles = 10,
  acceptedTypes,
  maxSize = 50 * 1024 * 1024,
  className = "",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(initialFiles || []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // FEATURED IMAGE STATES
  const [featuredDrag, setFeaturedDrag] = useState(false);
  const [featuredUploading, setFeaturedUploading] = useState(false);
  const featuredInputRef = useRef(null);

  useEffect(() => {
    setUploadedFiles(initialFiles || []);
  }, [initialFiles]);

  // VALIDATION
  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      alert(`Invalid file type: ${file.type}`);
      return false;
    }
    if (file.size > maxSize) {
      alert(`Max size ${Math.round(maxSize / (1024 * 1024))}MB allowed.`);
      return false;
    }
    return true;
  };

  const authenticateUpload = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/api/v1/property/uploadassets`,
      { withCredentials: true }
    );
    return response.data;
  };

  const uploadToImageKit = async (file, authParams) => {
    const { signature, expire, token, publicKey } = authParams;
    return upload({
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name,
    });
  };

  const updateFiles = (files) => {
    setUploadedFiles(files);
    onFilesChange?.(files);
  };

  // ------------ MEDIA FILES UPLOAD ------------
  const handleFiles = async (files) => {
    const valid = Array.from(files).filter(validateFile);
    if (valid.length === 0) return;

    setUploading(true);
    try {
      const auth = await authenticateUpload();

      const uploaded = await Promise.all(
        valid.map((file) =>
          uploadToImageKit(file, auth).then((res) => ({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            type: file.type,
            url: res.url,
            tag: "",
          }))
        )
      );

      updateFiles([...uploadedFiles, ...uploaded]);
    } catch (err) {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  // ------------ SINGLE FEATURED IMAGE UPLOAD ------------
  const handleFeaturedFiles = async (files) => {
    const valid = Array.from(files).filter(validateFile);
    if (valid.length === 0) return;

    setFeaturedUploading(true);

    try {
      const auth = await authenticateUpload();

      const uploaded = await Promise.all(
        valid.map((file) =>
          uploadToImageKit(file, auth).then((res) => ({
            id: Math.random().toString(36).substring(2, 9),
            url: res.url,
            type: file.type,
          }))
        )
      );

      // ALWAYS keep only ONE featured image
      const newImage = [uploaded[0]];

      handleChange({
        target: { name: "featuredImage", value: newImage },
      });
    } catch (error) {
      alert("Featured Image upload failed");
    }

    setFeaturedUploading(false);
  };

  const handleFeaturedDrop = (e) => {
    e.preventDefault();
    setFeaturedDrag(false);
    if (e.dataTransfer.files?.length) handleFeaturedFiles(e.dataTransfer.files);
  };

  const acceptString = acceptedTypes.join(",");

  return (
    <div className={`space-y-8 ${className}`}>
      {/* ---------------- SINGLE FEATURED IMAGE UPLOAD ---------------- */}
      <div className="space-y-2">
        <FormField label="Upload Featured Image" />

        <div
          onDragEnter={() => setFeaturedDrag(true)}
          onDragLeave={() => setFeaturedDrag(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFeaturedDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
            featuredDrag ? "border-pink-500 bg-pink-50" : "border-gray-300"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            ref={featuredInputRef}
            className="hidden"
            onChange={(e) => handleFeaturedFiles(e.target.files)}
          />

          <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="font-semibold">Drag & drop featured image</p>
          <p className="text-sm text-gray-600">or</p>

          <button
            type="button"
            onClick={() => featuredInputRef.current?.click()}
            className="mt-2 border border-pink-600 text-pink-600 px-5 py-2 rounded-lg hover:bg-pink-50"
          >
            {featuredUploading ? "Uploading..." : "Browse"}
          </button>
        </div>

        {/* SINGLE FEATURED IMAGE PREVIEW */}
        {data?.featuredImage?.length > 0 && (
          <div className="relative mt-4 w-[400px] h-[250px] mx-auto">
            <img
              src={data.featuredImage[0].url}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />

            <button
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: "featuredImage", value: [] },
                })
              }
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2 text-xs hover:bg-black"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* ---------------- MEDIA FILES UPLOAD ---------------- */}
      <div>
        <p className="font-medium text-gray-800">Upload MediaFiles</p>

        <div
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
            dragActive ? "border-pink-500 bg-pink-50" : "border-gray-300"
          }`}
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            accept={acceptString}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <FiUploadCloud className="mx-auto text-4xl text-gray-400 mb-3" />
          <p className="font-semibold">Drag & drop media files</p>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mt-3 border border-pink-600 text-pink-600 px-5 py-2 rounded-lg hover:bg-pink-50"
          >
            {uploading ? "Uploading..." : "Browse Files"}
          </button>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-5">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="relative bg-white border border-pink-500 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-2"
              >
                {/* IMAGE */}
                <div className="relative w-full h-36 rounded-lg overflow-hidden">
                  <img src={file.url} className="w-full h-full object-cover" />

                  {/* DELETE BUTTON */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = uploadedFiles.filter(
                        (f) => f.id !== file.id
                      );
                      updateFiles(updated);
                    }}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full px-2 py-1.5 text-xs hover:bg-black"
                  >
                    ✕
                  </button>

                  {/* TOP-RIGHT TAG ON PREVIEW IF EXISTS */}
                  {file.tag && (
                    <span className="absolute bottom-2 right-2 bg-pink-600 text-white text-[10px] px-2 py-1 rounded-md shadow">
                      {file.tag}
                    </span>
                  )}
                </div>

                {/* TAG INPUT */}
                <input
                  type="text"
                  placeholder="Add Tag (Kitchen, Hall, etc.)"
                  value={file.tag || ""}
                  onChange={(e) => {
                    const updated = uploadedFiles.map((f) =>
                      f.id === file.id ? { ...f, tag: e.target.value } : f
                    );
                    updateFiles(updated);
                  }}
                  className="
            w-full mt-2 px-2 py-1.5 text-xs 
            border border-gray-300 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-pink-500
            placeholder:text-gray-500
          "
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
