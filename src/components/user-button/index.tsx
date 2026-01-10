'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'
import AvatarComponents from './avatar-components'
import { useRouter } from 'next/navigation'

const UserButton = () => {
  const { signOut } = useAuthActions()

  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()

    router.replace('/auth')
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <AvatarComponents />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='center' side='right' className='w-60'>
        <DropdownMenuItem onClick={handleSignOut} className='h-10'>
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
