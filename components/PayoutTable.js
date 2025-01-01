import { useState, useEffect } from 'react'

export default function PayoutTable({ articles }) {
  const [payoutRate, setPayoutRate] = useState(10) // default $10 per article
  const [localArticles, setLocalArticles] = useState([])

  useEffect(() => {
    // Load from localStorage if available
    const savedRate = localStorage.getItem('payoutRate')
    if (savedRate) {
      setPayoutRate(parseFloat(savedRate))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('payoutRate', payoutRate)
  }, [payoutRate])

  useEffect(() => {
    // Summarize articles by author
    const authorMap = {}
    articles.forEach((article) => {
      const authorName = article.author || 'Unknown'
      if (!authorMap[authorName]) {
        authorMap[authorName] = 0
      }
      authorMap[authorName] += 1
    })
    const summary = Object.entries(authorMap).map(([author, count]) => ({
      author,
      count,
    }))
    setLocalArticles(summary)
  }, [articles])

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label className="font-bold">Payout Rate: </label>
        <input
          type="number"
          className="border p-1 ml-2 w-24"
          value={payoutRate}
          onChange={(e) => setPayoutRate(parseFloat(e.target.value) || 0)}
        />
        <span className="ml-2">$/article</span>
      </div>

      <table className="min-w-full bg-white border">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Articles</th>
            <th className="px-4 py-2 text-left">Payout</th>
          </tr>
        </thead>
        <tbody>
          {localArticles.map((item) => (
            <tr key={item.author} className="border-b">
              <td className="px-4 py-2">{item.author}</td>
              <td className="px-4 py-2">{item.count}</td>
              <td className="px-4 py-2">${(item.count * payoutRate).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
