import React from 'react'
import { LucideIcon } from 'lucide-react'
import { IconType } from 'react-icons/lib'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useWorkspaceId } from '../../hooks/use-workspace-id'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sidebarItemVariants = cva(
  'flex items-center justify-start gap-1.5 font-normal text-sm h-7 px-[18px] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'bg-white/90 hover:bg-white/90 text-[#481349]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface SidebarItemProps {
  label: string
  icon: LucideIcon | IconType
  id: string
  variant?: VariantProps<typeof sidebarItemVariants>['variant']
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, id, variant }) => {
  const workspaceId = useWorkspaceId()

  return (
    <Button className={cn(sidebarItemVariants({ variant }))} variant='transparent' size='sm' asChild>
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className='size-3.5 mr-1 shrink-0' />
        <span className='text-sm truncate'>{label}</span>
      </Link>
    </Button>
  )
}

export default SidebarItem
