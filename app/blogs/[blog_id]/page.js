"use client"
import React from 'react'
import { getSession, useSession } from "next-auth/react"
import axios from "axios";
import Link from "next/link";
import Comment from "@/components/Comment";
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const page = ({ params }) => {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [final_comments, setFinalComments] = useState([]);
    const [currentComment, setCurrentComment] = useState("");
    const [totalComments, setTotalComments] = useState(0);
    const [liked, setLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [showLikes, setShowLikes] = useState(false);
    const [likeData, setLikeData] = useState([]);
    const [finalLikeData, setFinalLikeData] = useState([]);

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
                setData({
                    blog: response.data.blog,
                    author: response.data.author,
                });
                setLiked(response.data.liked)
                setLikeData(response.data.blog.likes);


            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        }; fetchBlogData();
    }, [params.blog_id]);


    useEffect(() => {
        if (data?.blog?.comments) {
            setComments(data.blog.comments);
        }
        setTotalLikes(data?.blog?.likes?.length)
    }, [data]);

    useEffect(() => {
        const getLikeData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api/blogs/get-likes", {
                    likes: likeData,
                });
                // console.log("🚀 ~ getLikeData ~ response:", JSON.stringify(response.data))
                
                setFinalLikeData(response.data);
            } catch (error) {
                console.error("Error fetching like data:", error);
            }
        };
        getLikeData(likeData);
    }, [likeData]);

    useEffect(() => {
        const fetchComments = async () => {
            if (comments.length > 0) {
                try {
                    const response = await axios.post("http://localhost:3000/api/blogs/get-comments", {
                        comments: comments,
                    });
                    const fetchedComments = response.data;
                    // console.log(fetchedComments.comments);

                    setFinalComments(fetchedComments.comments);
                    setTotalComments(fetchedComments.comments.length);
                } catch (error) {
                    console.error("Error fetching final comments:", error);
                }
            }
        };
        fetchComments();
    }, [comments]);


    const handleCurrentComment = (e) => {
        setCurrentComment(e.target.value);
    };

    const submitComment = async () => {

        if (currentComment === "") {
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/blogs/add-comment", {
                comment: currentComment,
                blog_id: data.blog.blog_id,
            });

            const responseData = response.data;
            if (responseData) {
                setFinalComments(prevComments => {
                    return [
                        {
                            comment: currentComment,
                            commenter: responseData.commenter,
                            username: responseData.username,
                            name: responseData.name,
                            commentDate: responseData.time,
                        },
                        ...prevComments,
                    ];
                });
                setTotalComments(totalComments + 1);
                setCurrentComment("");
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleLikeClick = async () => {
        if (liked) {
            setLiked(false);
            setTotalLikes(totalLikes - 1);
            try {
                const response = await axios.post("http://localhost:3000/api/blogs/remove-like", {
                    blog_id: data.blog.blog_id,
                    author: data.blog.author,
                });
            } catch (error) {
                console.error("Error removing like:", error);
                // Revert state change on error
                setLiked(true);
                setTotalLikes(totalLikes + 1);
            }
        } else {
            setLiked(true);
            setTotalLikes(totalLikes + 1);
            try {
                const response = await axios.post("http://localhost:3000/api/blogs/add-like", {
                    blog_id: data.blog.blog_id,
                    author: data.blog.author,
                });
            } catch (error) {
                console.error("Error adding like:", error);
                // Revert state change on error
                setLiked(false);
                setTotalLikes(totalLikes - 1);
            }
        }
    };

    const handleShowLikes = async () => {
        setShowLikes(!showLikes);
    }

    // if (!data) {
    //     return (
    //         <div className='w-full h-full flex flex-row justify-center items-center'>
    //             <Loader />
    //             <h1 className='text-6xl text-white'></h1>
    //         </div>
    //     )
    // }

    const users = [
        { id: 1, name: 'Aditi Chauhan', username: 'aditi.einm', img: '/path/to/aditi.jpg' },
        { id: 2, name: 'jmd CREATIVE', username: 'jmd.creative', img: '/path/to/jmd.jpg' },
        { id: 3, name: 'Hoang Thien', username: 'thieenn_n', img: '/path/to/hoang.jpg' },
        { id: 4, name: 'Pooja Prajapat', username: '__pooja_pr', img: '/path/to/pooja.jpg' },
        { id: 5, name: 'دانيل ساكي', username: 'daniel_saki_', img: '/path/to/daniel.jpg' },
        { id: 6, name: 'Roobini Ganesan', username: 'roobini_rooby', img: '/path/to/roobini.jpg' },
    ];


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
                                    <h2 className="text-gray-400 text-lg my-4 flex flex-row items-center gap-1">
                                        <button onClick={handleLikeClick}>
                                            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill={liked ? "currentcolor" : "none"} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                            </svg>
                                        </button>
                                        <button onClick={handleShowLikes}>{totalLikes}</button>

                                        {showLikes && (
                                            <>
                                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                    <div className="bg-gray-800 text-white rounded-xl p-4 w-80">
                                                        <div className='flex justify-between items-center'>
                                                            <h3 className="text-xl mb-4">Likes</h3>
                                                            <h3 className='text-xl mb-4'>
                                                                <button onClick={handleShowLikes}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </h3>
                                                        </div> <hr /> <br />
                                                        <ul>
                                                            {finalLikeData.map((user) => (
                                                                <li key={user._id} className="flex items-center mb-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                                                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                                                    </svg>

                                                                    <div className="ml-3">
                                                                        <p className="font-medium"><Link href={`${process.env.BASE_URL}/user/${user.username}`}>{user.username}</Link></p>
                                                                        <p className="text-sm text-gray-400">{user.name}</p>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* blog description */}
                        <div className="container flex flex-col lg:w-[50%] mx-auto lg:px-3 my-20">
                            <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:tracking-wide first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">{data.blog.blog}</p>
                        </div>

                        {/* blog comments */}
                        <div className="container flex flex-col lg:w-[50%] mx-auto lg:px-3 my-20">
                            <h1 className="text-xl font-bold my-10 text-gray-400">{totalComments}&nbsp;Comments
                            </h1>

                            {/* to comment on the blog */}
                            <div className="flex flex-row gap-2 justify-between">
                                <input type="text" value={currentComment} onChange={handleCurrentComment} placeholder="Add a comment..." className="bg-transparent border-b-2 border-gray-500 focus:border-gray-200 w-[85%] transition-colors focus:outline-none text-gray-200 text-base" />
                                <button onClick={submitComment} className="bg-blue-500 hover:bg-blue-600 transition-all text-white px-4 py-2 rounded-full text-sm font-bold">Comment</button>
                            </div>

                            {/* previous comments */}
                            <div className="">
                                {Array.isArray(final_comments) && final_comments.map(comment => (
                                    <Comment
                                        key={comment.id}  // Ensure each child has a unique key
                                        name={comment.name}
                                        time={comment.commentDate ? formatDistanceToNow(new Date(comment.commentDate), { addSuffix: true }) : ''}
                                        comment={comment.comment}
                                        username={comment.username}
                                    />
                                ))}
                            </div>

                        </div>
                    </>
                )
            }
        </>
    )
}

export default page