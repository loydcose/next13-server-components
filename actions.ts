"use server"

import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
const prisma = new PrismaClient()

interface CreatePost {
  title: string
  body: string
  authorId: string
}
interface CreateUser {
  username: string
  password: string
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  })
  return posts
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      author: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  })

  return post
}

export async function getPostsByUser(authorId: string) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  })

  return posts
}

export async function createPost(data: CreatePost) {
  const posts = await prisma.post.create({
    data,
  })
  return posts
}

export async function createUser(data: CreateUser) {
  const { username, password } = data
  const hashedPassword = await hash(password, 12)

  // check first if username already exist
  const user = await findUser(username)
  if (user) {
    return null
  }

  const createdUser = await prisma.user.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  })
  return createdUser
}

export async function findUser(
  username: string,
  isPasswordIncluded: boolean = false
) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      password: isPasswordIncluded,
    },
  })

  return user
}

export async function updatePost(
  userId: string,
  postId: string,
  data: { title: string; body: string }
) {
  const { title, body } = data

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      body: body,
    },
  })

  return updatedPost
}
export async function deletePost(userId: string, authorId: string, postId: string) {
  console.log({ userId, authorId })

  if (userId !== authorId) {
    return null
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  })

  return deletedPost
}
