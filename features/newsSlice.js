import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchNews } from '@/utils/fetchNews'

export const getNewsArticles = createAsyncThunk(
  'news/getNewsArticles',
  async (params, { rejectWithValue }) => {
    try {
      const articles = await fetchNews(params)
      return articles
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // If you have local client-based updates or filters, handle them here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getNewsArticles.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.articles = action.payload
      })
      .addCase(getNewsArticles.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default newsSlice.reducer
