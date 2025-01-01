import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">News Payout Dashboard</div>
        <div>
          {!session ? (
            <button
              onClick={() => signIn('google')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
