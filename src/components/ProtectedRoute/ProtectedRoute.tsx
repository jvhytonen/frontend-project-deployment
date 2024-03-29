import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  component: React.FC
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
  const isAdmin = useSelector((state: RootState) => state.auth.items?.role)
  if (isAdmin === 'ADMIN') {
    return <Component />
  }
  return <Navigate to="/" />
}

export default ProtectedRoute
