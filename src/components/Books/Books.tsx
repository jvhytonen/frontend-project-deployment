import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import BookIntro from '../BookIntro/BookIntro'
import Search from '../Search/Search'

function Books() {
  const { items, error } = useSelector((state: RootState) => state.book)
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
