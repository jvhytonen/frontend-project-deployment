import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import AuthorCard from '../AuthorCard/AuthorCard'

function Authors() {
  const author = useSelector((state: RootState) => state.author.items)
  return (
    <div className="flex flex-col justify-center items-center">
      <h2>Authors </h2>
      {author !== null
        ? author.map((item) => {
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
    </div>
  )
}

export default Authors
