import React from 'react'
import { TableCell, TableRow } from '../TableItems/TableItems'
import { AppDispatch, RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCategory } from '../../features/slices/categorySlice'
import Button from '../Button/Button'
import AdminTable from '../AdminTable/AdminTable'

function AdminCategories() {
  const categories = useSelector((state: RootState) => state.category)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleNavigation = () => {
    navigate('../categories/add')
  }

  const handleDelete = (id: string | undefined) => {
    console.log(id)
    if (id !== undefined && token !== null) {
      const deleteReq = {
        id: id,
        token: token
      }
      dispatch(deleteCategory(deleteReq))
    } else {
      return
    }
  }

  const headers = ['Name', 'Actions']

  const rows =
    categories.items !== null && categories.items.length > 0
      ? categories.items.map((category) => {
          return (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Button
                  label="Edit category"
                  handleClick={() => navigate(`../categories/edit/${category.id}`)}
                  type="edit"
                />
                <Button
                  label="Delete category"
                  handleClick={() => handleDelete(category.id)}
                  type="delete"
                />
              </TableCell>
            </TableRow>
          )
        })
      : [
          <TableRow key={0}>
            <TableCell>No categories</TableCell>
          </TableRow>
        ]

  return (
    <>
      <AdminTable headers={headers} rows={rows} />
      <div className="flex justify-center">
        <Button label="Add new category" handleClick={handleNavigation} type="neutral" />
      </div>
    </>
  )
}

export default AdminCategories
