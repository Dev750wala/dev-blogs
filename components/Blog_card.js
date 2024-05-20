import React from 'react'

const Blog_card = ({key, month, date, blog, category, title, description, author}) => {
    return (
        <>
            <div className="py-8 m-8 px-4 lg:w-1/4 bg-gray-800 bg-opacity-75 rounded-xl">
                <div className="h-full flex items-start">
                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{month[0]+month[1]+month[2]}</span>
                        <span className="font-medium text-lg text-gray-500 title-font leading-none">{date}</span>
                    </div>
                    <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">{category}</h2>
                        <h1 className="title-font text-xl font-medium text-stone-300 mb-3">{title}</h1>
                        <p className="leading-relaxed mb-5">{description}</p>
                        <a className="inline-flex items-center">
                            <img alt="blog" src="https://dummyimage.com/103x103" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"></img>
                            <span className="flex-grow flex flex-col pl-3">
                                <span className="title-font font-medium text-gray-300">{author}</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog_card