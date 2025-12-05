import React from 'react'
import Navbar from '../components/Navbar'
import Detail from '../components/User/Blogdetail/Detail.jsx'
import Relatedblog from '../components/User/Blogdetail/Relatedblog.jsx'
import  GetIn     from "../components/User/home/GetInTouch.jsx"

const Blogdetailpage = () => {
  return (
    <div>
        <Navbar bgcolor={"#CC0066"}/>
        <Detail/>
        <Relatedblog/>
        <GetIn/>
    </div>
  )
}

export default Blogdetailpage