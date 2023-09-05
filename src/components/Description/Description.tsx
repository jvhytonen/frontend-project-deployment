import React from 'react'
import { Book } from '../../features/types/reduxTypes'

function Description({ description }: Partial<Book>) {
  return (
    <div className="h-1/4">
      <p className="mb-4 text-center text-base text-neutral-600 italic">{description}</p>
    </div>
  )
}

export default Description
