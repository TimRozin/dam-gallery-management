"use client";

import { useState } from "react";
import { useTags } from "@/lib/context";

interface TagSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TagSidebar({ isOpen, onClose }: TagSidebarProps) {
  const { allTags, removeTag, getTagColor, photos } = useTags();
  const [searchQuery, setSearchQuery] = useState("");

  const handleRemoveTag = (tag: string) => {
    if (confirm(`Remove tag "${tag}" from all photos?`)) {
      removeTag(tag);
    }
  };

  // Filter tags based on search query
  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate tag usage count and create mosaic data
  const tagMosaicData = filteredTags
    .map((tag) => {
      const usageCount = photos.reduce(
        (count, photo) => count + (photo.tags.includes(tag) ? 1 : 0),
        0
      );

      // Calculate size based on usage (min 1, max 4)
      const size = Math.max(1, Math.min(4, Math.ceil(usageCount / 2)));

      return {
        tag,
        usageCount,
        size,
        color: getTagColor(tag),
      };
    })
    .sort((a, b) => b.usageCount - a.usageCount); // Sort by usage count

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Tag Management
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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

          {/* Search Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Tags
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tags..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
              />
            </div>
          </div>

          {/* Tags List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tags ({filteredTags.length} of {allTags.length})
            </h3>
            <div className="max-h-96 overflow-y-auto">
              {tagMosaicData.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {tagMosaicData.map(
                    ({ tag, usageCount, size, color }, index) => {
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

                      // Size classes for mosaic
                      const sizeClasses = {
                        1: "col-span-1 row-span-1 text-xs",
                        2: "col-span-1 row-span-1 text-sm",
                        3: "col-span-2 row-span-1 text-base",
                        4: "col-span-2 row-span-2 text-lg",
                      };

                      return (
                        <div
                          key={tag}
                          className={`relative group cursor-pointer ${
                            sizeClasses[size as keyof typeof sizeClasses]
                          }`}
                          onClick={() => handleRemoveTag(tag)}
                          title={`${tag} (used ${usageCount} times) - Click to remove`}
                        >
                          <div
                            className={`w-full h-full p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${testColor} flex flex-col justify-center items-center text-center`}
                          >
                            <span className="font-semibold truncate w-full">
                              {tag}
                            </span>
                            <span className="text-xs opacity-75 mt-1">
                              {usageCount} photo{usageCount !== 1 ? "s" : ""}
                            </span>
                          </div>

                          {/* Remove button overlay */}
                          <button
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTag(tag);
                            }}
                          >
                            ×
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">
                    {searchQuery
                      ? "No tags found matching your search"
                      : "No tags yet"}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
