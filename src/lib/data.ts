export interface Photo {
  id: number;
  url: string;
  title?: string;
  tags: string[];
}

// Tag color mapping for consistent colors
export const tagColors: Record<string, string> = {};

// Generate a color for a tag if it doesn't exist
export function getTagColor(tag: string): string {
  if (!tagColors[tag]) {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
      "bg-yellow-100 text-yellow-800",
      "bg-indigo-100 text-indigo-800",
      "bg-red-100 text-red-800",
      "bg-orange-100 text-orange-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
      "bg-lime-100 text-lime-800",
      "bg-amber-100 text-amber-800",
      "bg-emerald-100 text-emerald-800",
      "bg-violet-100 text-violet-800",
      "bg-rose-100 text-rose-800",
      "bg-sky-100 text-sky-800",
    ];
    const colorIndex = Object.keys(tagColors).length % colors.length;
    tagColors[tag] = colors[colorIndex];
  }
  return tagColors[tag];
}

// Get all unique tags from photos
export function getAllTags(): string[] {
  const allTags = new Set<string>();
  photos.forEach((photo) => {
    photo.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

export const photos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    title: "Forest Path",
    tags: ["nature", "forest", "green", "trees", "path"],
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
    title: "City Skyline",
    tags: ["urban", "cityscape", "night", "buildings", "skyline"],
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Mountain Lake",
    tags: ["nature", "mountains", "lake", "blue", "landscape"],
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop",
    title: "Ocean Waves",
    tags: ["ocean", "waves", "blue", "water", "beach"],
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
    title: "Desert Sunset",
    tags: ["desert", "sunset", "orange", "sand", "landscape"],
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    title: "Urban Street",
    tags: ["urban", "street", "city", "architecture", "people"],
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Snowy Peaks",
    tags: ["mountains", "snow", "white", "winter", "landscape"],
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Tropical Beach",
    tags: ["beach", "tropical", "palm", "sand", "vacation"],
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Autumn Forest",
    tags: ["autumn", "forest", "orange", "leaves", "fall"],
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Modern Architecture",
    tags: ["architecture", "modern", "building", "design", "urban"],
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Flower Garden",
    tags: ["flowers", "garden", "colorful", "nature", "spring"],
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    title: "Rural Countryside",
    tags: ["rural", "countryside", "fields", "green", "peaceful"],
  },
];
