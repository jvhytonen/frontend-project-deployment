import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import { AppDispatch, RootState } from './store'
import Header from './components/Header/Header'
import { fetchBooks } from './features/book/bookSlice'
import { fetchAuthors, addAuthor, updateAuthor, deleteAuthor } from './features/author/authorSlice'
import Content from './components/Content/Content'

function App() {
  const book = useSelector((state: RootState) => state.book.items)
  const author = useSelector((state: RootState) => state.author.items)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchBooks())
    dispatch(fetchAuthors())
  }, [])

  return (
    <div className="App w-full">
      <Header />
      <Content />
    </div>
  )
}

export default App
