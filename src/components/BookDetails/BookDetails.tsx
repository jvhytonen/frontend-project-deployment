import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RootState } from '../../store'
import Copies from '../Copies/Copies'
import { showYear } from '../../features/utils/helpers'

function BookDetails() {
  const book = useSelector((state: RootState) => state.book)
  const params = useParams()
  const filteredBook = book.items?.filter((item) => params.id === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null
  return (
    <div className="flex justify-center h-[50%] mt-[100px]">
      {bookItem ? (
        <div className="block w-[30%] my-8 rounded-lg bg-white shadow-lg dark:bg-neutral-700">
          <img
            className="rounded-t-lg"
            src={bookItem.imageUrl ? bookItem.imageUrl : '../defaultCover.jpg'}
            alt=""
          />
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {bookItem.title}
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {bookItem.description}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {/* Formats the date to a year */}
              Published: {showYear(bookItem.yearPublished)}
            </p>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Publisher: {bookItem.publisher}
            </p>
          </div>
          <Copies bookId={bookItem.id as string} />
        </div>
      ) : null}
    </div>
  )
}

export default BookDetails
