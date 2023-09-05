import { Book } from '../../features/types/reduxTypes'
import { showYear } from '../../features/utils/helpers'

function CategoryAndPublisher({ category, publisher, yearPublished, isbn }: Partial<Book>) {
  return (
    <div className="flex flex-wrap justify-between text-sm md:text-base mt-4 mb-8 border-y-2 border-gray-300">
      <div className="w-1/2 md:w-1/5">
        <p className="mb-4 text-neutral-600 ">Category: {category?.name}</p>
      </div>
      <div className="w-1/2 md:w-1/5">
        <p className="mb-4 text-neutral-600 ">Publisher: {publisher}</p>
      </div>
      <div className="w-1/2 md:w-1/5">
        <p className="mb-4 text-neutral-600 ">Published: {showYear(yearPublished as string)}</p>
      </div>
      <div className="w-1/2 md:w-1/5">
        <p className="mb-4 text-neutral-600">ISBN: {isbn}</p>
      </div>
    </div>
  )
}

export default CategoryAndPublisher
