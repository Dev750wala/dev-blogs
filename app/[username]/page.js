import React from 'react'
import axios from 'axios'

const page = ({ params }) => {
  return (
    <div>
        <h1 className='text-white'>{params.username}</h1>
    </div>
  )
}

export default page