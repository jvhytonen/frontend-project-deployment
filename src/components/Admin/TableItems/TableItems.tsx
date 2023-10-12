import React, { useEffect, useState } from 'react'
import { TableHeadingProps, TableBodyProps } from '../../../features/types/componentTypes'
import { Typography } from '@material-tailwind/react'
import { Author, Category } from '../../../features/types/reduxTypes'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { askConfirmation, finished } from '../../../features/slices/modalSlice'
import { AppDispatch, RootState } from '../../../store'
import { deleteAuthor } from '../../../features/slices/authorSlice'
import { deleteCategory } from '../../../features/slices/categorySlice'

export function TableHeading({ label }: TableHeadingProps) {
  return (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
        {label}
      </Typography>
    </th>
  )
}

export function TableBody({ items, feature }: TableBodyProps) {
  const [itemToDelete, setItemToDelete] = useState<Category | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)

  const handleDeleteConfirmation = (objToDelete: Category | Author) => {
    setItemToDelete(objToDelete)
    dispatch(askConfirmation(`Are you sure you want to delete "${objToDelete.name}"?`))
  }

  const handleDelete = async () => {
    if (itemToDelete !== null && itemToDelete.id !== undefined && token !== null) {
      const deleteReq = {
        id: itemToDelete.id,
        token: token
      }
      if (feature === 'authors') {
        await dispatch(deleteAuthor(deleteReq)).unwrap()
        dispatch(finished('Author deleted'))
        navigate('../admin/dashboard')
      } else if (feature === 'categories') {
        await dispatch(deleteCategory(deleteReq)).unwrap()
        dispatch(finished('Category deleted'))
        navigate('../admin/dashboard')
      } else {
        return
      }
    }
  }
  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleDelete()
    }
  }, [modal.status])
  return (
    <tbody>
      {items !== null ? (
        items.map((item, index) => {
          const isLast = index === items!.length - 1
          const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

          return (
            <tr key={item.name}>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                  onClick={() => navigate(`../${feature}/edit/${item.id}`)}>
                  Edit
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                  onClick={() => handleDeleteConfirmation(item)}>
                  Delete
                </Typography>
              </td>
            </tr>
          )
        })
      ) : (
        <tr>
          <td className="p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              No data
            </Typography>
          </td>
        </tr>
      )}
    </tbody>
  )
}
