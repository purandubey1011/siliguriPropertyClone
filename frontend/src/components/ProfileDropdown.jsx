import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../store/authSlice';
import { toast } from 'react-toastify';

const ProfileDropdown = ({isScrolled}) => {
     const dropdownRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const dispatch = useDispatch()


      useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  const user = useSelector((state)=> state.auth.user)

  return (
    <div>
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer
                    ${isScrolled ? 'bg-blue-600' : 'bg-blue-500'}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {user.avatar ? (
                    <img 
                      loading='lazy'
                      src={user.avatar} 
                      alt={user.firstName} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </span>
                  )}
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </Link>
                    {user.usertype=="owner"?<Link to="/owner/myproperties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Properties
                    </Link>:""}
                    {user.usertype=="admin"?<Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashbooard
                    </Link>:""}
                    <button 
                      onClick={() => {
                        dispatch(logOutUser()).then((res) => {
                          console.log(res)
                          if(res.type === '/logout/fulfilled'){
                            toast.error(res.payload.message, {
                              position: "bottom-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            })
                          }
                        });
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
    </div>
  )
}

export default ProfileDropdown