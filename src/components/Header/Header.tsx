'use client'

import Button from '@flowly/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo from '../../../public/logo.svg'
import MenuItem from './components/MenuItem'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClickStartFree = () => {
    // eslint-disable-next-line no-console
    console.log('Start free')
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between p-5 md:p-7 z-50">
      <Link href="/" aria-label="Página inicial" className="flex items-center gap-2">
        <Image src={logo} alt="Flowly Logo" width={35} height={35} />
        <h1 className="text-xl font-semibold text-primary">Flowly</h1>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
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
        className="hidden md:block"
      >
        Começar grátis
      </Button>

      {/* Hamburger button */}
      <button
        type="button"
        className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <span
          className={`block w-6 h-0.5 bg-white-primary transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`block w-6 h-0.5 bg-white-primary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block w-6 h-0.5 bg-white-primary transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black-primary/80 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black-primary border-l border-white-primary/10 z-50 md:hidden flex flex-col pt-20 px-8 gap-8 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          type="button"
          className="absolute top-5 right-5 p-2 cursor-pointer"
          onClick={closeMenu}
          aria-label="Fechar menu"
        >
          <span className="block w-6 h-0.5 bg-white-primary rotate-45 translate-y-0.5" />
          <span className="block w-6 h-0.5 bg-white-primary -rotate-45" />
        </button>

        <nav>
          <ul className="flex flex-col gap-6">
            <li>
              <a href="#home" onClick={closeMenu} className="text-white-primary text-lg font-light hover:text-primary transition-colors">
                home
              </a>
            </li>
            <li>
              <a href="#recursos" onClick={closeMenu} className="text-white-primary text-lg font-light hover:text-primary transition-colors">
                recursos
              </a>
            </li>
            <li>
              <a href="#sobre" onClick={closeMenu} className="text-white-primary text-lg font-light hover:text-primary transition-colors">
                sobre
              </a>
            </li>
            <li>
              <a href="#contato" onClick={closeMenu} className="text-white-primary text-lg font-light hover:text-primary transition-colors">
                contato
              </a>
            </li>
          </ul>
        </nav>

        <Button
          id="start-free-button-mobile"
          variant="primary"
          onClick={() => {
            handleClickStartFree()
            closeMenu()
          }}
          className="w-full"
        >
          Começar grátis
        </Button>
      </div>
    </header>
  )
}
