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
import { Typography } from '@material-tailwind/react'
import { S3IMAGEURL } from '../../features/utils/variables'

function BookDetails() {
  const book = useSelector((state: RootState) => state.book)
  const params = useParams()
  const filteredBook = book.items?.filter((item: Book) => params.id === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null
  return (
    <section className="py-16 px-8 lg:py-28">
      {bookItem ? (
        <div className="container mx-auto grid items-center lg:grid-cols-2">
          <div className="row-start-2 mt-12 lg:row-auto lg:mt-0 lg:pr-12">
            <Typography color="blue-gray" className="mb-4 !font-semibold">
              {bookItem.category.name}
            </Typography>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-6 pr-5 text-3xl !leading-snug lg:text-5xl">
              {bookItem.title}
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-6 pr-5 text-2xl !leading-snug lg:text-5xl">
              {bookItem.author.name}
            </Typography>
            <Typography variant="lead" className="mb-12 !text-gray-500">
              {bookItem.description}
            </Typography>
          </div>
          <img
            src={bookItem.imageUrl ? S3IMAGEURL + bookItem.imageUrl : 'defaultCover.jpg'}
            alt="team work"
            className="h-[50vh] w-full rounded-xl object-contain object-center md:h-[60vh]"
          />
          <Copies bookId={bookItem.id as string} />
        </div>
      ) : null}
    </section>
  )
}

export default BookDetails
{
  /* <div>
      {bookItem ? (
        <div className="block w-[90%] md:flex mx-8 rounded-lg bg-white shadow-lg">
          <div className="flex justify-center items-center">
            {/* <BookCoverImage imageUrl={bookItem.imageUrl} /> 
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
    </div> */
}
