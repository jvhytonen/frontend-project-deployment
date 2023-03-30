import React from 'react'
import { Link } from 'react-router-dom'

import { BookIntroType } from '../../features/types/types'

function BookIntro({ ISBN, title, description }: BookIntroType) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>
        <Link to={`${ISBN}`}>Read more</Link>
      </p>
      <Link to={`/edit/${ISBN}`}>Edit</Link>
    </div>
  )
}

export default BookIntro
