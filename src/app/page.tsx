import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Performancy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md">
          Sales Performance Platform with AI-powered coaching
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
