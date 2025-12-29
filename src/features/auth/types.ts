import { Dispatch, SetStateAction } from 'react'

export type SignInFlow = 'signIn' | 'signUp'

export interface AuthProps {
  pending: boolean
  setPending: Dispatch<SetStateAction<boolean>>
  setAuthError: Dispatch<SetStateAction<string | null>>
}
