"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "@/lib/data";
import { useTags } from "@/lib/context";

interface PhotoCardProps {
  photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const { addTagToPhoto, removeTagFromPhoto, allTags, getTagColor } = useTags();
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !photo.tags.includes(newTag.trim())) {
      addTagToPhoto(photo.id, newTag.trim());
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    removeTagFromPhoto(photo.id, tag);
  };

  const availableTags = allTags.filter((tag) => !photo.tags.includes(tag));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={photo.url}
          alt={photo.title || "Photo"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>
      <div className="p-4">
        {photo.title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {photo.title}
          </h3>
        )}

        {/* Tags Display */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Tags</span>
            <button
              onClick={() => setIsEditingTags(!isEditingTags)}
              className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isEditingTags ? "Done" : "Edit"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {photo.tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTagColor(
                  tag
                )}`}
              >
                {tag}
                {isEditingTags && (
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-current hover:opacity-70 transition-opacity"
                  >
                    <svg
                      className="w-3 h-3"
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
                )}
              </span>
            ))}
          </div>

          {/* Add Tag Form */}
          {isEditingTags && (
            <div className="space-y-2">
              <form onSubmit={handleAddTag} className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </form>

              {/* Quick Add Tags */}
              {availableTags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Quick add:</p>
                  <div className="flex flex-wrap gap-1">
                    {availableTags.slice(0, 5).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTagToPhoto(photo.id, tag)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(
                          tag
                        )} hover:opacity-70 transition-opacity`}
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
