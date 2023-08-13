import { ReactNode } from "react"
import Navbar from "./navbar"

export default function Container({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen w-11/12 max-w-3xl mx-auto py-16">
      <Navbar/>
      {children}
    </main>
  )
}
