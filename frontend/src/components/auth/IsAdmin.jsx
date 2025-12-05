import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAdmin } from '../../store/authSlice'

const IsAdmin = ({ children, redirectTo = '/signin' }) => {
  const usertype = useSelector(selectIsAdmin)
  const location = useLocation()
   
 
  // if (usertype=="user") {
  //   if (location.pathname === "/") {
  //     return children
  //   }
  //   return <Navigate to={"/"} replace state={{ from: location }} />
  // }
   
  if(usertype == "owner" && location.pathname == "/owner/signup") {
    return  <Navigate to="/owner/listing" replace state={{ from: location }} />
  }

  if(usertype == "none" && location.pathname.includes("/admin")) {
    return  <Navigate to="/" replace state={{ from: location }} />
  }

  if (usertype == "user" && location.pathname === '/signin' || location.pathname === '/signup') {
    return  <Navigate to="/" replace state={{ from: location }} />
  }

  if (usertype == "admin" && location.pathname === '/signin' || location.pathname === '/signup') {
    return  <Navigate to="/admin/dashboard" replace state={{ from: location }} />
  }
   
  
  return children
}

export default IsAdmin


