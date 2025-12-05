import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const UserLayout = () => {
  return (
    <div>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default UserLayout