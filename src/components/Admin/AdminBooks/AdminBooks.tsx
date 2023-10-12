import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBook, getAllBooks } from '../../../features/slices/bookSlice'
import { getAllAuthors } from '../../../features/slices/authorSlice'
import { getAllCategories } from '../../../features/slices/categorySlice'

import { useNavigate } from 'react-router-dom'

import { askConfirmation, finished } from '../../../features/slices/modalSlice'
import { Book } from '../../../features/types/reduxTypes'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography
} from '@material-tailwind/react'
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'
import { S3IMAGEURL } from '../../../features/utils/variables'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'

function AdminBooks() {
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const modal = useSelector((state: RootState) => state.modal)
  const token = useSelector((state: RootState) => state.auth.token)
  const navigate = useNavigate()
  const handleDeleteConfirmation = (objToDelete: Book) => {
    setBookToDelete(objToDelete)
    dispatch(askConfirmation(`Are you sure you want to delete book "${objToDelete.title}"?`))
  }

  const handleDelete = async () => {
    if (token !== null && bookToDelete !== null && bookToDelete.id) {
      const deleteReq = {
        id: bookToDelete.id,
        token: token
      }
      await dispatch(deleteBook(deleteReq)).unwrap()
      dispatch(finished('Book deleted'))
      navigate('../admin/dashboard')
    }
  }

  const filter = (word: string) => {
    console.log(word)
  }
  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getAllAuthors())
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleDelete()
    }
  }, [modal.status])
  const headers = ['Title', 'Author', 'Year', 'Category', 'ISBN', 'Edit']

  return (
    <Card className="h-full w-full">
      <AdminSearchAndAdd
        label="These are all the books stored in the database."
        navigation="../books/add"
        section="book"
        filter={filter}
      />
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {headers.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {book.items !== null
              ? book.items.map(
                  ({ id, imageUrl, title, author, category, yearPublished, isbn }, index) => {
                    const isLast = index === book.items!.length - 1
                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={imageUrl ? S3IMAGEURL + imageUrl : 'defaultCover.jpg'}
                              alt={'No avatar'}
                              size="md"
                              variant="rounded"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />

                            <Typography variant="small" color="blue-gray" className="font-bold">
                              {title}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {author.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {yearPublished.slice(0, 4)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {category.name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {isbn}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit User">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    )
                  }
                )
              : null}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default AdminBooks
