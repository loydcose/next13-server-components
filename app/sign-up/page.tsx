import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React from "react"

export default function page() {
  return (
    <form className="m-auto bg-muted p-4 mt-16 max-w-sm">
    <h1>Sign up</h1>
    <Label htmlFor="">Username</Label>
    <Input type="text" />
    <Label htmlFor="">Password</Label>
    <Input type="password" />
    <Label htmlFor="">Confirm password</Label>
    <Input type="password" />
    <Link href="/sign-in" className="block">
      Have an account?
    </Link>
    <Button className="w-full">Sign up</Button>
  </form>
  )
}
