import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { getAllAuthors } from '../../../features/slices/authorSlice'
import { getAllCategories } from '../../../features/slices/categorySlice'

import { Book } from '../../../features/types/reduxTypes'
import { Avatar, Card, CardBody, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/outline'
import { S3IMAGEURL } from '../../../features/utils/variables'
import AdminSearchAndAdd from '../AdminSearchAndAdd/AdminSearchAndAdd'
import TableHeading from '../TableHeading/TableHeading'
import DeleteItem from '../DeleteItem/DeleteItem'
import { getAllBooks } from '../../../features/slices/bookSlice'

function AdminBooks() {
  const dispatch = useDispatch<AppDispatch>()
  const allBooks = useSelector((state: RootState) => state.book.items)
  const [filteredBooks, setFilteredBooks] = useState<Book[] | null>()

  const filter = (word: string) => {
    if (allBooks !== null) {
      const matches = allBooks.filter(
        (book) =>
          book.title.includes(word) ||
          book.author.name.includes(word) ||
          book.isbn.includes(word) ||
          book.yearPublished.includes(word) ||
          book.publisher.includes(word)
      )
      setFilteredBooks(matches)
    }
  }

  useEffect(() => {
    dispatch(getAllBooks())
    dispatch(getAllAuthors())
    dispatch(getAllCategories())
  }, [])

  const headings = ['Title', 'Author', 'Year', 'Category', 'ISBN', 'Delete', 'Edit book', 'Copies']

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
            {headings.map((heading) => {
              return <TableHeading key={heading} label={heading} />
            })}
          </thead>
          <tbody>
            {filteredBooks !== null && filteredBooks !== undefined
              ? filteredBooks.map((item, index) => {
                  const isLast = index === filteredBooks!.length - 1
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                  return (
                    <tr key={item.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={item.imageUrl ? S3IMAGEURL + item.imageUrl : 'defaultCover.jpg'}
                            alt={'No avatar'}
                            size="md"
                            variant="rounded"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />

                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {item.title}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.author.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.yearPublished.slice(0, 4)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.category.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.isbn}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <DeleteItem feature="books" item={item} />
                      </td>
                      <td className={classes}>
                        <Link to={`/admin/dashboard/books/edit/${item.id}`}>
                          <Tooltip content="Edit book">
                            <IconButton variant="text">
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                      <td className={classes}>
                        <Link to={`/copies/edit/${item.id}`}>
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            Edit copies
                          </Typography>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </CardBody>
    </Card>
  )
}

export default AdminBooks
