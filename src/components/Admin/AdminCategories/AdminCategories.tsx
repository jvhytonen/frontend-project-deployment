import React, { useEffect, useState } from 'react'
import { TableBody } from '../TableItems/TableItems'

import { Category } from '../../../features/types/reduxTypes'
import { Card, Typography } from '@material-tailwind/react'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

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
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70">
                Category
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" colSpan={2}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70">
                Actions
              </Typography>
            </th>
          </tr>
        </thead>
        <TableBody items={categories} feature={'categories'} />
      </table>
    </Card>
  )
}

export default AdminCategories
