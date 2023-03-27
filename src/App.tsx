import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css'
import { AppDispatch } from './store'
import Header from './components/Header/Header'
import { fetchBooks } from './features/book/bookSlice'
import { fetchAuthors } from './features/author/authorSlice'
import Content from './components/Content/Content'

function App() {
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
