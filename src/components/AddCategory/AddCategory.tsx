import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AddCategoryType } from '../../features/types/types'
import InputItem from '../InputItem/InputItem'
import Button from '../Button/Button'
import { AppDispatch } from '../../store'
import { addNewAuthor } from '../../features/author/authorSlice'
import { validateAuthorData } from '../../features/validation/validate'
import { addNewCategory } from '../../features/category/categorySlice'

function AddCategory() {
  const [newCategory, setNewCategory] = useState<AddCategoryType | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => void = (e) => {
    const { value, name } = e.target
    setNewCategory((prevState) => ({
      ...(prevState as AddCategoryType),
      [name]: value
    }))
  }
  const handleSubmit: () => void = () => {
    event?.preventDefault()
    if (newCategory) {
      if (validateAuthorData(newCategory)) {
        dispatch(addNewCategory(newCategory))
      }
    }
    setNewCategory(null)
    navigate('/categories')
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
export default AddCategory
