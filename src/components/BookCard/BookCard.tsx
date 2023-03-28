import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RootState, AppDispatch } from '../../store'
import { Book, BorrowBook } from '../../features/types/types'
import Button, { HandleClick } from '../Button/Button'
import { deleteBook, updateBook, borrowBook, returnBook } from '../../features/book/bookSlice'

function BookCard() {
  const user = useSelector((state: RootState) => state.user)
  const book = useSelector((state: RootState) => state.book)
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const filteredBook = book.items?.filter((item) => Number(params.id) === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null
  const deleteBookHandler: HandleClick = () => {
    if (bookItem !== null) {
      dispatch(deleteBook(bookItem.id))
    }
  }
  const editBookHandler: HandleClick = () => {
    // This will be implemented once there is form to use
    console.log('Editing Book here')
  }
  const borrowBookHandler: HandleClick = () => {
    if (bookItem !== null) {
      const today = new Date()
      const borrowDay = today.getTime()
      const returnDay = today.setDate(today.getDate() + 30)
      const borrowBookData: BorrowBook = {
        borrowDate: borrowDay,
        returnDate: returnDay,
        borrowerId: user.id as number,
        bookId: bookItem.id
      }
      dispatch(borrowBook(borrowBookData))
    }
  }
  const returnBookHandler: HandleClick = () => {
    if (bookItem !== null) {
      const returnBookData = {
        bookId: bookItem.id
      }
      dispatch(returnBook(returnBookData))
    }
  }

  return (
    <div className="border border-gray-100 bg-blue-300 w-2/5">
      {bookItem ? (
        <>
          <h3>{bookItem.title}</h3>
          <ul>
            <li>{bookItem.description}</li>
            <li>{bookItem.publisher}</li>
            <li>{bookItem.authors}</li>
            <li>{bookItem.published}</li>
            <li>{bookItem.ISBN}</li>
            {bookItem.isBorrowed && bookItem.borrowerId !== user.id ? (
              <li className="text-red-200">Borrowed: return date: {bookItem.returnDate}</li>
            ) : null}
            {bookItem.isBorrowed && bookItem.borrowerId === user.id ? (
              <li className="text-red-600">
                You have borrowed the book. Return day: {bookItem.returnDate}
              </li>
            ) : null}
            <li>
              {/* If the book is not borrowed, user can borrow it by clicking */}
              {user !== null && user.userType === 'user' && !bookItem.isBorrowed ? (
                <Button label="Click to borrow" type="borrow" handleClick={borrowBookHandler} />
              ) : null}
              {/* If the book is borrowed by the user, the user can return it clicking */}
              {user !== null && user.userType === 'user' && bookItem.borrowerId === user.id ? (
                <Button label="Return book" type="return" handleClick={returnBookHandler} />
              ) : null}
              {/* Admin can edit the details by clicking*/}
              {user !== null && user.userType === 'admin' ? (
                <Button label="Edit" type="edit" handleClick={editBookHandler} />
              ) : null}
              {/*Admin can delete book */}
              {user !== null && user.userType === 'admin' ? (
                <Button label="Delete" type="delete" handleClick={deleteBookHandler} />
              ) : null}
            </li>
          </ul>
        </>
      ) : null}
    </div>
  )
}

export default BookCard
