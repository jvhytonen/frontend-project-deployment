import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Category, CategoryPostRequest } from '../../features/types/types'
import InputItem from '../FormControls/InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch, RootState } from '../../store'
import { addNewCategory } from '../../features/slices/categorySlice'

function EditCategory() {
  const params = useParams()
  const [categoryData, setCategoryData] = useState<Category | null>(null)

  const token = useSelector((state: RootState) => state.auth.token)
  const categories = useSelector((state: RootState) => state.category)
  const categoryToEdit = categories.items
    ? categories.items?.find((category) => params.id === category.id)
    : null

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    setCategoryData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleSubmit: () => void = () => {
    if (token !== null && categoryData !== null) {
      // All data needed in redux slice to send the request: token and body.
      const categoryReq: CategoryPostRequest = {
        data: categoryData,
        token: token
      }
      if (categoryData) {
        dispatch(addNewCategory(categoryReq))
      }
      setCategoryData(null)
      navigate('/categories')
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full mt-[200px]">
      <h2 className="font-bold text-2xl">Add category:</h2>
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
          <Button label="Add category" handleClick={handleSubmit} />
        </div>
      </form>
    </div>
  )
}
export default EditCategory
