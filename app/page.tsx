import Image from "next/image";
import Link from "next/link"; 
import SignIn from "../pages/auth/signin"; 
import SignUp from "../pages/auth/signup"; 

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Welcome to GitConnect!</h1>
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* Render SignIn and SignUp components */}
        <div className="flex flex-col gap-4 w-full sm:w-2/3">
          <SignIn />
          <SignUp />
        </div>

        {/* Link to the Developers page */}
        <div className="mt-8">
          <Link href="/developers" className="text-blue-500 hover:underline">
            View Registered Developers
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer Links */}
        <p className="text-sm">© {new Date().getFullYear()} GitConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}



