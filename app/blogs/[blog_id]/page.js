import Navbar from "@/components/Navbar";
import React from 'react'
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/option";
import axios from "axios";

const getBlogData = async function (blog_id) {
    try {
        const session = await getServerSession(options);

        const response = await axios.post("http://localhost:3000/api/users/user_details", {
            blog_id: blog_id,
            session: session,
        });
        console.log(response.data);
        // console.log(`jo bhai aa data ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const page = ({params}) => {
  const data = getBlogData(params.blog_id)

  return (
    <div>
      <h1 className="text-white">good</h1>
    </div>
  )
}

export default page