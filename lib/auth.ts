import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { compare } from "bcryptjs"
import { findUser } from "@/actions"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const user = await findUser(credentials.username, true)

        // if user doesn't exist or passwords are incorrect
        if (!user || !(await compare(credentials.password, user.password))) {
          return null
        }

        return {
          id: user.id,
          email: null,
          name: user.username,
          username: user.username,
        }
      },
    }),
  ],
  callbacks: {
    // todo fix and experiment with this
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.name,
        },
      }
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user })
      if (user) {
        return {
          ...token,
          ...user,
        }
      }
      return token
    },
  },
}
