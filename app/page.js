import Blog_card from "@/components/Blog_card";
import Image from "next/image";
import { findAllBlogs } from "@/utils/find-all-blogs";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/option";
import Link from "next/link";

export default async function Home() {

  const session = await getServerSession(options);

  return (
    <>
      <Navbar />
      <div className="flex flex-col mx-auto justify-center items-center py-10 min-h-[80vh]">
        <h1 className="text-8xl text-stone-300 font-extrabold">Welcome to Dev Blogs</h1>
        <h2 className="text-stone-500 text-3xl tracking-wide mt-4 font-semibold hover:text-stone-300 transition-all cursor-pointer">One of the centers for all creators to meet</h2>
      </div>

      {session ? <section className="text-gray-600 body-font">
        <div className="container px-28 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">
            <Blog_card />
          </div>
        </div>
      </section> : <h1 className="text-stone-500 text-3xl tracking-wide m-20 pb-40 font-semibold mb-6 flex justify-center items-center"> Please &nbsp;<Link className="text-stone-400" href={"/api/auth/signin"}>log in</Link>&nbsp; to see the content</h1>}
    </>
  );
}
