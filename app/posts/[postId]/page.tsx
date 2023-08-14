import { getPost } from "@/actions"
import { formatDate } from "@/lib/formatDate"
import React from "react"

interface PropTypes {
  params: {
    postId: string
  }
}

export default async function Page({ params: { postId } }: PropTypes) {
  const post = await getPost(postId)

  console.log({ post })

  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">{post?.title}</h1>
      <div className="flex items-center justify-between text-muted-foreground mb-8">
        <p>By: {post?.author.username}</p>
        <span>{post?.createdAt && formatDate(post?.createdAt)}</span>
      </div>

      <article>{post?.body}</article>
    </section>
  )
}
