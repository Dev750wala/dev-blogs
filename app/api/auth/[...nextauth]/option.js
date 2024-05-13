import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import USER from "@/utils/user-model";
import { dbConnect, dbDisconnect } from "@/utils/connnectionToDb";


export const options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
                usernameOrEmail: { 
                        label: "Username or Email", 
                        type: "text", 
                        placeholder: "jsmith", 
                        required: true 
                    },
                password: { 
                    label: "Password", 
                    type: "password", 
                    placeholder: "●●●●●●●●●●", 
                    required: true 
                },
            },

            async authorize(credentials) {
                console.log(credentials);
                await dbConnect();
                try {
                    const foundUser = await USER.findOne({
                        $or: [
                            { username: credentials.usernameOrEmail },
                            { email: credentials.usernameOrEmail }
                        ]
                    }).lean().exec();

                    if (foundUser) {
                        console.log("User Exists");
                        //   const match = await bcrypt.compare(
                        //     credentials.password,
                        //     foundUser.password
                        //   );

                        if (credentials.password === foundUser.password) {
                            console.log("Good Pass");
                            delete foundUser.password;

                            foundUser["role"] = "Unverified Email";
                            return foundUser;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                dbDisconnect();
                return null;
            }
        }),
        GitHubProvider({
            async profile(profile) {
                await dbConnect();
                console.log(`Github: ${JSON.stringify(profile)}`);

                let userRole = "Github User";
                
                try {
                    const userAlreadyExists = await USER.findOne({ email: profile.email });

                    if (!userAlreadyExists) {
                        console.log("user does not exist");
                        const newUser = await USER.create({
                            name: profile.name,
                            email: profile.email,
                            githubId: profile.id,
                            oAuthProvider: "github",
                        });
                    }
                } catch(error) {
                    console.log(error);
                } finally {
                    dbDisconnect();
                }
                
                return {
                    ...profile,
                    role: userRole,
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            async profile(profile) {
                await dbConnect();
                console.log(`Google: ${JSON.stringify(profile)}`);
                let userRole = "Google User";

                try {
                    
                    const userAlreadyExists = await USER.findOne({ email: profile.email });

                    if (!userAlreadyExists) {
                        console.log("user does not exist");
                        const newUser = await USER.create({
                            name: profile.name,
                            email: profile.email,
                            googleId: profile.sub,
                            oAuthProvider: "google",
                        });
                    }
                } catch(error) {
                    console.log(error);
                } finally {
                    dbDisconnect();
                }

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