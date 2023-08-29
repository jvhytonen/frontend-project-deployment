import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../store'
import BookIntro from '../BookIntro/BookIntro'
import { Book } from '../../features/types/types'
import { getAllBooks } from '../../features/slices/bookSlice'

export type FilterType = (e: string) => void

function Books() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, error } = useSelector((state: RootState) => state.book)
  const [filteredAuthors, setFilteredAuthors] = useState<Book[] | null>(items)

  const filterBooks = (author: string) => {
    console.log('Filtering books here...')
  }

  useEffect(() => {
    dispatch(getAllBooks())
  }, [])

  return (
    <section className="py-10 px-12">
      <h2 className="text-4xl font-bold text-center">Books: </h2>
      <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items !== null
          ? items.map((item) => {
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
        {error ? <p className="text-red-600">{error}</p> : null}
      </div>
    </section>
  )
}

export default Books
