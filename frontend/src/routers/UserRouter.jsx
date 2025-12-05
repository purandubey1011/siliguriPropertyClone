import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage.jsx";
import Listpage from "../pages/Listpage.jsx";
import About from '../pages/About.jsx'
import Contact from '../pages/Contact.jsx'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
import Propertdetailpage from '../pages/Propertdetailpage.jsx'
import Regiondetailpage from '../pages/Regiondetailpage.jsx'
import Blogpage from '../pages/Blogpage'
import Blogdetailpage from '../pages/Blogdetailpage.jsx'
import Listing from '../pages/Listing.jsx'
import Signin from '../pages/auth/Signin.jsx'
import UserLayout from '../pages/UserLayout.jsx'
import Adminlayout from '../pages/Admin/Adminlayout.jsx'
import IsAdmin from '../components/auth/IsAdmin.jsx'
import Admindashboard from '../components/Admin/Admindashboard/Admindashboard.jsx'
import Leadtracker from '../components/Admin/Leadtracker/Leadtracker.jsx'
import PropertyListing from '../components/Admin/PropertyListing/PropertyListing.jsx'
import Users from '../components/Admin/Users/Users.jsx'
import Admindashboarddetail from '../components/Admin/Admindashboard/Admindashboarddetail.jsx'
import OwnerSignUp from '../pages/Owner/OwnerSignUp.jsx'
import SignUp from '../pages/auth/SignUp.jsx'
import GoogleLogin from '../components/GoogleLogin.jsx'
import FacebookLogin from '../components/FacebookLogin.jsx'
import OwnerProperties from '../components/Owner/OwnerProperties.jsx'
import UserProfile from "../components/User/profile/UserProfile.jsx";
// import ResetPassword from '../components/auth/signin/ResetPassword'

const UserRouter = () => {
 
  return (
    <div>
      <Routes>
        
        <Route path='/signin' element={<IsAdmin><Signin/></IsAdmin>}/>
            <Route path='/signup' element={<SignUp/>}/>
            {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

            <Route path='/admin' element={<IsAdmin><Adminlayout/></IsAdmin>}>
                <Route path='/admin/dashboard' element={<Admindashboard/>}/>
                <Route path='/admin/dashboard/:id' element={<Admindashboarddetail/>} />
              
                <Route path='/admin/property-listing' element={<PropertyListing/>} />
                <Route path='/admin/leadtracker' element={<Leadtracker/>} />
                <Route path='/admin/users' element={<Users/>} />
            </Route>

        <Route path="/" element={<Homepage />} />

        <Route path='/owner/signup' element={ <OwnerSignUp/>}/>
       <Route path='/owner/listing' element={<Listing/>} />
       <Route path='/owner/myproperties' element={<OwnerProperties/>} />

        <Route path='/google'  element={<GoogleLogin/>}/>/

       <Route path='/facebook'  element={<FacebookLogin/>}/>

        <Route path="/user" element={<UserLayout/>}>
          <Route path="/user/list" element={<Listpage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path='/user/about' element={<About/>} />
            <Route path='/user/contact' element={<Contact/>} />
            <Route path='/user/propertydetail/:id' element={<Propertdetailpage/>} />
            <Route path='/user/regiondetail/:id' element={<Regiondetailpage/>} />
            <Route path='/user/blog' element={<Blogpage/>} />
            <Route path='/user/blog/:id' element={<Blogdetailpage/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default UserRouter;
