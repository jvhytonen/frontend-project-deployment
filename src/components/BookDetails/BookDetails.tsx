import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RootState } from '../../store'
import Copies from '../Copies/Copies'
// import BookCoverImage from '../BookCoverImage/BookCoverImage'
import CardHeading from '../CardHeading/CardHeading'
import CategoryAndPublisher from '../CategoryAndPublisher/CategoryAndPublisher'
import Description from '../Description/Description'
import { Book } from '../../features/types/reduxTypes'

function BookDetails() {
  const book = useSelector((state: RootState) => state.book)
  const params = useParams()
  const filteredBook = book.items?.filter((item: Book) => params.id === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null
  return (
    <div>
      {bookItem ? (
        <div className="block w-[90%] md:flex mx-8 rounded-lg bg-white shadow-lg">
          <div className="flex justify-center items-center">
            {/* <BookCoverImage imageUrl={bookItem.imageUrl} /> */}
          </div>
          <div className="h-full md:m-7 font-bold flex-grow">
            <CardHeading author={bookItem.author} title={bookItem.title} />
            <CategoryAndPublisher
              category={bookItem.category}
              publisher={bookItem.publisher}
              yearPublished={bookItem.yearPublished}
              isbn={bookItem.isbn}
            />
            <Description description={bookItem.description} />
            <div className="flex border-t-2 border-gray-300">
              <Copies bookId={bookItem.id as string} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default BookDetails
