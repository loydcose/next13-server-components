"use client"

import { updatePost } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState, FormEvent } from "react"
import { Post } from "@prisma/client"

interface PropTypes {
  post: Post
  userId: string
  postId: string
}

export default function Update({ post, userId, postId }: PropTypes) {
  const [formData, setFormData] = useState({
    title: post.title,
    body: post.body,
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await updatePost(userId, postId, formData)
    console.log({ response })
  }

  return (
    <section>
      <h1 className="text-2xl mb-4 font-bold">Update blog</h1>
      <form onSubmit={handleSubmit} action="">
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          type="text"
          placeholder="Enter blog title..."
          className="mb-4"
        />
        <Textarea
          value={formData.body}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, body: e.target.value }))
          }
          name=""
          id=""
          cols={30}
          rows={30}
          placeholder="Enter body content..."
          className="mb-4"
        ></Textarea>
        <div className="ml-auto w-fit flex items-center gap-2">
          <Link href="/posts">
            <Button type="button" variant="outline">
              cancel
            </Button>
          </Link>
          <Button type="submit">Update</Button>
        </div>
      </form>
    </section>
  )
}
