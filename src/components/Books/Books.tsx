import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../store'
import BookIntro from '../BookIntro/BookIntro'
import Search from '../Search/Search'
import { fetchBooks } from '../../features/book/bookSlice'

function Books() {
  const { items, error } = useSelector((state: RootState) => state.book)
  /*   const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchBooks())
  }, []) */

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Our books: </h2>
      <Search />
      {items !== null
        ? items.map((item) => {
            return (
              <BookIntro
                key={item.id}
                ISBN={item.ISBN}
                title={item.title}
                description={item.description}
                id={item.id}
              />
            )
          })
        : null}
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  )
}

export default Books
