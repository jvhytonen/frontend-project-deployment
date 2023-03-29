import React from 'react'
import { Link } from 'react-router-dom'

import { BookIntroType } from '../../features/types/types'

function BookIntro({ ISBN, title, description, id }: BookIntroType) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <Link to={`${id}`}>Read more</Link>
      </p>
      <Link to={`/edit/${ISBN}`}>Edit</Link>
    </div>
  )
}

export default BookIntro
