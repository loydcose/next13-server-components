import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authOptions } from "@/lib/auth"
// import { posts } from "@/lib/posts"
import { getServerSession } from "next-auth"
import Link from "next/link"
import React from "react"
import { notFound } from "next/navigation"
import { findUser, getPostsByUser } from "@/actions"
import { formatDate } from "@/lib/formatDate"
import DeletePostButton from "@/components/delete-post-button"

export default async function Page() {
  const session: UserSession | null = await getServerSession(authOptions)
  console.log(session?.user.id)

  // todo temporarily, we have to setup route blocking for un-auth users
  if (!session) {
    notFound()
  }

  const posts = await getPostsByUser(session.user.id)

  return (
    <section>
      <Input type="text" className="mb-4" />
      <div className="mb-4 flex items-center justify-between">
        <Button>Filter</Button>
        <Button>Sort</Button>
      </div>

      <div className="flex items-center mb-4 gap-2 flex-wrap justify-between">
        <h1 className="text-2xl font-bold">My posts</h1>
        <Link href="/posts/new">
          <Button>Create new</Button>
        </Link>
      </div>

      <article className="grid grid-template-columns-[repeat(auto-fit,_minmax(300px),_1fr)] gap-2">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="bg-muted hover:bg-muted/[.75] p-2"
          >
            <h2>{post.title}</h2>
            <p>by: Something</p>
            <span>{formatDate(post.createdAt)}</span>
            <div className="flex items-center gap-1 mt-4">
              <Link href={`/posts/update/${post.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <DeletePostButton
                userId={session.user.id}
                authorId={post.author.id}
                postId={post.id}
              />
            </div>
          </Link>
        ))}
      </article>
    </section>
  )
}
