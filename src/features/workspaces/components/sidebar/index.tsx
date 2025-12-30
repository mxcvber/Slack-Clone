import { usePathname } from 'next/navigation'
import { SIDEBAR_BUTTON_INFOS } from '../../constants'
import UserButton from '@/components/user-button'
import SidebarButton from './sidebar-button'
import WorkspaceSwitcher from './workspace-switcher'

const Sidebar = () => {
  const pathname = usePathname()
  return (
    <aside className='w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4'>
      <WorkspaceSwitcher />
      {SIDEBAR_BUTTON_INFOS.map((buttonInfo) => (
        <SidebarButton
          key={buttonInfo.label}
          icon={buttonInfo.icon}
          label={buttonInfo.label}
          isActive={pathname.includes(buttonInfo.pathSegment)}
        />
      ))}

      <div className='flex flex-col items-center justify-center gap-y-1 mt-auto'>
        <UserButton />
      </div>
    </aside>
  )
}

export default Sidebar
