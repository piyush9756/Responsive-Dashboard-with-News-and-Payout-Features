import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import Layout from '@/components/Layout'
import PayoutTable from '@/components/PayoutTable'

export default function PayoutPage() {
  const { data: session, status } = useSession()
  const { articles } = useSelector((state) => state.news)

  if (status === 'loading') return <p>Loading session...</p>
  if (!session) return <p>Please sign in to view the payout details.</p>

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Payout Details</h1>
      <p className="text-gray-600 mb-4">View and update your payout rates.</p>
      <PayoutTable articles={articles} />
    </Layout>
  )
}
