import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Category, CategoryPostRequest, FormElement } from '../../features/types/types'
import InputItem from '../FormControls/InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { updateExistingCategory } from '../../features/slices/categorySlice'
import { useModal } from '../../features/hooks/useModal'
import Modal from '../Modal/Modal'

function EditCategory() {
  const {
    showConfirmation,
    showCompletion,
    confirmationText,
    handleConfirm,
    setShowConfirmation,
    setShowCompletion
  } = useModal()
  const token = useSelector((state: RootState) => state.auth.token)
  const categories = useSelector((state: RootState) => state.category)
  const params = useParams()
  const item = categories.items
    ? categories.items?.find((category) => params.id === category.id)
    : null
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null | undefined>(item)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange: (e: ChangeEvent<FormElement>) => void = (e) => {
    const { value, name } = e.target
    if (categoryToEdit !== null) {
      setCategoryToEdit((prevState) => ({
        ...(prevState as Category),
        [name]: value
      }))
    }
  }

  // In case the user don't want to add new category
  const handleCancel: () => void = () => {
    setShowConfirmation(false)
  }
  //When user clicks "ok" after successfull addition of category.
  const handleCompletionModalClosing: () => void = () => {
    setCategoryToEdit(null)
    navigate('../admin/dashboard')
  }

  const handleSubmit: () => void = async () => {
    event?.preventDefault()
    //close modal
    setShowConfirmation(false)
    if (token !== null && categoryToEdit !== null && categoryToEdit !== undefined) {
      // All data needed in redux slice to send the request: token and body.
      const categoryReq: CategoryPostRequest = {
        data: categoryToEdit,
        token: token
      }
      // Send data to server via Redux thunk
      if (categoryToEdit) {
        await dispatch(updateExistingCategory(categoryReq)).unwrap()
        setShowCompletion(true)
      }
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[200px]">
        <h2 className="font-bold text-2xl">Edit category:</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <InputItem
            fieldName="name"
            name="name"
            labelText="Category name"
            placeholder="Name of the category here"
            value={categoryToEdit?.name}
            type="text"
            handleChange={handleChange}
          />
          <div>
            <Button
              label="Update category"
              handleClick={(e) =>
                handleConfirm(
                  e,
                  `Are you sure you want to update category name to "${categoryToEdit?.name}"`
                )
              }
              type="neutral"
            />
          </div>
        </form>
      </div>
      {/* Modal to ask confirmation from the user. */}
      {showConfirmation && (
        <Modal
          type="confirm"
          heading={'Confirm updating category'}
          text={confirmationText}
          onConfirm={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      {/* Modal to show that the operation was succesfull. */}
      {showCompletion && (
        <Modal
          type="success"
          heading={'Succesful update'}
          text={`Category updated to "${categoryToEdit?.name}".`}
          onConfirm={handleCompletionModalClosing}
        />
      )}
    </>
  )
}
export default EditCategory
