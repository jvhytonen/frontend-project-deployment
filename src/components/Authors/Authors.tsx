import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import AuthorCard from '../AuthorCard/AuthorCard'

function Authors() {
  const { items, error } = useSelector((state: RootState) => state.author)
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Authors </h2>
      {items !== null
        ? items.map((item) => {
            return (
              <AuthorCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
              />
            )
          })
        : null}
      {error ? <p className="text-red-600">{error}</p> : null}
    </div>
  )
}

export default Authors
