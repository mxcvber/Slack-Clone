import React, { useState } from 'react'
import { Doc } from '../../../../../../convex/_generated/dataModel'
import InviteModal from '../../modals/invite-modal'
import PreferencesModal from '../../modals/preferences-modal'
import Dropdown from './dropdown'
import Actions from './actions'

interface WorkspaceHeaderProps {
  workspace: Doc<'workspaces'>
  isAdmin: boolean
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({ workspace, isAdmin }) => {
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)

  return (
    <>
      <InviteModal open={inviteOpen} setOpen={setInviteOpen} name={workspace.name} joinCode={workspace.joinCode} />

      <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name} />

      <div className='flex items-center justify-between px-4 h-[49px] gap-0.5'>
        <Dropdown
          workspace={workspace}
          isAdmin={isAdmin}
          setPreferencesOpen={setPreferencesOpen}
          setInviteOpen={setInviteOpen}
        />

        <Actions />
      </div>
    </>
  )
}

export default WorkspaceHeader
