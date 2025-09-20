import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Taglio
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Manage and search
        </p>
        <Link
          href="/photos"
          className="inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          View Photos
        </Link>
      </div>
    </main>
  );
}
