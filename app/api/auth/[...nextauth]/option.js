import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import USER from "@/utils/user-model";
// import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";


export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                usernameOrEmail: { label: "Username", type: "text", placeholder: "jsmith", required: true },
                password: { label: "Password", type: "password", required: true },
            },

            async authorize(credentials) {
                console.log(credentials);
                const res = await fetch("/api/users/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json();
                console.log(user);

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        GitHubProvider({
            profile(profile) {
                console.log(`Github: ${profile}`);

                let userRole = "Github User";

                return {
                    ...profile,
                    role: userRole,
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            profile(profile) {
                console.log(`Google: ${profile}`);

                let userRole = "Google User";

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    },
};