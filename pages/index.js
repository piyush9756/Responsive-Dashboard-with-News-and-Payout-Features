import { signIn, useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  return (
    <Layout>
      <div className="text-center mt-10">
        {!session ? (
          <>
            <h1 className="text-2xl mb-4">Welcome to News Payout Dashboard</h1>
            <button
              onClick={() => signIn('google')}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Sign In with Google
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-4">Hello, {session.user?.name}!</h1>
            <p className="mb-4">Go to your dashboard to see articles and payouts.</p>
            <Link href="/dashboard">
              <a className="px-4 py-2 bg-green-500 text-white rounded">Go to Dashboard</a>
            </Link>
          </>
        )}
      </div>
    </Layout>
  )
}
