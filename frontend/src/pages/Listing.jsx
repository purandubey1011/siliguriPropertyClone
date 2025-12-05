import React , { Suspense } from 'react'
// import Listinghero from '../components/User/listing/Listinghero'
// import Listingform from '../components/User/listing/Listingform'
import Whylist from '../components/User/listing/Whylist.jsx'
import Navbar from '../components/Navbar'

const Listingform = React.lazy(() => import('../components/User/listing/Listingform.jsx'));


const Listing = () => {
  return (
    <div>
      <Navbar bgcolor='#CC0066'/>
      {/* <Listinghero/> */}
      <Suspense fallback={<div>Loading...</div>}>
      <Listingform />
      </Suspense>
      <Whylist/>
    </div>
  )
}

export default Listing

