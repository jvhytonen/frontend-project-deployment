import React from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store'

function Logout() {
  const dispatch = useDispatch<AppDispatch>()
  return <div>You have been logged out.</div>
}

export default Logout
