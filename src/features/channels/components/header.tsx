import useConfirm from '@/hooks/use-confirm'
import ChannelModal from './modals/channel-modal'

const Header = ({ name }: { name: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete this channel?',
    'You are about to delete this channel. This action is irreversible.'
  )

  return (
    <div className='bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
      <ConfirmDialog />

      <ChannelModal name={name} confirm={confirm} />
    </div>
  )
}

export default Header
