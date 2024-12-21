import Logo from '@/components/logo'
import { ModeToggle } from '@/components/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  )
}

export default Layout
