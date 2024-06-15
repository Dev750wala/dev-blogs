"use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === "loading") {
    return <h1 className='text-white'>LOADING</h1>
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="text-gray-500 backdrop-blur-md border-b border-slate-900 sticky top-0 z-10 shadow-2xl body-font">
      <div className="container mx-auto flex flex-wrap justify-around p-4 flex-col md:flex-row items-center relative">
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
        </nav>
        {session ? (
          <>
            <Link href="/new-blog" className="mr-5 hover:text-white">New Blog</Link>

            <div className="relative">
              <button
                id="dropdownDividerButton"
                onClick={toggleDropdown}
                className="text-white focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                {session.user.name}
                <svg
                  className="w-2.5 h-2.5 ml-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  id="dropdownDivider"
                  className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <Link href="/@me" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        See profile
                      </Link>
                    </li>
                  </ul>
                  <div className="py-2">
                    <Link
                      href="/api/auth/signout?callbackUrl=/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              href="/user/signup"
              className="inline-flex items-center font-semibold border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
            >
              Sign up
            </Link>
            <Link
              className="inline-flex items-center font-semibold border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
              href="/api/auth/signin"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
