import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { Book, BookPostRequest } from '../../features/types/types'
import { addBook, addNewBook, getAllBooks } from '../../features/slices/bookSlice'
import { validateNewBookData } from '../../features/validation/validate'
import { useNavigate } from 'react-router-dom'
import InputItem from '../FormControls/InputItem/InputItem'
import { getAllCategories } from '../../features/slices/categorySlice'
import { fetchAuthors } from '../../features/slices/authorSlice'
import OptionItem from '../FormControls/OptionItem/OptionItem'
import TextArea from '../FormControls/TextArea/TextArea'
import UploadImage from '../FormControls/UploadImage/UploadImage'
import { uploadImage } from '../../features/fetchAPI/fetchAPI'

function AddBook() {
  const token = useSelector((state: RootState) => state.auth.token)
  const [newBook, setNewBook] = useState<Book | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [validationError, setValidationError] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const authors = useSelector((state: RootState) => state.author.items)
  const categories = useSelector((state: RootState) => state.category.items)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    setNewBook((prevState) => ({
      ...(prevState as Book),
      [name]: value
    }))
  }

  const handleImage = (image: File, fileName: string) => {
    setCoverImage(image)
    setNewBook((prevState) => ({
      ...(prevState as Book),
      imageUrl: fileName
    }))
  }
  const handleSubmit: () => void = () => {
    if (token !== null && newBook !== null) {
      // All data needed in redux slice to send the request: token and body.
      const newBookReq: BookPostRequest = {
        data: newBook,
        token: token,
        coverImage: coverImage
      }
      // In case the user has tried to add data that was not valid, we must set validation error back to false.
      if (validationError) {
        setValidationError(false)
      }
      if (newBook) {
        if (validateNewBookData(newBook)) {
          dispatch(addNewBook(newBookReq))
          setNewBook(null)
          navigate('/books')
        } else {
          setValidationError(true)
        }
      }
    }
  }
  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(fetchAuthors())
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
            {/*         <InputItem
              fieldName="imageUrl"
              name="imageUrl"
              labelText="Image"
              placeholder="Add the URL of the book-cover here"
              type="text"
              handleChange={handleChange}
            /> */}
            <UploadImage onImageUpload={handleImage} />
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
            <InputItem
              fieldName="isbn"
              name="isbn"
              labelText="ISBN"
              placeholder="ISBN"
              type="text"
              handleChange={handleChange}
            />
            <Button label="Save" handleClick={handleSubmit} />
          </form>
        </div>
      ) : (
        'No authors!'
      )}
    </div>
  )
}

export default AddBook
