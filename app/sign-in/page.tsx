import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React from "react"

export default function page() {
  return (
    <form className="m-auto bg-muted p-4 mt-16 max-w-sm">
      <h1>Sign in</h1>
      <Label htmlFor="">Username</Label>
      <Input type="text" />
      <Label htmlFor="">Password</Label>
      <Input type="password" />
      <Link href="/sign-up" className="block">
        Create new account
      </Link>
      <Button className="w-full">Sign in</Button>
    </form>
  )
}
