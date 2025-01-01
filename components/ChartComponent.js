import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function ChartComponent({ data }) {
  // Example data structure:
  // data = [{ author: 'John', count: 10 }, { author: 'Jane', count: 5 }]
  const chartData = {
    labels: data.map((item) => item.author || 'Unknown'),
    datasets: [
      {
        label: 'Articles Count',
        data: data.map((item) => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="w-full h-64 bg-white p-4 shadow rounded">
      <Bar data={chartData} options={options} />
    </div>
  )
}
