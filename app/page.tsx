import { getAllPosts } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authOptions } from "@/lib/auth"
import { formatDate } from "@/lib/formatDate"
import { getServerSession } from "next-auth"
// import { posts } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const posts = await getAllPosts()
  // const session = await getServerSession(authOptions)
  // console.log(session)

  return (
    <section>
      <Input type="text" placeholder="Search blog..." className="mb-4" />
      <div className="mb-4 flex items-center justify-between">
        <Button>Filter</Button>
        <Button>Sort</Button>
      </div>

      <h1 className="mb-4 text-2xl font-bold">Blog posts</h1>

      <article className="grid grid-template-columns-[repeat(auto-fit,_minmax(300px),_1fr)] gap-2">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className="bg-muted hover:bg-muted/[.75] p-2"
          >
            <h2>{post.title}</h2>
            <p>by: {post.author.username}</p>
            <span>{formatDate(post.createdAt)}</span>
          </Link>
        ))}
      </article>
    </section>
  )
}
