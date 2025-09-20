"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { photos, Photo, getAllTags, getTagColor } from "./data";

interface TagContextType {
  photos: Photo[];
  allTags: string[];
  addTagToPhoto: (photoId: number, tag: string) => void;
  removeTagFromPhoto: (photoId: number, tag: string) => void;
  addNewTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  getTagColor: (tag: string) => string;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [photoData, setPhotoData] = useState<Photo[]>(photos);

  const allTags = getAllTags();

  // Initialize tag colors for all existing tags
  allTags.forEach((tag) => {
    getTagColor(tag);
  });

  const addTagToPhoto = useCallback((photoId: number, tag: string) => {
    setPhotoData((prev) =>
      prev.map((photo) =>
        photo.id === photoId ? { ...photo, tags: [...photo.tags, tag] } : photo
      )
    );
  }, []);

  const removeTagFromPhoto = useCallback((photoId: number, tag: string) => {
    setPhotoData((prev) =>
      prev.map((photo) =>
        photo.id === photoId
          ? { ...photo, tags: photo.tags.filter((t) => t !== tag) }
          : photo
      )
    );
  }, []);

  const addNewTag = useCallback((tag: string) => {
    // Ensure the color is generated for the new tag
    getTagColor(tag);
  }, []);

  const removeTag = useCallback((tag: string) => {
    setPhotoData((prev) =>
      prev.map((photo) => ({
        ...photo,
        tags: photo.tags.filter((t) => t !== tag),
      }))
    );
  }, []);

  return (
    <TagContext.Provider
      value={{
        photos: photoData,
        allTags,
        addTagToPhoto,
        removeTagFromPhoto,
        addNewTag,
        removeTag,
        getTagColor,
      }}
    >
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
}
