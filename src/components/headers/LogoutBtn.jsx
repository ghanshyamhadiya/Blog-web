import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout()
      .then(() => {
        dispatch(logout())
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <button onClick={logoutHandler} className='px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center'>Logout</button>
  )
}

export default LogoutBtn
