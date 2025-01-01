import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { getNewsArticles } from '@/features/newsSlice'
import Layout from '@/components/Layout'
import DashboardCards from '@/components/DashboardCards'
import ChartComponent from '@/components/ChartComponent'
import { exportToCSV, exportToPDF } from '@/utils/exportUtils'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const { articles, status: articleStatus } = useSelector((state) => state.news)

  const [search, setSearch] = useState('')
  const [filteredArticles, setFilteredArticles] = useState([])
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [typeFilter] = useState('') // e.g., "news" or "blogs" if you have type data

  // On component mount, fetch articles
  useEffect(() => {
    if (session?.user) {
      dispatch(getNewsArticles())
    }
  }, [dispatch, session])

  // Filter articles
  useEffect(() => {
    let result = articles
    // Global search by keyword in title or author
    if (search) {
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(search.toLowerCase()) ||
          a.author?.toLowerCase().includes(search.toLowerCase())
      )
    }
    // Date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start)
      const endDate = new Date(dateRange.end)
      result = result.filter((a) => {
        const published = new Date(a.publishedAt)
        return published >= startDate && published <= endDate
      })
    }
    // Type filter (if you have an article.type property)
    // if (typeFilter) {
    //   result = result.filter((a) => a.type === typeFilter)
    // }
    setFilteredArticles(result)
  }, [articles, search, dateRange, typeFilter])

  if (status === 'loading') return <p>Loading session...</p>
  if (!session) return <p>Please sign in to view the dashboard.</p>

  const totalPayout = filteredArticles.length * 10 // Example: $10 per article

  // Summarize for chart (by author)
  const authorSummary = filteredArticles.reduce((acc, item) => {
    const author = item.author || 'Unknown'
    if (!acc[author]) acc[author] = 0
    acc[author] += 1
    return acc
  }, {})
  const chartData = Object.entries(authorSummary).map(([author, count]) => ({
    author,
    count,
  }))

  return (
    <Layout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of news articles and payouts.</p>
      </div>

      <DashboardCards
        articlesCount={filteredArticles.length}
        totalPayout={totalPayout}
      />

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by author/title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full md:w-1/3"
        />
        <div className="flex items-center gap-2">
          <label>From:</label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="border p-1"
          />
          <label>To:</label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="border p-1"
          />
        </div>
      </div>

      {articleStatus === 'loading' && <p>Loading articles...</p>}
      {articleStatus === 'failed' && <p>Error loading articles.</p>}

      {/* Chart */}
      <ChartComponent data={chartData} />

      {/* Export Buttons */}
      <div className="my-4">
        <button
          onClick={() => exportToCSV(filteredArticles, 'articles.csv')}
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
        >
          Export CSV
        </button>
        <button
          onClick={() => exportToPDF(filteredArticles)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Export PDF
        </button>
      </div>

      {/* List of Filtered Articles */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Filtered Articles</h2>
        <ul className="max-h-64 overflow-auto">
          {filteredArticles.map((article, idx) => (
            <li key={idx} className="border-b py-2">
              <p className="font-semibold">{article.title}</p>
              <p className="text-sm text-gray-600">
                By {article.author || 'Unknown'} on {article.publishedAt}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
