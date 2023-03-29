import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Book } from '../../features/types/types'
import { RootState } from '../../store'

function EditBook() {
  const params = useParams()
  const book = useSelector((state: RootState) => state.book)
  const item = book.items ? book.items?.find((book) => Number(params.isbn) === book.ISBN) : null
  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)

  const handleChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void = (e) => {
    const { value, name } = e.target
    if (bookToEdit !== null) {
      setBookToEdit((prevState) => ({
        ...(prevState as Book),
        [name]: value
      }))
    }
  }
  return (
    <div>
      {bookToEdit ? (
        <>
          <h2>Edit book:</h2>
          <div className="w-full m-3">
            <label htmlFor="title">Title </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              id="title"
              name="title"
              value={bookToEdit.title}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="w-full m-3">
            <label htmlFor="author">Author </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              id="authors"
              name="authors"
              value={bookToEdit.authors}
              type="text"
              placeholder="Authors"
            />
          </div>
          <div className="w-full m-3">
            <label htmlFor="description">Description about the book </label>
          </div>
          <div className="w-full border-2 border-black">
            <textarea
              onChange={(event) => handleChange(event)}
              cols={50}
              rows={4}
              value={bookToEdit.description}
              name="description"
              id="description"
              placeholder="Write a short description about the author"
            />
          </div>
          <div className="w-full m-3">
            <label htmlFor="publisher">Publisher </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              value={bookToEdit.publisher}
              id="publisher"
              name="publisher"
              type="text"
              placeholder="Publisher"
            />
          </div>
          <div className="w-full m-3">
            <label htmlFor="published">Published </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              value={bookToEdit.published}
              id="published"
              name="published"
              type="number"
              placeholder="Published"
            />
          </div>
          <div className="w-full m-3">
            <label htmlFor="isbn">ISBN </label>
          </div>
          <div className="w-full border-2 border-black">
            <input
              onChange={(event) => handleChange(event)}
              className="w-full"
              value={bookToEdit.ISBN}
              id="isbn"
              name="isbn"
              type="number"
              placeholder="ISBN"
            />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default EditBook
