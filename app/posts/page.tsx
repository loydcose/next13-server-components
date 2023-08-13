import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { posts } from "@/lib/posts"
import Link from "next/link"
import React from "react"

export default function page() {
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
            <span>{post.createdAt}</span>
            <div className="flex items-center gap-1 mt-4">
              <Link href="/posts/update/1">
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="outline">Delete</Button>
            </div>
          </Link>
        ))}
      </article>
    </section>
  )
}
