import React from 'react'

function UsernameField({ onChange }: { onChange: (value: string) => void }) {
  return (
    <div className="mb-4">
      <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
        Username/email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
        id="username"
        type="text"
        placeholder="Username or email"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default UsernameField
