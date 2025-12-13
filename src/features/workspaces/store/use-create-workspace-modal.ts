import { create } from 'zustand'

interface CreateWorkspaceModal {
  open: boolean

  setOpen: (onOpenChange: boolean) => void
}

export const useCreateWorkspaceModal = create<CreateWorkspaceModal>((set) => ({
  open: false,

  setOpen: (onOpenChange) => set({ open: onOpenChange }),
}))
