import React from 'react'
import Navbar from '../components/Navbar'
import Contacthero from '../components/User/contactpage/Contacthero.jsx'
import Form from '../components/User/contactpage/Form.jsx'
import Commonquestion from '../components/User/contactpage/Commonquestion.jsx'
import Card from '../components/User/contactpage/Card.jsx'

const Contact = () => {
  return (
    <div>
      <Navbar bgcolor={"#CC0066"}/>
      <Contacthero/>
      <Form/>
      <Commonquestion/>
      <Card/>
    </div>
  )
}

export default Contact