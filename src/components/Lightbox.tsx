"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Photo } from "@/lib/data";
import { useTags } from "@/lib/context";

interface LightboxProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({ photo, isOpen, onClose }: LightboxProps) {
  const { getTagColor } = useTags();
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    if (photo && isOpen) {
      // Create a new image to get dimensions
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = photo.url;
    }
  }, [photo, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-90"
        onClick={onClose}
      />

      {/* Lightbox Content */}
      <div className="relative z-10 flex max-w-7xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <Image
              src={photo.url}
              alt={photo.title || "Photo"}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 dark:bg-gray-700 border-l border-gray-200 dark:border-gray-600 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Photo Details
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Image Name */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Name
              </h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {photo.title || "Untitled"}
              </p>
            </div>

            {/* Dimensions */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dimensions
              </h3>
              {imageDimensions ? (
                <div className="space-y-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">Width:</span>{" "}
                    {imageDimensions.width}px
                  </p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">Height:</span>{" "}
                    {imageDimensions.height}px
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Aspect Ratio:</span>{" "}
                    {(imageDimensions.width / imageDimensions.height).toFixed(
                      2
                    )}
                    :1
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading dimensions...
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag, index) => {
                  // Test with hardcoded colors first
                  const testColors = [
                    "bg-blue-500 text-white",
                    "bg-green-500 text-white",
                    "bg-purple-500 text-white",
                    "bg-pink-500 text-white",
                    "bg-yellow-500 text-white",
                    "bg-red-500 text-white",
                    "bg-orange-500 text-white",
                    "bg-teal-500 text-white",
                  ];
                  const testColor = testColors[index % testColors.length];
                  const tagColor = getTagColor(tag);
                  console.log(
                    `Lightbox - Tag "${tag}" with color: ${tagColor}, test color: ${testColor}`
                  );

                  return (
                    <span
                      key={index}
                      className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${testColor}`}
                    >
                      {tag}
                    </span>
                  );
                })}
                {photo.tags.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No tags assigned
                  </p>
                )}
              </div>
            </div>

            {/* Image Info */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image Information
              </h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium">Format:</span> JPEG
                </p>
                <p>
                  <span className="font-medium">ID:</span> {photo.id}
                </p>
                <p>
                  <span className="font-medium">Tags Count:</span>{" "}
                  {photo.tags.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
