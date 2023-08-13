import Link from "next/link"

export default function Navbar() {
  const isSignedIn = true

  return (
    <nav className="flex items-center gap-3 flex-wrap justify-between bg-muted p-4 mb-8">
      <Link href="/">Bloog</Link>
      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <>
            <Link href="/account">Account</Link>
            <Link href="/posts">My posts</Link>
            <Link href="/account">Sign out</Link>
          </>
        ) : (
          <Link href="/account">Sign in</Link>
        )}
      </div>
    </nav>
  )
}
