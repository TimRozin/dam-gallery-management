"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTags } from "@/lib/context";
import PhotoCard from "@/components/PhotoCard";
import TagSidebar from "@/components/TagSidebar";

export default function PhotosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { photos } = useTags();

  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return photos;
    }

    const query = searchQuery.toLowerCase();
    return photos.filter((photo) =>
      photo.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, photos]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              DAM System
            </Link>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Photo Gallery
              </h1>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Manage Tags
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
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
            placeholder="Search photos by tags (e.g., nature, city, ocean)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-lg text-black"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pb-3">
        <p className="text-gray-600">
          {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""}{" "}
          found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pb-6">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No photos found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or browse all photos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        )}
      </div>

      {/* Tag Sidebar */}
      <TagSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
