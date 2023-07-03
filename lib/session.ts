// Procedures: 1. Github auth. 2. Log in and create users. 3. JWT

// In order to enhance readability of the code, calling the function when user 
// sign in, create actions.ts file to specify the function (getUser and createUser).

// Create jwt inside grafbase.config.ts file and the code inside this file.
// These functions allow for encoding and decoding JWT tokens using the jsonwebtoken library.

import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";

import { createUser, getUser } from "./actions";
import { SessionInterface, UserProfile } from "@/common.types";

export const authOptions: NextAuthOptions = {
  // Github login
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // JWT
  // These functions allow for encoding and decoding JWT tokens using the jsonwebtoken library.
  jwt: {
    encode: ({ secret, token }) => {
      // generate the encoded token.
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  // Log in and Create users
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    // This function will triger every time user visit the page.
    async session({ session }) {
      const email = session?.user?.email as string;
      // Combine the github user and projects, newSession is the new obj of 
      // combining these 2.
      try { 
        const data = await getUser(email) as { user?: UserProfile }

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    // This function will triger every time user sign in.
    async signIn({ user }: {
      user: AdapterUser | User
    }) {
      try {
        // get the user if they exist
        // if they don't exist, create them
        // return true if they exist or were created
        // getUser function comes from actions file.
        const userExists = await getUser(user?.email as string) as { user?: UserProfile }
        
        if (!userExists.user) {
          await createUser(user.name as string, user.email as string, user.image as string)
        }

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

// By calling getCurrentUser, you can obtain the current user's 
// session object, which can contain information such as the user's 
// ID, role, authentication status, or other relevant data. This session 
// object can then be used to determine the current user's identity and 
// perform authorization checks or retrieve user-specific data.

// Call the session in Navbar component
export async function getCurrentUser() {
  const session = await getServerSession(authOptions) as SessionInterface;

  return session;
}
