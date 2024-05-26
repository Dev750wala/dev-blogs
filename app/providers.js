'use client';
// import { options } from "./api/auth/[...nextauth]/option";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children, session }) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}