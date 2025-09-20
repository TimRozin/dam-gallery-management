# Digital Asset Management (DAM) System

A simple Digital Asset Management system built with Next.js, React, and Tailwind CSS for managing and searching photos.

## Features

- **Photo Gallery**: View photos in a responsive 3-column grid layout
- **Real-time Search**: Search photos by tags with instant filtering
- **Tag Management**: Comprehensive tag management with a dedicated sidebar
- **Inline Tag Editing**: Add and remove tags directly on each photo
- **Dynamic Tag Colors**: Each tag gets a unique color for visual distinction
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, modern interface with hover effects and smooth transitions
- **Tag-based Organization**: Each photo has multiple tags for easy categorization

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Next.js Image** - Optimized image loading

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── photos/
│       └── page.tsx         # Photos gallery page
├── components/              # Reusable components
└── lib/
    └── data.ts              # Photo data and types
```

## Usage

1. **Home Page**: Navigate to the root URL to see the welcome page
2. **Photo Gallery**: Click "View Photos" or navigate to `/photos`
3. **Search**: Use the search bar to filter photos by tags
4. **Tag Management**: Click "Manage Tags" to open the tag management sidebar
5. **Edit Tags**: Click "Edit" on any photo to add/remove tags inline
6. **Responsive**: The grid automatically adjusts to screen size:
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns

## Photo Data Structure

Photos are stored in `src/lib/data.ts` with the following structure:

```typescript
interface Photo {
  id: number;
  url: string;
  title?: string;
  tags: string[];
}
```

## Tag Management Features

### Search Functionality

- Filters photos in real-time as you type
- Searches across all tags (case-insensitive)
- Shows results count
- Displays "No photos found" message when no matches

### Tag Management Sidebar

- View all available tags with usage count
- Add new tags to the system
- Remove tags from all photos
- Each tag has a unique color for visual distinction

### Inline Tag Editing

- Click "Edit" on any photo to enter edit mode
- Add new tags by typing and pressing Enter
- Remove existing tags by clicking the X button
- Quick-add buttons for common tags
- Real-time updates across the application

## Styling

- Uses Tailwind CSS for styling
- Includes hover effects (scale and shadow)
- Responsive design with mobile-first approach
- Clean, modern aesthetic with proper spacing and typography

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
