import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../store'
import { Book, BorrowBook } from '../../features/types/types'
import Button, { HandleClick } from '../Button/Button'
import { deleteBook, updateBook, borrowBook, returnBook } from '../../features/book/bookSlice'

type BookCard = Omit<Book, 'borrowDate'>

function BookCard({
  id,
  ISBN,
  title,
  description,
  publisher,
  authors,
  isBorrowed,
  borrowerId,
  published,
  returnDate
}: BookCard) {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const deleteBookHandler: HandleClick = () => {
    dispatch(deleteBook(id))
  }
  const updateBookHandler: HandleClick = () => {
    // This will be implemented once there is form to use
    console.log('Editing Book here')
  }

  const addBookHandler: HandleClick = () => {
    // This will be implemented once there is form to use for this purpose.
    console.log('Adding a new book')
  }
  const borrowBookHandler: HandleClick = () => {
    const today = new Date()
    const borrowDay = today.getTime()
    const returnDay = today.setDate(today.getDate() + 30)
    const borrowBookData: BorrowBook = {
      borrowDate: borrowDay,
      returnDate: returnDay,
      borrowerId: user.id as number,
      bookId: id
    }
    dispatch(borrowBook(borrowBookData))
  }
  const returnBookHandler: HandleClick = () => {
    const returnBookData = {
      bookId: id
    }
    dispatch(returnBook(returnBookData))
  }

  return (
    <div className="border border-gray-100 bg-blue-300 w-2/5">
      <h3>{title}</h3>
      <ul>
        <li>{description}</li>
        <li>{publisher}</li>
        <li>{authors}</li>
        <li>{published}</li>
        <li>{ISBN}</li>
        {isBorrowed && borrowerId !== user.id ? (
          <li className="text-red-200">Borrowed: return date: {returnDate}</li>
        ) : null}
        {isBorrowed && borrowerId === user.id ? (
          <li className="text-red-600">You have borrowed the book. Return day: {returnDate}</li>
        ) : null}

        <li>
          {/* If the book is not borrowed, user can borrow it by clicking */}
          {user !== null && user.userType === 'user' && !isBorrowed ? (
            <Button label="Click to borrow" type="borrow" handleClick={borrowBookHandler} />
          ) : null}
          {/* If the book is borrowed by the user, the user can return it clicking */}
          {user !== null && user.userType === 'user' && borrowerId === user.id ? (
            <Button label="Return book" type="return" handleClick={returnBookHandler} />
          ) : null}
          {/* Admin can edit the details by clicking*/}
          {/*         {user !== null && user.userType === 'admin' ? (
            <Button label="Edit" type="edit" handleClick={editBookEvent(id)} />
          ) : null} */}
          {/*Admin can delete book */}
          {user !== null && user.userType === 'admin' ? (
            <Button label="Delete" type="delete" handleClick={deleteBookHandler} />
          ) : null}
        </li>
      </ul>
    </div>
  )
}

export default BookCard
