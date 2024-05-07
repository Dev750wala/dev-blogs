import Blog_card from "@/components/Blog_card";
import Image from "next/image";
import { findAllBlogs } from "@/utils/find-all-blogs";

export default function Home() {

  const authenticated = true;

  return (
    <>
      <div className="flex flex-col mx-auto justify-center items-center py-10 min-h-[80vh]">
        <h1 className="text-8xl text-stone-300 font-extrabold">Welcome to Dev-Blogs</h1>
        <h2 className="text-stone-500 text-3xl tracking-wide mt-4 font-semibold hover:text-stone-300 transition-all">One of the centers for all creators to meet</h2>
      </div>


      {authenticated ? <section className="text-gray-600 body-font">
        <div className="container px-28 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">
            <Blog_card />
          </div>
        </div>
      </section> : <h1 className="text-white"> Please sign up to see the content</h1>}
    </>
  );
}
