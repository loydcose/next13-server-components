"use client"

import { createPost } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { FormEvent, useState } from "react"

export default function Page() {
  const [formData, setFormData] = useState({ title: "", body: "" })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = { ...formData, authorId: "0e9c655a-ab1c-4ba6-93f5-d3bdf19b776b" }

    const response = await createPost(payload)
    console.log({ response })
    // todo error because no user exist before posting the authorId
  }

  return (
    <section>
      <h1 className="text-2xl mb-4 font-bold">Create new blog</h1>
      <form action="" onSubmit={handleSubmit}>
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
          <Button type="submit">Save</Button>
        </div>
      </form>
    </section>
  )
}
