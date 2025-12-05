import React from 'react'
import Navbar from '../components/Navbar'
import Blogmain from '../components/User/Blog/Blogmain.jsx'
import GetInTouch from '../components/User/home/GetInTouch.jsx'

const Blogpage = () => {
  return (
    <div>
      <Navbar bgcolor={"#CC0066"}/>
      <Blogmain/>
      <GetInTouch/>
    </div>
  )
}

export default Blogpage