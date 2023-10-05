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
    <section className="grid min-h-screen place-items-center p-8">
      <div className="container my-auto grid grid-cols-1 gap-8 lg:grid-cols-2">
        {items !== null
          ? items.map((item: Book) => {
              return (
                <BookCard
                  key={item.id}
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
      <Pagination />
    </section>
  )
}

export default Books

/* 
{items !== null
  ? items.map((item: Book) => {
      return (
        <BookIntro
          key={item.id}
          isbn={item.isbn}
          id={item.id}
          title={item.title}
          author={item.author}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      )
    })
  : null}
{error ? <p className="text-red-600">{error}</p> : null} */
// src={item.imageUrl ? S3IMAGEURL + item.imageUrl : 'defaultCover.jpg'}
