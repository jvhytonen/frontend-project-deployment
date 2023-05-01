import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store'
import BookIntro from '../BookIntro/BookIntro'
import Search from '../Search/Search'
import FilterAuthors from '../FilterAuthors/FilterAuthors'
import { Book } from '../../features/types/types'

export type FilterType = (e: string) => void

function Books() {
  const { items, error } = useSelector((state: RootState) => state.book)
  const [filteredAuthors, setFilteredAuthors] = useState<Book[] | null>(items)

  const filterBooks = (author: string) => {
    console.log('Filtering authors here...')
  }

  return (
    <section className="bg-gray-100 py-10 px-12">
      <FilterAuthors filterBooks={filterBooks} />
      <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAuthors !== null
          ? filteredAuthors.map((item) => {
              return (
                <BookIntro
                  key={item.id}
                  ISBN={item.ISBN}
                  title={item.title}
                  authors={item.authors}
                  description={item.description}
                  url={item.url}
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
