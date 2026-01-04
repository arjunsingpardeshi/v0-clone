import { onBoardUser } from '@/modules/auth/actions'
import NavBar from '@/modules/home/components/NavBar';
import { Props } from '@/types/interface'

const Layout = async({children}:Props) => {
    await onBoardUser();
  return (
    <main className="flex flex-col min-h-screen relative overflow-x-hidden">
      <NavBar />
      <div
        className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-size-[24px_24px]"
      />
      <div className="flex-1 w-full mt-20">
        {children}
      </div>
    </main>
  )
}

export default Layout