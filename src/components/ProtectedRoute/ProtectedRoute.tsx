import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  component: React.FC
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin)
  if (isAdmin) {
    return <Component />
  }
  return <Navigate to="/" />
}

export default ProtectedRoute
