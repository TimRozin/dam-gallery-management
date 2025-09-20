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
      "bg-blue-500 text-white",
      "bg-green-500 text-white",
      "bg-purple-500 text-white",
      "bg-pink-500 text-white",
      "bg-yellow-500 text-white",
      "bg-indigo-500 text-white",
      "bg-red-500 text-white",
      "bg-orange-500 text-white",
      "bg-teal-500 text-white",
      "bg-cyan-500 text-white",
      "bg-lime-500 text-white",
      "bg-amber-500 text-white",
      "bg-emerald-500 text-white",
      "bg-violet-500 text-white",
      "bg-rose-500 text-white",
      "bg-sky-500 text-white",
      "bg-slate-500 text-white",
      "bg-gray-500 text-white",
      "bg-zinc-500 text-white",
      "bg-neutral-500 text-white",
      "bg-stone-500 text-white",
      "bg-fuchsia-500 text-white",
      "bg-blue-600 text-white",
      "bg-green-600 text-white",
      "bg-purple-600 text-white",
      "bg-pink-600 text-white",
      "bg-yellow-600 text-white",
      "bg-indigo-600 text-white",
      "bg-red-600 text-white",
      "bg-orange-600 text-white",
      "bg-teal-600 text-white",
      "bg-cyan-600 text-white",
      "bg-lime-600 text-white",
      "bg-amber-600 text-white",
      "bg-emerald-600 text-white",
      "bg-violet-600 text-white",
      "bg-rose-600 text-white",
      "bg-sky-600 text-white",
      "bg-slate-600 text-white",
      "bg-gray-600 text-white",
      "bg-zinc-600 text-white",
    ];

    // Use a hash of the tag name to get a consistent but seemingly random color
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      const char = tag.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    const colorIndex = Math.abs(hash) % colors.length;
    tagColors[tag] = colors[colorIndex];

    // Debug log to see what's happening
    console.log(`Tag "${tag}" got color: ${colors[colorIndex]}`);
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
