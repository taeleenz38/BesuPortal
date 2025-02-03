import React from 'react'
import SignInForm from '../organisms/SignInForm'
import Image from 'next/image'

const SignIn = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 gap-0 p-0 m-0 text-black">
      <div className="relative h-60 lg:h-screen">
        <Image src="/images/LOGO.png" alt="logo" objectFit="cover" fill />
      </div>
      <SignInForm />
    </div>
  )
}

export default SignIn