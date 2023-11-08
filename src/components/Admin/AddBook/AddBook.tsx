import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

import { addNewBook, uploadImage } from '../../../features/slices/bookSlice'
import InputItem from '../../FormControls/InputItem/InputItem'
import { getAllCategories } from '../../../features/slices/categorySlice'
import { getAllAuthors } from '../../../features/slices/authorSlice'
import OptionItem from '../../FormControls/OptionItem/OptionItem'
import TextArea from '../../FormControls/TextArea/TextArea'
import UploadImage from '../../FormControls/UploadImage/UploadImage'
import { finished, openModal, openErrorModal } from '../../../features/slices/modalSlice'
import { Book } from '../../../features/types/reduxTypes'
import { BookPostRequest } from '../../../features/types/requestTypes'

function AddBook() {
  // Variables from Redux
  const token = useSelector((state: RootState) => state.auth.token)
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)
  const error = useSelector((state: RootState) => state.book.error)
  const modal = useSelector((state: RootState) => state.modal)
  // States
  const [newBook, setNewBook] = useState<Book | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<boolean>(false)
  // Actions
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (modal.type === 'confirmed') {
      handleSubmit()
    }
  }, [modal.type])

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    setNewBook((prevState) => ({
      ...(prevState as Book),
      [name]: value
    }))
  }
  // Sets cover image to it's own state and the filename to a state where everything else resides.
  const handleImage = (image: File) => {
    setCoverImage(image)
    if (newBook?.isbn) {
      setNewBook((prevState) => ({
        ...(prevState as Book),
        imageUrl: newBook?.isbn + '.jpg'
      }))
    }
  }
  // Change image filename to isbn-number and upload it before sending other data to server.
  const handleImageUpload = async () => {
    if (coverImage && newBook?.isbn) {
      const blob = new Blob([coverImage], { type: coverImage.type })
      const fileName = newBook.isbn + '.jpg'
      const imageToUpload = new File([blob], fileName, { type: coverImage.type })
      await dispatch(uploadImage(imageToUpload)).unwrap()
    }
  }

  const handleSubmit: () => void = async () => {
    if (token !== null && newBook !== null) {
      // Upload cover image first.
      await handleImageUpload()
      // All data needed in redux slice to send the request: token and body.
      const newBookReq: BookPostRequest = {
        data: newBook,
        token: token
      }
      if (newBook) {
        try {
          await dispatch(addNewBook(newBookReq)).unwrap()
          dispatch(finished({ heading: 'Success', content: 'A new book added succesfully' }))
          navigate('../admin/dashboard')
        } catch (err) {
          dispatch(openErrorModal({ heading: 'An error!', content: error }))
        }
      }
    }
  }
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllAuthors())
  }, [])
  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      {validationError ? (
        <p className="text-lg bg-red-800 underline">
          Please make sure you have filled all fields!{' '}
        </p>
      ) : null}
      {authors !== null && categories !== null ? (
        <div className="flex flex-col justify-center items-center w-full mt-[100px]">
          <h2 className="font-bold text-2xl">Add new book:</h2>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputItem
              fieldName="title"
              name="title"
              labelText="Title"
              placeholder="Title"
              type="text"
              handleChange={handleChange}
            />
            <OptionItem
              fieldName="Author"
              placeholder="Select an author"
              name="authorId"
              items={authors}
              onChange={handleChange}
            />
            <OptionItem
              fieldName="Category"
              placeholder="Select a category"
              name="categoryId"
              items={categories}
              onChange={handleChange}
            />
            <TextArea
              fieldName="description"
              labelText="Description about the book"
              placeholder="Write a short description about the book"
              handleChange={handleChange}
            />
            <InputItem
              fieldName="isbn"
              name="isbn"
              labelText="ISBN (You have to enter ISBN before adding cover image)"
              placeholder="ISBN"
              type="text"
              handleChange={handleChange}
            />
            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Selected Cover"
                style={{ maxWidth: '300px', marginTop: '10px' }}
              />
            )}
            {newBook !== null && newBook.isbn ? <UploadImage onImageUpload={handleImage} /> : null}
            <InputItem
              fieldName="publisher"
              name="publisher"
              labelText="Publisher"
              placeholder="Publisher"
              type="text"
              handleChange={handleChange}
            />
            <InputItem
              fieldName="yearPublished"
              name="yearPublished"
              labelText="Published"
              placeholder="Year published"
              type="text"
              handleChange={handleChange}
            />
            <Button
              color="blue"
              onClick={(e) => {
                e.preventDefault()
                dispatch(
                  openModal({
                    heading: 'Confirmation required',
                    content: `Are you sure you want to add new author "${newBook?.title}"?`
                  })
                )
              }}>
              Add book
            </Button>
          </form>
        </div>
      ) : (
        // One cannot add new book if there are no authors or categories in the database or they are unavailable.
        'No authors or categories found!'
      )}
    </div>
  )
}

export default AddBook
