import React, { useState } from 'react';

const CategoryButton = ({ category, onToggle }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        onToggle(category);
    };

    return (
        <button
            type='button'
            className={`flex justify-center items-center p-2 rounded-xl m-2 bg-gray-800 text-white category-button transition border border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isActive ? 'bg-blue-600 border-blue-600' : ''}`}
            onClick={handleClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`${isActive ? 'w-5 mr-1' : 'hidden'} text-gray-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>

            <p>{category}</p>
        </button>

    );
};

export default CategoryButton;
