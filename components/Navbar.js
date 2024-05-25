// "use client"
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/option';


const Navbar = async () => {
  
  const session = await getServerSession(options);
  // const session = useSession(options)
  // const { data: session } = useSession()
  // console.log(session);
  // const session = {`
  //   user: {
  //     name: "Dev",
  //     email: "dev@gmail.com",
  //     role: "Unverified Email"
  //   }
  // }

  console.log(`DEMO DEMO ${JSON.stringify(session)}`);

  return (
    <header className="text-gray-500 backdrop-blur-md border-b border-slate-900 sticky top-0 z-10 shadow-2xl body-font">
      <div className="container mx-auto flex flex-wrap justify-around p-4 flex-col md:flex-row items-center">
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
            <Link href="/@me"><h3 className='font-medium text-xl text-gray-200 mr-2 flex flex-row items-center justify-center'>{session.user.name}</h3></Link>
            <Link className="inline-flex text-lg items-center font-semibold border-0 py-1 px-3 mr-4 focus:outline-none hover:bg-gray-700 rounded mt-4 md:mt-0" href="/api/auth/signout?callbackUrl=/">Logout</Link>
            {/* <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {session.user ? session.user.name : "User"}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          License
                        </a>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
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
