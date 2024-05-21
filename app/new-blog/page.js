"use client";

import CategoryButton from "@/components/CategoryButton";
import blogCategories from "@/data/blogCategories";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ExclamationIcon } from '@heroicons/react/outline';

const NewBlog = () => {
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading }
  } = useForm();

  const [selectedCategories, setSelectedCategories] = useState([]);


  const handleToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const onSubmit = async (data) => {
  
    data.categories = selectedCategories.map((cat) => { return cat });

    try {
      const response = await fetch("/api/blogs/new-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        console.log("Blog shared successfully!");
        location.assign("/");
      } else {
        console.error("Failed to share blog:", response.statusText);
        setError("nullError", "Unexpected Error Occured! Please try later...");
      }
    } catch (error) {
      // Handle network errors
      setError("nullError", "Unexpected Error Occured! Please try later...");
      console.error("Network error:", error.message);
    }
  };

  return (
    <div className="text-white flex items-center justify-center min-h-screen m-16">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-500  hover:shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {
            errors.nullError && (
              <p className="text-red-600">{errors.nullError.message}</p>
            )
          }
          <h1 className="text-3xl font-bold text-center">Upload Your Blog</h1>

          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-400">Blog Title</label>
            <input
              type="text"
              id="title"
              {...register('title', { required: 'Title is required' })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
            {errors.title && (
              <p className="text-red-600 flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="ml-2">{errors.title.message}</p>

              </p>
            )
            }
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-gray-400">Blog</label>
            <textarea
              id="content"
              {...register('content', { required: 'Content is required' })}
              rows="7"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />

            {errors.content && (
              <p className="text-red-600 flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="ml-2">{errors.content.message}</p>

              </p>
            )
            }
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

          <button
            type="submit"
            className={`w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${isLoading ? "bg-indigo-700" : ""}`}
          >
            {
              isLoading ? "SHARING.." : "SHARE BLOG"
            }

          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
