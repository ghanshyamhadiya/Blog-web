
import React from 'react'
import { Login as LoginComponent } from '../components'

function Login() {
  return (
    <div className='py-8'>
      <LoginComponent /> {/* ✅ Works properly */}
    </div>
  )
}

export default Login
