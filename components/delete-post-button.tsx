"use client"

import React from "react"
import { Button } from "./ui/button"
import { deletePost } from "@/actions"
import { useRouter } from "next/navigation"

interface PropTypes {
  userId: string
  authorId: string
  postId: string
}

export default function DeletePostButton({
  userId,
  authorId,
  postId,
}: PropTypes) {
  const router = useRouter()

  const handleDelete = async () => {
    // todo prevent event bubbling 
    const deletedPost = await deletePost(userId, authorId, postId)

    console.log(router)
    router.refresh()
  }

  return (
    <Button onClick={handleDelete} variant="outline">
      Deletes
    </Button>
  )
}
