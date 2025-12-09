'use client'
import { useState } from 'react'
import { SignInFlow } from '../types'
import SignInCard from './sign-in-card'
import SignUpCard from './sign-up-card'

const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('signIn')
  return (
    <section aria-label='Authentication section' className='h-full flex items-center justify-center bg-[#5c3b58]'>
      <div className='md:h-auto md:w-[420px]'>
        {state === 'signIn' ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
      </div>
    </section>
  )
}

export default AuthScreen
