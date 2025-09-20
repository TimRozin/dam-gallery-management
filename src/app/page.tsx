import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Digital Asset Management
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage and search your photo collection
        </p>
        <Link
          href="/photos"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          View Photos
        </Link>
      </div>
    </main>
  );
}
