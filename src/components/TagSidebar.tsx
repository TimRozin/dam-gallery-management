"use client";

import { useState } from "react";
import { useTags } from "@/lib/context";

interface TagSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TagSidebar({ isOpen, onClose }: TagSidebarProps) {
  const { allTags, removeTag, getTagColor } = useTags();
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !allTags.includes(newTag.trim())) {
      // In a real app, you'd add this to a global tag list
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    if (confirm(`Remove tag "${tag}" from all photos?`)) {
      removeTag(tag);
    }
  };

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

          {/* Add New Tag */}
          <form onSubmit={handleAddTag} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Tag
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </form>

          {/* Tags List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              All Tags ({allTags.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {allTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getTagColor(
                      tag
                    )}`}
                  >
                    {tag}
                  </span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title={`Remove "${tag}" from all photos`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {allTags.length === 0 && (
                <p className="text-gray-500 text-center py-4">No tags yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
