export async function fetchNews() {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
      )
      const data = await res.json()
      return data.articles || []
    } catch (error) {
      console.error('Error fetching news:', error)
      throw new Error('Failed to fetch news.')
    }
  }
  