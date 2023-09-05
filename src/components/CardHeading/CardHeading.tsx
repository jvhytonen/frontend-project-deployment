import React from 'react'
import { Book } from '../../features/types/reduxTypes'

function CardHeading({ title, author }: Partial<Book>) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl md:text-5xl"> {title}</h3>
      <p className="text-base text-neutral-600">By: {author?.name}</p>
    </div>
  )
}

export default CardHeading
