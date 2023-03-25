import React from 'react'
import { Book } from '../../features/book/bookSlice'

type BookCard = Omit<Book, 'borrowerId' | 'borrowDate' | 'id'>

function BookCard({
  ISBN,
  title,
  description,
  publisher,
  authors,
  isBorrowed,
  published,
  returnDate
}: BookCard) {
  return (
    <div className="border border-gray-100 bg-blue-300 w-2/5">
      <h3>{title}</h3>
      <ul>
        <li>{description}</li>
        <li>{publisher}</li>
        <li>{authors}</li>
        <li>{published}</li>
        <li>{ISBN}</li>
        {isBorrowed ? <li className="text-red-600">Borrowed: return date: {returnDate}</li> : null}
        <li>{}</li>
        <li>{}</li>
      </ul>
    </div>
  )
}

export default BookCard
