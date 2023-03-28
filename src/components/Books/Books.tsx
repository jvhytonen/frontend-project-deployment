import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import BookCard from '../BookCard/BookCard'

function Books() {
  const { items, error } = useSelector((state: RootState) => state.book)
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Our books: </h2>
      {items !== null
        ? items.map((item) => {
            return (
              <BookCard
                key={item.id}
                id={item.id}
                ISBN={item.ISBN}
                title={item.title}
                description={item.description}
                publisher={item.publisher}
                authors={item.authors}
                isBorrowed={item.isBorrowed}
                borrowerId={item.borrowerId}
                published={item.published}
                returnDate={item.returnDate}
              />
            )
          })
        : null}
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  )
}

export default Books
