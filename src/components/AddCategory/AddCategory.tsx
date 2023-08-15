import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Category, CategoryPostRequest } from '../../features/types/types'
import InputItem from '../FormControls/InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { addNewAuthor } from '../../features/slices/authorSlice'
import { validateAuthorData } from '../../features/validation/validate'
import { addNewCategory } from '../../features/slices/categorySlice'
import Modal from '../Modal/Modal'

function AddCategory() {
  const token = useSelector((state: RootState) => state.auth.token)
  const [newCategory, setNewCategory] = useState<Category | null>(null)
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [showCompletion, setShowCompletion] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setNewCategory(null)
    navigate('../admin/dashboard')
  }

  const handleSubmit: () => void = async () => {
    event?.preventDefault()
    //close modal
    setShowConfirmation(false)
    if (token !== null && newCategory !== null) {
      // All data needed in redux slice to send the request: token and body.
      const categoryData: CategoryPostRequest = {
        data: newCategory,
        token: token
      }
      // Send data to server via Redux thunk
      if (newCategory) {
        await dispatch(addNewCategory(categoryData)).unwrap()
        setShowCompletion(true)
      }
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[200px]">
        <h2 className="font-bold text-2xl">Add category:</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <InputItem
            fieldName="name"
            name="name"
            labelText="Category name"
            placeholder="Add the name of the category here"
            type="text"
            handleChange={handleChange}
          />
          <div>
            <Button
              label="Add category"
              handleClick={(e) => {
                e.preventDefault()
                setShowConfirmation(true)
              }}
              type="neutral"
            />
          </div>
        </form>
      </div>
      {showConfirmation && (
        <Modal
          type="confirm"
          heading={'Confirm adding new category'}
          text={`Are you sure you want to add new category "${newCategory?.name}"?`}
          onConfirm={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      {showCompletion && (
        <Modal
          type="success"
          heading={'New category succesfully added'}
          text={`New category "${newCategory?.name}" added.`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}
export default AddCategory
