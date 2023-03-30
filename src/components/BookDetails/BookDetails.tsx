import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { RootState, AppDispatch } from '../../store'
import { BorrowBook } from '../../features/types/types'
import Button, { HandleClick } from '../Button/Button'
import { deleteBook, borrowBook, returnBook } from '../../features/book/bookSlice'

function BookDetails() {
  const user = useSelector((state: RootState) => state.user)
  const book = useSelector((state: RootState) => state.book)
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const filteredBook = book.items?.filter((item) => Number(params.isbn) === item.ISBN)
  const bookItem = filteredBook ? filteredBook[0] : null

  const deleteBookHandler: HandleClick = () => {
    if (bookItem !== null) {
      dispatch(deleteBook(bookItem.id))
    }
  }

  const borrowBookHandler: HandleClick = () => {
    if (bookItem !== null) {
      const today = new Date()
      const returnMoment = today.setDate(today.getDate() + 30)
      const returnDay = new Date(returnMoment)
      const borrowBookData: BorrowBook = {
        borrowDate: today,
        returnDate: returnDay,
        borrowerId: user.id as number,
        id: bookItem.id
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
    <div className="flex justify-center h-[50%]">
      {bookItem ? (
        <div className="block w-[30%] my-8 rounded-lg bg-white shadow-lg dark:bg-neutral-700">
          {/* <img className="rounded-t-lg" src={`../${bookItem.url}`} alt="" /> */}
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {bookItem.title}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {bookItem.description}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Published: {bookItem.published}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Publisher: {bookItem.publisher}
            </p>
            <p>
              Availability:
              {bookItem.isBorrowed && bookItem.returnDate && bookItem.borrowerId !== user.id
                ? ' Borrowed, return date: ' + bookItem.returnDate.toString()
                : ' Free'}
            </p>
            {user.isLoggedIn && !user.isAdmin && !bookItem.isBorrowed ? (
              <Button label="Click to borrow" styleType="borrow" handleClick={borrowBookHandler} />
            ) : null}
            {user.isLoggedIn &&
            !user.isAdmin &&
            bookItem.isBorrowed &&
            bookItem.borrowerId === user.id ? (
              <div className="flex">
                <p>You have borrowed the book. Return day: {bookItem.returnDate?.toString()}</p>
                <Button label="Return book" styleType="return" handleClick={returnBookHandler} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default BookDetails
/* 
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
/*         {user !== null && user.isAdmin && !bookItem.isBorrowed ? (
          <Button
            label="Click to borrow"
            styleType="borrow"
            handleClick={borrowBookHandler}
          />
        ) : null} 
         {user !== null && user.isAdmin && bookItem.borrowerId === user.id ? (
          <Button label="Return book" styleType="return" handleClick={returnBookHandler} />
        ) : null} 
         {user !== null && user.isAdmin ? (
          <Link to={`/edit/${bookItem.ISBN}`}>Edit</Link>
        ) : null} 
        {user !== null && user.isAdmin ? (
          <Button label="Delete" styleType="delete" handleClick={deleteBookHandler} />
        ) : null}
      </li>
    </ul>
  </>
) : null}
</div> */
