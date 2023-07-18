import React from 'react'

function PasswordField({
  onChange,
  labelText
}: {
  onChange: (value: string) => void
  labelText: string
}) {
  return (
    <div className="mb-6">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
        {labelText}
      </label>
      <input
        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
        id="password"
        type="password"
        placeholder="******************"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default PasswordField
