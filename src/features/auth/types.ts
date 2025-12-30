import { Dispatch, SetStateAction } from 'react'

export type SignInFlow = 'signIn' | 'signUp'

export interface AuthFormProps {
  pending: boolean
  setPending: Dispatch<SetStateAction<boolean>>
  setAuthError: Dispatch<SetStateAction<string | null>>
}

export interface AuthCardProps {
  setState: (state: SignInFlow) => void
  authError: string | null
  setAuthError: Dispatch<SetStateAction<string | null>>
  pending: boolean
  setPending: Dispatch<SetStateAction<boolean>>
  handleProviderAuth: (value: 'github' | 'google') => Promise<void>
}
