import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import InputItem from '../FormControls/InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { updateExistingCategory } from '../../features/slices/categorySlice'
import { askConfirmation, finished } from '../../features/slices/modalSlice'
import { Category } from '../../features/types/reduxTypes'
import { FormElement } from '../../features/types/componentTypes'
import { CategoryPostRequest } from '../../features/types/requestTypes'

function EditCategory() {
  const token = useSelector((state: RootState) => state.auth.token)
  const modal = useSelector((state: RootState) => state.modal)
  const categories = useSelector((state: RootState) => state.category)
  const params = useParams()
  const item = categories.items
    ? categories.items?.find((category: Category) => params.id === category.id)
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
  useEffect(() => {
    if (modal.status === 'confirmed') {
      handleSubmit()
    }
  }, [modal.status])

  const handleSubmit: () => void = async () => {
    event?.preventDefault()
    if (token !== null && categoryToEdit !== null && categoryToEdit !== undefined) {
      // All data needed in redux slice to send the request: token and body.
      const categoryReq: CategoryPostRequest = {
        data: categoryToEdit,
        token: token
      }
      // Send data to server via Redux thunk
      if (categoryToEdit) {
        await dispatch(updateExistingCategory(categoryReq)).unwrap()
        dispatch(finished('Category added succesfully!'))
        navigate('../admin/dashboard')
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
              label="Edit category"
              handleClick={(e) => {
                e.preventDefault()
                dispatch(
                  askConfirmation(
                    `Are you sure you want to edit category "${categoryToEdit?.name}"?`
                  )
                )
              }}
              type="neutral"
            />
          </div>
        </form>
      </div>
    </>
  )
}
export default EditCategory
