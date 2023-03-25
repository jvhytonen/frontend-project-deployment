import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import BookCard from '../BookCard/BookCard'

function Books() {
  const book = useSelector((state: RootState) => state.book.items)
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Our books: </h2>
      {book !== null
        ? book.map((item) => {
            return (
              <BookCard
                key={item.ISBN}
                ISBN={item.ISBN}
                title={item.title}
                description={item.description}
                publisher={item.publisher}
                authors={item.authors}
                isBorrowed={item.isBorrowed}
                published={item.published}
                returnDate={item.returnDate}
              />
            )
          })
        : null}
    </div>
  )
}

export default Books
