import Image from "next/image";
import Link from "next/link";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8 transition-colors duration-300">
      {/* Main Content Container */}
      <main className="flex flex-col items-center gap-8 bg-white dark:bg-gray-800 p-10 rounded-lg shadow-md w-full max-w-4xl sm:p-16 transition-all duration-300">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400">
          Welcome to GitConnect!
        </h1>
        {/* Authentication Section */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-between">
          {/* Sign In Form */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 w-full sm:w-1/2">
            <SignIn />
          </div>

          {/* Sign Up Form */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 w-full sm:w-1/2">
            <SignUp />
          </div>
        </div>

        {/* Links to Other Pages */}
        <div className="mt-8 space-y-4 text-center">
          <Link href="/developers" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
            View Registered Developers
          </Link>
          <Link href="/posts" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
            View All Posts
          </Link>
          <Link href="/posts/create" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
            Create a New Post
          </Link>
          <Link href="/profile/edit" className="text-lg text-green-600 dark:text-green-400 hover:underline">
            Edit Profile
          </Link>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} GitConnect. All rights reserved.
      </footer>
    </div>
  );
}





