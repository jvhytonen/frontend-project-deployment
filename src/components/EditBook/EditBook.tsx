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
import UploadImage from '../FormControls/UploadImage/UploadImage'

function EditBook() {
  const params = useParams()
  // Variables from Redux
  const book = useSelector((state: RootState) => state.book)
  const token = useSelector((state: RootState) => state.auth.token)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  // Item is the book to be edited.
  const item = book.items ? book.items?.find((book) => params.id === book.id) : null

  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

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
  // Sets cover image to it's own state and the filename to a state where everything else resides.
  const handleImage = (image: File, fileName: string) => {
    setCoverImage(image)
    setBookToEdit((prevState) => ({
      ...(prevState as Book),
      imageUrl: fileName
    }))
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
      // All data needed in redux slice to send the request: token and body.
      const updatedBookReq: BookPostRequest = {
        data: bookToEdit,
        token: token,
        coverImage: coverImage
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
            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Selected Cover"
                style={{ maxWidth: '300px', marginTop: '10px' }}
              />
            )}
            <UploadImage onImageUpload={handleImage} />
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
