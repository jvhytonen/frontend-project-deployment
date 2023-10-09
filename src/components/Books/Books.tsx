import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { S3IMAGEURL } from '../../features/utils/variables'
import { RootState, AppDispatch } from '../../store'
import { getAllBooks } from '../../features/slices/bookSlice'
import { Book } from '../../features/types/reduxTypes'
import Pagination from '../Pagination/Pagination'
import BookCard from '../BookCard/BookCard'

function Books() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, error } = useSelector((state: RootState) => state.book)

  useEffect(() => {
    dispatch(getAllBooks())
  }, [])

  return (
    <section className="py-10">
      <div className="mx-auto flex max-w-6xl flex-col justify-center px-2 ">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {items !== null
            ? items.map((item: Book) => {
                return (
                  <BookCard
                    key={item.id}
                    id={item.id as string}
                    imageUrl={item.imageUrl ? S3IMAGEURL + item.imageUrl : 'defaultCover.jpg'}
                    category={item.category.name}
                    title={item.title}
                    description={item.description}
                    yearPublished={item.yearPublished}
                    author={item.author.name}
                  />
                )
              })
            : null}
          {error ? <p className="text-red-600">{error}</p> : null}
        </div>
      </div>
      <div className="my-8">
        <Pagination />
      </div>
    </section>
  )
}

export default Books
