"use server"

import { PrismaClient } from "@prisma/client"
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
        },
      },
    },
  })

  return post
}

export async function createPost(data: CreatePost) {
  const posts = await prisma.post.create({
    data,
  })
  return posts
}

export async function createUser(data: CreateUser) {
  const createdUser = await prisma.user.create({
    data,
  })
  return createdUser
}
