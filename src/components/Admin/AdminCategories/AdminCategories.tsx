import React, { useEffect, useState } from 'react'
import { TableBody } from '../TableBody/TableBody'

import { Category } from '../../../features/types/reduxTypes'
import { Card } from '@material-tailwind/react'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import TableHeading from '../TableHeading/TableHeading'

function AdminCategories() {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const allCategories = useSelector((state: RootState) => state.category.items)

  const filter = (word: string) => {
    if (allCategories !== null) {
      const matches = allCategories.filter((category) => category.name.includes(word))
      setCategories(matches)
    }
  }

  useEffect(() => {
    setCategories(allCategories)
  }, [])

  const headings = ['Category', 'Edit', 'Delete']

  return (
    <Card className="h-full w-full">
      <AdminSearchAndAdd
        label="These are all the categories in the database."
        navigation="../categories/add"
        section="category"
        filter={filter}
      />
      <table className="w-full h-[50%] table-auto text-left">
        <thead>
          {headings.map((heading) => {
            return <TableHeading key={heading} label={heading} />
          })}
        </thead>
        <TableBody items={categories} feature={'categories'} />
      </table>
    </Card>
  )
}

export default AdminCategories
