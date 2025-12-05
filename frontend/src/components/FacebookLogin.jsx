import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../store/authSlice';

const FacebookLogin = () => {
   
 const dispatch = useDispatch();
 const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser()).then((res) => {
      console.log(res)
      if (res.type === 'auth/getcurrentuser/fulfilled') {
        navigate('/');
      }
    })
  }, []);

  return (
    <div>Loading...</div>
  )
}

export default FacebookLogin