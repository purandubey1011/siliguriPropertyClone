import React from 'react'
import Navbar from '../components/Navbar'
import Propertydetail from '../components/User/Propertydetail/Propertydetail.jsx'
import Exploreneighbour from '../components/User/Propertydetail/Exploreneighbour.jsx'
import Rentorsell from '../components/User/home/Rentorsell'
import GetInTouch from '../components/User/home/GetInTouch'

const Propertdetailpage = () => {
  return (
    <div>
        <Navbar bgcolor={"#CC0066"}/>
        <Propertydetail/>
        <Exploreneighbour/>
        <Rentorsell/>
        <GetInTouch/>
    </div>
  )
}

export default Propertdetailpage