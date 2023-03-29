import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootState } from '../../store'

function Books() {
  const { items, error } = useSelector((state: RootState) => state.book)
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Our books: </h2>
      {items !== null
        ? items.map((item) => {
            return (
              <div key={item.ISBN}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  <Link to={`${item.id}`}>Read more</Link>
                </p>
                <Link to={`/edit/${item.ISBN}`}>Edit</Link>
              </div>
            )
          })
        : null}
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  )
}

export default Books
