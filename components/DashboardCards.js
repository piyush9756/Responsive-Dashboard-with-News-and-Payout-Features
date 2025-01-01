export default function DashboardCards({ articlesCount, totalPayout }) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm font-bold mb-2">Total Articles</h3>
          <p className="text-2xl">{articlesCount}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-sm font-bold mb-2">Total Payout</h3>
          <p className="text-2xl">${totalPayout.toFixed(2)}</p>
        </div>
        {/* Add more cards if needed */}
      </div>
    )
  }
  