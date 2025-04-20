import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-yellow-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Not Found</h2>
        <p className="text-gray-600 mb-6">
          Could not find the requested resource
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold
                     hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
