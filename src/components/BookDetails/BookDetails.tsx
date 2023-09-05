import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RootState } from '../../store'
import Copies from '../Copies/Copies'
import { showYear } from '../../features/utils/helpers'
import { S3IMAGEURL } from '../../features/utils/variables'

function BookDetails() {
  const book = useSelector((state: RootState) => state.book)
  const params = useParams()
  const filteredBook = book.items?.filter((item) => params.id === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null
  return (
    <div>
      {bookItem ? (
        <div className="w-full flex mx-8 rounded-lg bg-white shadow-lg">
          <img
            className="rounded-lg max-w-[360px]"
            src={bookItem.imageUrl ? S3IMAGEURL + bookItem.imageUrl : '../defaultCover.jpg'}
            alt=""
          />
          <div className="m-7 font-bold flex-grow">
            <h3 className="text-center text-5xl"> {bookItem.title}</h3>
            <p className="text-center text-base text-neutral-600 justify-self-end">
              By: {bookItem.author.name}
            </p>
            <div className="flex justify-around mt-4 mb-8 border-y-2 border-gray-300">
              <p className="mb-4 text-base text-neutral-600 ">Category: {bookItem.category.name}</p>
              <p className="mb-4 text-base text-neutral-600 ">Publisher: {bookItem.publisher}</p>
              <p className="mb-4 text-base text-neutral-600 ">
                Published: {showYear(bookItem.yearPublished)}
              </p>
              <p className="mb-4 text-base text-neutral-600">ISBN: {bookItem.isbn}</p>
            </div>
            <div className="h-1/4">
              <p className="mb-4 text-center text-base text-neutral-600 italic">
                {bookItem.description}
              </p>
            </div>
            <div className="flex ml-4 mt-4 mb-8 border-t-2 border-gray-300">
              <Copies bookId={bookItem.id as string} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default BookDetails
