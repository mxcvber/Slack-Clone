'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'
import AvatarComponents from './avatar-components'

const UserButton = () => {
  const { signOut } = useAuthActions()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <AvatarComponents />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='center' side='right' className='w-60'>
        <DropdownMenuItem onClick={() => signOut()} className='h-10'>
          <LogOut className='size-4 mr-2' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
