import React from 'react'
import Navbar from '../components/Navbar'
import List from '../components/User/List/List.jsx'
import Listhero from '../components/User/List/Listhero.jsx'

const Listpage = () => {
  return (
    <div>
        <Navbar bgcolor={"#CC0066"}/>
        <Listhero/>
        <List/>
    </div>
  )
}

export default Listpage