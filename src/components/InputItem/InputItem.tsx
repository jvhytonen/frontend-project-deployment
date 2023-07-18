import React from 'react'
import { InputItemType } from '../../features/types/types'

function InputItem({
  fieldName,
  type,
  placeholder,
  labelText,
  value,
  handleChange
}: InputItemType) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={fieldName}>
        {labelText}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(event) => handleChange(event)}
        id={fieldName}
        name={fieldName}
        value={value}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputItem
