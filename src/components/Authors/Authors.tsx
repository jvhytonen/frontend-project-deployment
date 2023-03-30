import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../store'
import { fetchAuthors } from '../../features/author/authorSlice'

function Authors() {
  const { items, error } = useSelector((state: RootState) => state.author)
  /*   const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchAuthors())
  }, []) */
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Our books: </h2>
      {items !== null
        ? items.map((item) => {
            return (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <Link to={`${item.id}`}>Read more</Link>
                </p>
              </div>
            )
          })
        : null}
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  )
}

export default Authors
