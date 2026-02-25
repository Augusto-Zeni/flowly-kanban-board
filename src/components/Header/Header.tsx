import Button from '@flowly/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/logo.svg'
import MenuItem from './components/MenuItem'

export default function Header() {
  const handleClickStartFree = () => {
    // eslint-disable-next-line no-console
    console.log('Start free')
  }

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between p-7">
      <Link href="/" aria-label="Página inicial" className="flex items-center gap-2">
        <Image src={logo} alt="Flowly Logo" width={35} height={35} />
        <h1 className="text-xl font-semibold text-primary">Flowly</h1>
      </Link>

      <nav className="flex items-center gap-6">
        <ul className="flex gap-6">
          <MenuItem id="menu-item-home" isSelected>
            home
          </MenuItem>
          <MenuItem id="menu-item-recursos">
            recursos
          </MenuItem>
          <MenuItem id="menu-item-sobre">
            sobre
          </MenuItem>
          <MenuItem id="menu-item-contato">
            contato
          </MenuItem>
        </ul>

      </nav>
      <Button
        id="start-free-button"
        variant="primary"
        onClick={handleClickStartFree}
      >
        Começar grátis
      </Button>
    </header>
  )
}
