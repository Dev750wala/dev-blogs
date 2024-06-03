"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import calculateJoinTime from '@/utils/calculateJoinTime';
import Blog_card from '@/components/Blog_card';

const Page = ({ params }) => {
    const username = decodeURIComponent(params.username);
    const [userData, setUserData] = useState(null);
    const [joinTime, setJoinTime] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/users/user_details", {
                    username: username,
                });
                const data = response.data;
                console.log(JSON.stringify(data));
                setUserData(data);
                setJoinTime(calculateJoinTime(data.user.createdAt));
                
            } catch (error) {
                console.log(error);
                return null;
            }
        };
        getData();

    }, [username]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='mt-60 min-h-[85vh]'>
                <section className='text-gray-600 body-font'>
                    <div className="flex flex-col sm:flex-row m-10">
                        <div className="sm:w-1/3 text-center flex justify-center items-center sm:pr-8 sm:py-8 p-4 m-0 mr-0">
                            <div className="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-20 h-20" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <h1 className='text-gray-200 text-4xl font-bold'>{userData.user.name}</h1>
                            <h2 className='text-gray-400 mt-1 text-xl'>@{userData.user.username}</h2>

                            <h3 className='my-7'>Joined on {joinTime.month}, {joinTime.year}</h3>

                            <div className='flex flex-row  mt-8 gap-10'>
                                <div className='flex flex-col justify-center items-center'>
                                    <h3 className='text-2xl text-gray-300 font-semibold'>{userData.user.total_blogs}</h3>
                                    <h3 className='text-base'>{userData.blogs.length <= 1 ? "Blog" : "Blogs"}</h3>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <h3 className='text-2xl text-gray-300 font-semibold'>{userData.user.total_blog_views}</h3>
                                    <h3 className='text-base'>{userData.total_blog_views <= 1 ? "View" : "Views"}</h3>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <h3 className='text-2xl text-gray-300 font-semibold'>{userData.user.total_likes}</h3>
                                    <h3 className='text-base'>{userData.total_likes <= 1 ? "Like" : "Likes"}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className='mx-28 flex justify-start mb-20'>
                <h1 className='text-gray-300 font-bold text-3xl'>Blogs</h1>
            </div>

            <div className='container w-full'>
                <div className="flex flex-row flex-wrap gap-6 mx-20">
                    {userData.blogs.map((blog) => {
                        const creationTime = calculateJoinTime(blog.createdAt);
                        return (
                            <Blog_card
                                key={blog._id}
                                month={creationTime.month}
                                date={creationTime.date}
                                category={blog.category[0]}
                                title={blog.title}
                                description={blog.blog}
                                author={userData.name}
                                likes={blog.likes}
                                dislikes={blog.dislikes}
                                comments={blog.comments}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Page;
