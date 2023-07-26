import React from 'react'
import { TextAreaType } from '../../../features/types/types'

function TextArea({ fieldName, labelText, placeholder, handleChange, defaultValue }: TextAreaType) {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={fieldName}>
          {labelText}
        </label>
      </div>
      <div className="mb-4">
        <textarea
          onChange={(event) => handleChange(event)}
          cols={50}
          rows={4}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={defaultValue}
          name={fieldName}
          id={fieldName}
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

export default TextArea
