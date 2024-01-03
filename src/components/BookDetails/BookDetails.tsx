import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Accordion, AccordionBody, AccordionHeader, Typography } from '@material-tailwind/react'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

import { RootState } from '../../store'
import Copies from '../Copies/Copies'
import { Book } from '../../features/types/reduxTypes'
import { S3IMAGEURL } from '../../features/utils/variables'

function BookDetails() {
  const [open, setOpen] = useState<number>(0)
  const book = useSelector((state: RootState) => state.book)
  const params = useParams()
  const filteredBook = book.items?.filter((item: Book) => params.id === item.id)
  const bookItem = filteredBook ? filteredBook[0] : null

  /* Opening accordion and animating it. */
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value)
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 }
  }

  return (
    <section className="py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 bg-gray-100">
      <Link to="/books" className="hover:underline">
        <Typography variant="paragraph" className="hover:underline">
          Back
        </Typography>
      </Link>
      {bookItem ? (
        <>
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:max-w-1/3">
              <img
                src={bookItem.imageUrl ? S3IMAGEURL + bookItem.imageUrl : 'defaultCover.jpg'}
                alt="Book Cover"
                className="w-full md:max-w-md rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <Typography
                variant="h3"
                color="blue-gray"
                className="text-3xl md:text-5xl font-semibold mb-4">
                {bookItem.title}
              </Typography>
              <Typography variant="h4" color="blue-gray" className="text-xl font-semibold mb-2">
                Author: {bookItem.author.name}
              </Typography>
              <Typography variant="h5" color="blue-gray" className="text-lg mb-4">
                Category: {bookItem.category.name}
              </Typography>
              <Typography
                variant="paragraph"
                className="text-gray-700 text-md mb-8 leading-relaxed">
                {bookItem.description}
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Typography variant="paragraph" className="text-gray-600 font-semibold">
                    Year:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    {bookItem.yearPublished.slice(0, 4)}
                  </Typography>
                </div>
                <div>
                  <Typography variant="paragraph" className="text-gray-600 font-semibold">
                    Publisher:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    {bookItem.publisher}
                  </Typography>
                </div>
                <div>
                  <Typography variant="paragraph" className="text-gray-600 font-semibold">
                    ISBN:
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-700">
                    {bookItem.isbn}
                  </Typography>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* Copies-component under accordion */}
          <Accordion open={open === 1} animate={CUSTOM_ANIMATION}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              Click to show copies and availability{' '}
              {open ? (
                <ArrowUpIcon className="ml-2 h-6 w-6" />
              ) : (
                <ArrowDownIcon className="ml-2 h-6 w-6" />
              )}
            </AccordionHeader>
            <AccordionBody>
              <Copies bookId={bookItem.id as string} />
            </AccordionBody>
          </Accordion>
        </>
      ) : null}
    </section>
  )
}

export default BookDetails
