import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { AppDispatch, RootState } from '../../../store'
import Button from '../../Button/Button'
import { updateExistingBook, uploadImage } from '../../../features/slices/bookSlice'
import { validateUpdatedBookData } from '../../../features/validation/validate'
import InputItem from '../../FormControls/InputItem/InputItem'
import OptionItem from '../../FormControls/OptionItem/OptionItem'
import TextArea from '../../FormControls/TextArea/TextArea'
import UploadImage from '../../FormControls/UploadImage/UploadImage'
import { Book } from '../../../features/types/reduxTypes'
import { BookPostRequest } from '../../../features/types/requestTypes'
import { finished, openModal } from '../../../features/slices/modalSlice'

function EditBook() {
  const params = useParams()
  // Variables from Redux
  const book = useSelector((state: RootState) => state.book)
  const token = useSelector((state: RootState) => state.auth.token)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const modal = useSelector((state: RootState) => state.modal)
  // Item is the book to be edited.
  const item = book.items ? book.items?.find((book: Book) => params.id === book.id) : null

  const [bookToEdit, setBookToEdit] = useState<Book | null | undefined>(item)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

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
      imageUrl: bookToEdit?.isbn + '.jpg'
    }))
  }

  // Change image filename to isbn-number and upload it before sending other data to server.
  const handleImageUpload = async () => {
    if (coverImage && bookToEdit?.isbn) {
      const blob = new Blob([coverImage], { type: coverImage.type })
      const fileName = bookToEdit.isbn + '.jpg'
      const imageToUpload = new File([blob], fileName, { type: coverImage.type })
      await dispatch(uploadImage(imageToUpload)).unwrap()
    }
  }

  useEffect(() => {
    if (modal.type === 'confirmed') {
      handleSubmit()
    }
  }, [modal.type])

  const handleSubmit: () => void = async () => {
    // If the user has previously tried to update data that has validation error, it must be set to false.
    if (validationError) {
      setValidationError(false)
    }
    if (token !== null && bookToEdit) {
      await handleImageUpload()
      //categoryId and authorId must be added to object before sending data to backend.
      bookToEdit.authorId = bookToEdit.author.id
      bookToEdit.categoryId = bookToEdit.category.id
      // All data needed in redux slice to send the request: token and body.
      const updatedBookReq: BookPostRequest = {
        data: bookToEdit,
        token: token
      }
      if (validateUpdatedBookData(bookToEdit)) {
        await dispatch(updateExistingBook(updatedBookReq)).unwrap()
        dispatch(finished({ heading: 'Success', content: 'Book edited successfully' }))
        navigate('../admin/dashboard')
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
            <Button
              label="Update"
              handleClick={(e) => {
                e.preventDefault()
                dispatch(
                  openModal({
                    heading: 'Confirm action',
                    content: `Are you sure you want to edit book "${bookToEdit?.title}"?`
                  })
                )
              }}
              type="neutral"
            />
          </form>
        </div>
      ) : null}
    </>
  )
}

export default EditBook
