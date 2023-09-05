import React from 'react'
import { OptionItemType } from '../../../features/types/componentTypes'

function OptionItem({
  fieldName,
  placeholder,
  name,
  items,
  defaultValue,
  onChange
}: OptionItemType) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={fieldName}>
        {fieldName}
      </label>
      <select
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        defaultValue={defaultValue}
        name={name}>
        <option value="">{placeholder}</option>
        {Object.entries(items).map(([id, item]) => (
          <option key={id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default OptionItem
