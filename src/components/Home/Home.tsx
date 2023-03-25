import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>
        Browse books{' '}
        <span className="text-blue-800 underline">
          <Link to="/books">here</Link>
        </span>
      </p>
      <p>
        If you want to borrow books, please
        <span className="text-blue-800 underline">
          <Link to="/login"> sign in</Link>
        </span>
      </p>
    </div>
  )
}

export default Home
