import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import {logout} from '../../../store/authSlice'
function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch( (error)=> {
            console.log("Appwrite service :: logoutBtn :: error", error );
        })
    }
  return (
    <button className='inlineBlock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn