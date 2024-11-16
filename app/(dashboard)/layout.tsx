import { SignedIn, UserButton } from '@clerk/nextjs'

import { BreadcrumbHeader } from '@/components/breadcrumb-header'
import { DesktopSidebar } from '@/components/desktop-sidebar'
import { ModeToggle } from '@/components/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />

          <div className="gap-1 flex items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />

        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default layout
