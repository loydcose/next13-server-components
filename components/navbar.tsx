"use client"

import Link from "next/link"
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/buttons.component"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center gap-3 flex-wrap justify-between bg-muted p-4 mb-8">
      <Link href="/">Bloog</Link>
      <div className="flex items-center gap-3">
        {!!session ? (
          <>
            <Link href="/posts">My posts</Link>
            <Link href="/account">{session?.user?.name}</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        )}
      </div>
    </nav>
  )
}
