import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportToCSV(data, filename = 'report.csv') {
  if (!data || !data.length) return

  const headers = Object.keys(data[0]).join(',')
  const csvData = data.map((row) => Object.values(row).join(',')).join('\n')
  const blob = new Blob([headers + '\n' + csvData], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(data) {
  if (!data || !data.length) return

  const doc = new jsPDF()
  const tableColumn = Object.keys(data[0])
  const tableRows = []

  data.forEach((row) => {
    tableRows.push(Object.values(row))
  })

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  })

  doc.save('report.pdf')
}
