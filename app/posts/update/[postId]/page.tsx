import { notFound } from "next/navigation"
import Update from "./update"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { getPost } from "@/actions"

interface PropTypes {
  params: {
    postId: string
  }
}

export default async function Page({ params: { postId } }: PropTypes) {
  const session: UserSession | null = await getServerSession(authOptions)

  const post = await getPost(postId)
  if (session?.user?.id !== post?.author.id || !session || !post) {
    notFound()
  }

  return <Update post={post} userId={session?.user?.id} postId={postId} />
}
