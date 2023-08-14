"use client"

import { createUser } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React, { FormEvent, useState } from "react"

export default function Page() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { username, password, confirmPassword } = formData
    if (password !== confirmPassword) {
      console.log("Password didn't match")
      return
    }
    const response = await createUser({ username, password })
    console.log({ response })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto bg-muted p-4 mt-16 max-w-sm"
    >
      <h1>Sign up</h1>
      <Label htmlFor="">Username</Label>
      <Input
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        type="text"
      />
      <Label htmlFor="">Password</Label>
      <Input
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        type="password"
      />
      <Label htmlFor="">Confirm password</Label>
      <Input
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
        }
        type="password"
      />
      <Link href="/sign-in" className="block">
        Have an account?
      </Link>
      <Button className="w-full">Sign up</Button>
    </form>
  )
}
