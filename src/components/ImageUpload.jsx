import React, { useState, useRef } from "react";
import { uploadIcon } from "../assets/icons";

const ImageUpload = ({ onImageSelect, currentImage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const allowedTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];
      if (allowedTypes.includes(file.type)) {
        onImageSelect(file);
      } else {
        alert("Please select a valid image file (SVG, PNG, JPG, or GIF)");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg flex items-start gap-4">
      {/* Separate sphere for image display */}
      <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Upload area */}
      <div
        className={`flex-1 border rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragOver
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-[#16B364] hover:border-2"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/svg+xml,image/png,image/jpeg,image/jpg,image/gif"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="space-y-3">
          <div className="w-10 h-10 mx-auto rounded-md flex items-center justify-center border border-[#E9EAEB]">
            <img src={uploadIcon} alt="" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {currentImage
                ? "Click to change or drag and drop"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500">
              SVG, PNG, JPG or GIF (max 800x400px)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
