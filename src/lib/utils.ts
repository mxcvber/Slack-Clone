import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Id, TableNames } from '../../convex/_generated/dataModel'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const CONVEX_ID_REGEX = /^[a-z0-9]{32}$/

export function isConvexId<T extends TableNames>(value: unknown): value is Id<T> {
  return typeof value === 'string' && CONVEX_ID_REGEX.test(value)
}
