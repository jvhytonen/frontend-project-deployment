import { useState } from 'react'
import { Author, Book, Category } from '../types/reduxTypes'

export const useFilter = () => {
  const [filteredItem, setFilteredItem] = useState<Book[] | Category[] | Author[] | null>(null)
  const handleFilter = (text: string, itemToFilter: Book[] | Category[] | Author[]) => {
    console.log('filtering')
  }
  return {
    filteredItem,
    handleFilter
  }
}
