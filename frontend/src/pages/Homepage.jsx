import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Homehero from '../components/User/home/Homehero.jsx'
import Gfs from '../components/User/home/Gfs.jsx'
import Recomandedproject from '../components/User/home/Recomandedproject.jsx'
import Featuredpropert from '../components/User/home/Featuredpropert.jsx'
import ComapanyProperty from '../components/User/home/Explorebyregion.jsx'
import Explorebyregion from '../components/User/home/Explorebyregion'
import ExplorePropertiesByRegion from '../components/User/home/ExplorePropertiesByRegion.jsx'
import HowWeHelp2 from '../components/User/home/HowWeHelp2.jsx'
import UpcomingProjects from '../components/User/home/UpcomingProjects.jsx'
import EmergingLocalities from '../components/User/home/EmergingLocalities.jsx'
import Rentorsell from '../components/User/home/Rentorsell.jsx'
import Ownertestimonial from '../components/User/home/Ownertestimonial.jsx'
import PropertyBlog from '../components/User/home/PropertyBlog.jsx'
import GetInTouch from '../components/User/home/GetInTouch.jsx'
// import Howwehelp from '../components/User/home/Howwehelp'

const Homepage = () => {
  return (
    <div>
      <Navbar bgcolor={"#FFFFFF1A"}/>
      <Homehero/>
      <Gfs/>
      <Recomandedproject/>
      <Featuredpropert/>
      {/* <ComapanyProperty/> */}
      <Explorebyregion/>
      <ExplorePropertiesByRegion/>
      <HowWeHelp2/>
      <UpcomingProjects/>
      <EmergingLocalities/>
      {/* <Howwehelp/> */}
      <Rentorsell/>
      <Ownertestimonial/>
      <PropertyBlog/>
      <GetInTouch/>
      <Footer/>
    </div>
  )
}

export default Homepage