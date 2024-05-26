"use client"
import React from 'react'
import { getSession } from "next-auth/react"
import axios from "axios";
import Link from "next/link";
import Comment from "@/components/Comment";
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const getComments = async (comment_array) => {
    try {
        const response = await axios.post("http://localhost:3000/api/blogs/get-comments", {
            comments: comment_array,
        });

        const final_comments = response.data;
        // console.log(final_comments);
        return final_comments; 
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error; 
    }
}


const page = ({ params }) => {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [final_comments, setFinalComments] = useState([]);
    const [currentComment, setCurrentComment] = useState("");

    // const data = {
    //     blog: {
    //         _id: '664c5bd209313d3245754152',
    //         blog_id: 'vKuPjNO2Lccz-te',
    //         title: 'Lorem Ipsum',
    //         blog: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    //         category: ['Technology'],
    //         author: '664c410309313d3245754108',
    //         views: 8,
    //         comments: [],
    //         likes: [],
    //         dislikes: [],
    //         creationDate: '2024-05-21T08:31:14.952Z',
    //         createdAt: '2024-05-21T08:31:14.966Z',
    //         updatedAt: '2024-05-21T19:15:15.085Z',
    //         __v: 0
    //     },
    //     author: {
    //         total_blogs: 0,
    //         _id: '664c410309313d3245754108',
    //         username: 'dev750wala',
    //         name: 'Dev Sadisatsowala',
    //         email: 'sadisatsowaladev1@gmail.com',
    //         githubId: 117472132,
    //         oAuthProvider: 'github',
    //         password: 'ei1tkGzWHBPrtKyaeO9Q+v4bqLlyeKdXkTiDV63Kt0s=',
    //         total_likes: 0,
    //         total_comments: 0,
    //         total_blog_views: 9,
    //         createdAt: '2024-05-21T06:36:51.905Z',
    //         updatedAt: '2024-05-21T19:16:02.853Z',
    //         __v: 0
    //     }
    // };

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/blogs/get-blog", {
                    blog_id: params.blog_id,
                });
                const temp = {
                    blog: response.data.blog,
                    author: response.data.author
                };
                setData(temp);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchBlogData();
    }, [params.blog_id]);

    useEffect(() => {
        setComments(data?.blog?.comments);
        console.log(JSON.stringify(comments));
    }, [data])

    useEffect(() => {
        const response = getComments(comments);
        setFinalComments(response);
    }, [comments]);

    const handleCurrentComment = function (e) {
        setCurrentComment(e.target.value);
        console.log(currentComment);
    };

    const submitComment = async () => {
        
        try {
            const response = await axios.post(
                {
                    comment: currentComment,
                    blog_id: data.blog.blog_id,
                }
            )
        } catch (error) {
            console.error(error);
        }
    }

    if (!data) {
        return <div className='text-white'>Error loading blog data</div>;
    }

    return (
        <>
            {
                Object.keys(data).length === 0 ? (
                    <h1 className='text-white'>LOADING</h1>
                ) : (
                    <>
                        <Navbar />

                        {/* title header */}
                        <div className="container flex flex-col lg:w-[50%] mx-auto lg:px-3 my-20">
                            <h1 className="text-white text-5xl font-bold mb-8">{data.blog.title}</h1>
                            <hr />
                            <div className="my-3 flex flex-row justify-between">
                                <h2 className="text-gray-400 text-lg my-4">By <Link href={`/${data.author.username}`} className="font-bold" >{data.author.name}</Link></h2>

                                <div className="flex flex-row gap-6">
                                    <h2 className="text-gray-400 text-lg my-4 flex flex-row items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                        {data.blog.views}</h2>
                                    <h2 className="text-gray-400 text-lg my-4 flex flex-row items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                        {data.blog.likes.length}</h2>
                                </div>
                            </div>
                        </div>

                        {/* blog description */}
                        <div className="container flex flex-col lg:w-[50%] mx-auto lg:px-3 my-20">
                            <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:tracking-wide first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">{data.blog.blog}</p>
                        </div>

                        {/* blog comments */}
                        <div className="container flex flex-col lg:w-[50%] mx-auto lg:px-3 my-20">
                            <h1 className="text-xl font-bold my-10 text-gray-400">{data.blog.comments.length}&nbsp;Comments</h1>

                            {/* to comment on the blog */}
                            <div className="flex flex-row gap-2 justify-between">
                                <input type="text" value={currentComment} onChange={handleCurrentComment} placeholder="Add a comment..." className="bg-transparent border-b-2 border-gray-500 focus:border-gray-200 w-[85%] transition-colors focus:outline-none text-gray-200 text-base" />
                                <button onClick={submitComment} className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-full text-sm font-bold">Comment</button>
                            </div>

                            {/* previous comments */}
                            <div className="">
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                            </div>
                        </div>
                    </>
                )
            }
        </>

    )
}

export default page