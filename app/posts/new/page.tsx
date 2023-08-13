import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import React from "react"

export default function page() {
  return (
    <section>
      <h1 className="text-2xl mb-4 font-bold">Create new blog</h1>
      <form action="">
        <Input type="text" placeholder="Enter blog title..." className="mb-4" />
        <Textarea
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
