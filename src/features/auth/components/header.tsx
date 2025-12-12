import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Header = ({ title }: { title: string }) => {
  return (
    <CardHeader className='px-0 pt-0'>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Use your email or another service to continue</CardDescription>
    </CardHeader>
  )
}

export default Header
