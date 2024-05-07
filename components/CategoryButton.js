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
            className={`border border-blue-400 flex flex-row justify-center items-center p-1 px-2  rounded-xl m-2 bg-blue-400 text-gray-200 category-button transition ${isActive ? 'active bg-blue-600 text-gray-200' : ''}`}
            onClick={handleClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className={`${ isActive ? '' : 'hidden' } w-5 mr-1 text-gray-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>

            <p>{category}</p>
        </button>
    );
};

export default CategoryButton;
