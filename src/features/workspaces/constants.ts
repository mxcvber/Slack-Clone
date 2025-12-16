import { Bell, Home, MessageSquare, MoreHorizontal } from 'lucide-react'

export const SIDEBAR_BUTTON_INFOS = [
  { icon: Home, label: 'Home', pathSegment: '/workspace' },
  { icon: MessageSquare, label: 'DMs', pathSegment: '/dms' },
  { icon: Bell, label: 'Activity', pathSegment: '/activity' },
  { icon: MoreHorizontal, label: 'More', pathSegment: '/more' },
]
