"use client";

import CategoryButton from "@/components/CategoryButton";
import blogCategories from "@/data/blogCategories";
import Link from "next/link";
import React, { useState } from "react";

const NewBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [blog, setBlog] = useState({ title: "", description: "", category: selectedCategories });
  console.log(blog);

  const handleBlogChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
    setError("");
  };

  const handleToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category),
      );
      // setBlog.category = selectedCategories;
    } else {
      setSelectedCategories([...selectedCategories, category]);
      // setBlog.category = selectedCategories;
    }
    setBlog({ ...blog, category: selectedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/new-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Blog shared successfully!");
        location.assign("/");
      } else {
        // Handle error response
        console.error("Failed to share blog:", response.statusText);
        setError("Failed to share blog: " + response.statusText);
        setLoading(false); // Set loading state to false
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error.message);
      setError("There is a network: " + error.message);
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="flex flex-col mx-auto justify-center items-center pb-10 min-h-[80vh] mt-0">
      <h1 className="text-3xl text-stone-300 font-extrabold">New Blog</h1>
      <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
        {error !== "" ? <label className="text-red-800">{error}</label> : ""}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Blog title
          </label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleBlogChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title here..."
            required
          />
        </div>
        <div className="flex flex-col items-start mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Blog description
          </label>
          <textarea
            type="text"
            name="description"
            value={blog.description}
            onChange={handleBlogChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description here..."
            required
          />
        </div>
        <div className="flex flex-col items-start mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select category
          </label>
          <div className="flex flex-wrap">
            {
                blogCategories.map((category, index) => {
                    return (
                      <CategoryButton
                        key={index}
                        category={category}
                        selectedCategories={selectedCategories}
                        onToggle={handleToggle}
                      />
                    );
  
                })
            }
          </div>
        </div>

        
        <Link
          href={"/"}
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[16px] mr-5 w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          Go back
        </Link>

        <button
          type="submit"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            loading ? "bg-blue-800 text-gray-400 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sharing..." : "Share"}
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
