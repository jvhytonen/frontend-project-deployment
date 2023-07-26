import React, { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Book, BookPostRequest } from '../../features/types/types'
import { AppDispatch, RootState } from '../../store'
import Button from '../Button/Button'
import { updateBook } from '../../features/slices/bookSlice'
import { validateUpdatedBookData } from '../../features/validation/validate'
import InputItem from '../FormControls/InputItem/InputItem'
import OptionItem from '../FormControls/OptionItem/OptionItem'
import TextArea from '../FormControls/TextArea/TextArea'

function EditBook() {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const book = useSelector((state: RootState) => state.book)
  const token = useSelector((state: RootState) => state.auth.token)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const item = book.items ? book.items?.find((book) => params.id === book.id) : null
  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)
  const [validationError, setValidationError] = useState<boolean>(false)

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    if (bookToEdit !== null) {
      setBookToEdit((prevState) => ({
        ...(prevState as Book),
        [name]: value
      }))
    }
  }

  const handleSubmit: () => void = () => {
    // If the user has previously tried to update data that has validation error, it must be set to false.
    if (validationError) {
      setValidationError(false)
    }
    if (token !== null && bookToEdit) {
      //categoryId and authorId must be added to object before sending data to backend.
      bookToEdit.authorId = bookToEdit.author.id
      bookToEdit.categoryId = bookToEdit.category.id
      //All data needed in redux slice to send the request: token and body.
      const updatedBookReq: BookPostRequest = {
        data: bookToEdit,
        token: token
      }
      if (validateUpdatedBookData(bookToEdit)) {
        dispatch(updateBook(updatedBookReq))
        setBookToEdit(null)
      } else {
        setValidationError(true)
      }
    }
  }

  return (
    <>
      {validationError ? (
        <p className="text-lg bg-red-800 underline">Do not leave any field empty!</p>
      ) : null}
      {bookToEdit && authors !== null && categories !== null ? (
        <div className="flex flex-col justify-center items-center w-full mt-[100px]">
          <h2 className="font-bold text-2xl">Edit book:</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/* Title */}
            <InputItem
              fieldName="title"
              name="title"
              labelText="Title"
              value={bookToEdit.title}
              placeholder="Title"
              type="text"
              handleChange={handleChange}
            />
            {/* Author */}
            <OptionItem
              fieldName="Author"
              placeholder="Select an author"
              name="authorId"
              defaultValue={bookToEdit.author.id}
              items={authors}
              onChange={handleChange}
            />
            {/* Category */}
            <OptionItem
              fieldName="Category"
              placeholder="Select a category"
              name="categoryId"
              defaultValue={bookToEdit.category.id}
              items={categories}
              onChange={handleChange}
            />
            {/* Description */}
            <TextArea
              fieldName="description"
              labelText="Description about the book"
              placeholder="Write a short description about the book"
              handleChange={handleChange}
              defaultValue={bookToEdit.description}
            />
            {/*  <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description about the book
              </label>
            </div>
            <div className="mb-4">
              <textarea
                onChange={(event) => handleChange(event)}
                cols={50}
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={bookToEdit.description}
                name="description"
                id="description"
                placeholder="Write a short description about the author"
              />
            </div> */}
            {/* Imageurl */}
            <InputItem
              fieldName="imageUrl"
              name="imageUrl"
              labelText="Image"
              value={bookToEdit.imageUrl}
              placeholder="Add the URL of the book-cover here"
              type="text"
              handleChange={handleChange}
            />
            {/* Publisher */}
            <InputItem
              fieldName="publisher"
              name="publisher"
              labelText="Publisher"
              value={bookToEdit.publisher}
              placeholder="Publisher"
              type="text"
              handleChange={handleChange}
            />
            {/* Publish year */}
            <InputItem
              fieldName="yearPublished"
              name="yearPublished"
              labelText="Published"
              value={bookToEdit.yearPublished}
              placeholder="Year published"
              type="text"
              handleChange={handleChange}
            />
            {/* ISBN */}
            <InputItem
              fieldName="isbn"
              name="isbn"
              labelText="ISBN"
              value={bookToEdit.isbn}
              placeholder="ISBN"
              type="text"
              handleChange={handleChange}
            />
            <Button label="Save" handleClick={handleSubmit} />
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditBook
