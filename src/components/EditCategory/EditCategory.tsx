import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Category, CategoryPostRequest, FormElement } from '../../features/types/types'
import InputItem from '../FormControls/InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { updateExistingCategory } from '../../features/slices/categorySlice'

function EditCategory() {
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

  const handleSubmit: () => void = () => {
    if (token !== null && categoryToEdit !== null && categoryToEdit !== undefined) {
      // All data needed in redux slice to send the request: token and body.
      const categoryReq: CategoryPostRequest = {
        data: categoryToEdit,
        token: token
      }
      if (categoryToEdit) {
        dispatch(updateExistingCategory(categoryReq))
      }
      setCategoryToEdit(null)
      navigate('/categories')
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full mt-[200px]">
      <h2 className="font-bold text-2xl">Edit category:</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <InputItem
          fieldName="name"
          name="name"
          labelText="Category name"
          placeholder="Add the name of the category here"
          value={categoryToEdit?.name}
          type="text"
          handleChange={handleChange}
        />
        <div>
          <Button label="Edit category" handleClick={handleSubmit} type="neutral" />
        </div>
      </form>
    </div>
  )
}
export default EditCategory
