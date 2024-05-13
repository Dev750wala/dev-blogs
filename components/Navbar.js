
import Link from 'next/link';
import React from 'react';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/option';

const Navbar = async () => {
  const session = await getServerSession(options);

  console.log(`DEMO DEMO ${JSON.stringify(session)}`);

  return (
    <header className="text-gray-500 bg-transparent body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Dev-Blogs</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {/* <Link href="/" className="mr-5 hover:text-white">First Link</Link>
          
          <Link href="/" className="mr-5 hover:text-white">Third Link</Link>
          <Link href="/" className="mr-5 hover:text-white">Fourth Link</Link> */}
        </nav>
        {session ? (
          <>
            <Link href="/new-blog" className="mr-5 hover:text-white">New Blog</Link>
            <h3 className='font-medium text-xl text-gray-200 mr-2 flex flex-row items-center justify-center'>{session.user.name}</h3>
            <Link className="inline-flex text-lg items-center font-semibold border-0 py-1 px-3 mr-4 focus:outline-none hover:bg-gray-700 rounded mt-4 md:mt-0" href="/api/auth/signout?callbackUrl=/">Logout</Link>
          </>
        ) : (
          <>
            <Link href="/user/signup" className="inline-flex items-center font-semibold border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
              Sign up
            </Link>
            <Link className="inline-flex items-center font-semibold border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0" href="/api/auth/signin">Login</Link>
          </>
        )}

      </div>
    </header>
  );
};

export default Navbar;
