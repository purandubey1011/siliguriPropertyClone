import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import axios from "axios";
import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Uploadbutton = ({ 
    tagName = "Upload",
    onFilesChange, 
    initialFiles = [], 
    maxFiles = 10, 
    acceptedTypes = ['image/jpeg', 'image/png', 'video/mp4'],
    maxSize = 50 * 1024 * 1024, // 50MB
    className = ""
}) => {
    const [uploadedFiles, setUploadedFiles] = useState(initialFiles);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const validateFile = (file) => {
        if (!acceptedTypes.includes(file.type)) {
            alert(`Invalid file type. Please upload ${acceptedTypes.join(', ')} files only.`);
            return false;
        }

        if (file.size > maxSize) {
            alert(`File is too large. Maximum size is ${Math.round(maxSize / (1024 * 1024))}MB.`);
            return false;
        }

        if (uploadedFiles.length >= maxFiles) {
            alert(`Maximum ${maxFiles} files allowed.`);
            return false;
        }

        return true;
    };

    const authenticateUpload = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URI}/api/v1/property/uploadassets`,
                { withCredentials: true }
            );
            const { signature, expire, token, publicKey } = response.data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const uploadToImageKit = async (file) => {
        const abortController = new AbortController();
        
        try {
            const authParams = await authenticateUpload();
            const { signature, expire, token, publicKey } = authParams;

            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file?.name || "untitled",
                abortSignal: abortController.signal
            });
            
            return uploadResponse.url;
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
            throw error;
        }
    };

    const updateFiles = (newFiles) => {
        setUploadedFiles(newFiles);
        if (onFilesChange) {
            onFilesChange(newFiles);
        }
    };

    const handleFiles = async (files) => {
        const validFiles = Array.from(files).filter(validateFile);
        if (validFiles.length === 0) return;

        setUploading(true);

        try {
            const newFiles = [];
            
            for (const file of validFiles) {
                try {
                    const uploadedUrl = await uploadToImageKit(file);
                    newFiles.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        type: file.type,
                        url: uploadedUrl,
                        size: file.size
                    });
                } catch (error) {
                    console.error(`Failed to upload ${file.name}:`, error);
                    alert(`Failed to upload ${file.name}. Please try again.`);
                }
            }

            if (newFiles.length > 0) {
                const updatedFiles = [...uploadedFiles, ...newFiles];
                updateFiles(updatedFiles);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('Error uploading files. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const acceptString = acceptedTypes.join(',');

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Simple Upload Button */}
            <div className="text-center">
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptString}
                    onChange={handleFileInput}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 bg-pink-600 text-sm text-white font-semibold px-4 py-2 rounded-lg hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={uploading || uploadedFiles.length >= maxFiles}
                >
                    <FiUploadCloud className="text-xl" />
                    {uploading ? 'Uploading...' : `${tagName}`}
                </button>
            </div>   
        </div>
    );
};

export default Uploadbutton;