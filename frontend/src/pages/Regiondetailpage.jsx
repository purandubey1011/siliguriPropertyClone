import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Regionhero from '../components/User/Regiondetail/Regionhero.jsx'
import Whybuy from '../components/User/Regiondetail/Whybuy.jsx'
import FeaturedPropertyinRegion from '../components/User/Regiondetail/FeaturedPropertyinRegion.jsx'
import Howwehelp from '../components/User/home/Howwehelp.jsx'
import Explorebyregion from '../components/User/home/Explorebyregion.jsx'
import Rentorsell from '../components/User/home/Rentorsell.jsx'
import GetInTouch from '../components/User/home/GetInTouch.jsx'

const Regiondetailpage = () => {
  return (
    <div>
        <Navbar bgcolor={"#FFFFFF1A"}/>
        <Regionhero/>
        <Whybuy/>
        <FeaturedPropertyinRegion/>
        <Howwehelp/>
        <Explorebyregion/>
        <Rentorsell/>
        <GetInTouch/>
    </div>
  )
}

export default Regiondetailpage