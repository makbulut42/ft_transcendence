import { faker } from '@faker-js/faker'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Dropdown } from '@/components/Dropdown'
import { ProfilePhoto } from '@/ui/ProfilePhoto'

const ProfileDropdownButton = () => (
  <div className="cursor-pointer rounded-full bg-neutral-300 p-0.5 shadow-xl duration-200 hover:brightness-110 focus:outline-none active:shadow-none active:brightness-150">
    <ProfilePhoto show={true} src={faker.image.avatar()} alt={faker.name.firstName()} size={50} />
  </div>
)

function HeaderProfileDropdownContent() {
  const router = useRouter()
  function handleLogout() {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div
      className="flex flex-col rounded-md bg-baklavaBlack-200 p-2 shadow-xl
        c:cursor-pointer c:bg-baklavaBlack-200 c:text-xl c:font-thin c-h:bg-baklavaBlack-100 c-a:brightness-150 c:p-2 c:duration-200"
    >
      <div>Sec-1</div>
      <div>Sec-2</div>
      <div>Sec-3</div>
      <div onClick={handleLogout} >Logout</div>
    </div>
  )
}

const HeaderProfileDropdown = () => {
  return (
    <>
      <Dropdown x="left" button={<ProfileDropdownButton />}>
        <HeaderProfileDropdownContent />
      </Dropdown>
    </>
  )
}

const HeaderProfile = () => <HeaderProfileDropdown />

const Header = () => {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(user)
    }
  }, [])

  return (
    <header className="relative flex  h-20 w-full items-center justify-center bg-gradient-to-r from-[#ad5389] to-[#3c1053] p-2 px-4 text-4xl font-extrabold text-white shadow-xl">
      <h1 className="absolute">Header</h1>
      <div className="flex w-full justify-end">{user && <HeaderProfile />}</div>
    </header>
  )
}

export { Header }
