import { SIDEBAR_BUTTON_INFOS } from '../../constants'
import UserButton from '@/components/user-button'
import SidebarButton from './sidebar-button'
import WorkspaceSwitcher from './workspace-switcher'
import AvatarComponent from '@/components/user-button/avatar-component'
import { Id } from '../../../../../convex/_generated/dataModel'

const Sidebar = ({ workspaceId }: { workspaceId: Id<'workspaces'> }) => {
  return (
    <aside className='w-10 sm:w-[70px] h-full bg-dark-purple flex flex-col gap-y-4 items-center pt-[9px] pb-4'>
      <WorkspaceSwitcher workspaceId={workspaceId} />

      {SIDEBAR_BUTTON_INFOS.map((buttonInfo) => (
        <SidebarButton
          key={buttonInfo.label}
          icon={buttonInfo.icon}
          label={buttonInfo.label}
          isActive={buttonInfo.label === 'Home'}
        />
      ))}

      <div className='flex mt-auto'>
        <UserButton>
          <AvatarComponent />
        </UserButton>
      </div>
    </aside>
  )
}

export default Sidebar
