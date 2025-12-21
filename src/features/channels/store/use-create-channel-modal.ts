import { create } from 'zustand'

interface CreateChannelModal {
  open: boolean

  setOpen: (onOpenChange: boolean) => void
}

export const useCreateChannelModal = create<CreateChannelModal>((set) => ({
  open: false,

  setOpen: (onOpenChange) => set({ open: onOpenChange }),
}))
