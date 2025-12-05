import React from 'react'
import Navbar from '../components/Navbar'
import Abouthero from '../components/User/aboutpage/Abouthero.jsx'
import OurStory from '../components/User/aboutpage/OurStory.jsx'
import Whybuy from '../components/User/Regiondetail/Whybuy.jsx'
import Explorebyregion from '../components/User/home/Explorebyregion'
import Rentorsell from '../components/User/home/Rentorsell'
import GetInTouch from '../components/User/home/GetInTouch'
import Peoplebehind from '../components/User/aboutpage/Peoplebehind.jsx'

const About = () => {
  return (
    <div>
      <Navbar bgcolor={"#CC0066"}/>
      <Abouthero/>
      <OurStory/>
      <Whybuy/>
      <Peoplebehind/>
      <Explorebyregion/>
      <Rentorsell/>
      <GetInTouch/>
    </div>
  )
}

export default About