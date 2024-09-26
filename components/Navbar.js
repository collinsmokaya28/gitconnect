"use client"; // Make sure to specify that this is a client component

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-indigo-600">GitConnect</h1>
            </div>
            <div className="hidden sm:flex sm:space-x-4">
              <Link href="/developers" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                View Registered Developers
              </Link>
              <Link href="/posts" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                View All Posts
              </Link>
              <Link href="/posts/create" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Create a New Post
              </Link>
              <Link href="/profile/edit" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
