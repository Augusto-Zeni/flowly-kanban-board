'use client'

import type { ReactNode } from 'react'
import {
  DialogContent,
  Dialog as DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@flowly/components/ui/dialog'
import { Chromium } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import secondaryLogo from '../../../public/secondary-logo.svg'

interface LoginModalProps {
  trigger: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function handleClickLogin() {
  signIn('google', { callbackUrl: '/dashboard' })
}

export default function LoginModal({ trigger, open, onOpenChange }: LoginModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 max-w-2xl overflow-hidden border-border">
        <DialogTitle className="sr-only">Comece gratuitamente</DialogTitle>
        <div className="flex min-h-[440px]">
          {/* Left panel — logo */}
          <div className="hidden sm:flex flex-col items-center justify-center w-2/5 bg-primary p-10 gap-4">
            <Image src={secondaryLogo} alt="Flowly Logo" width={56} height={56} />
            <span className="text-xl font-semibold text-black-primary">Flowly</span>
            <p className="text-black-primary/60 text-xs text-center leading-relaxed">
              Kanban intuitivo para times que querem entregar mais.
            </p>
          </div>

          {/* Right panel — informações */}
          <div className="flex flex-col justify-center w-full sm:w-3/5 bg-background p-10 gap-7">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-foreground text-2xl font-semibold">Comece gratuitamente</h2>
              <p className="text-muted-foreground text-sm">Sem cartão de crédito.</p>
            </div>

            <ul className="flex flex-col gap-3">
              {[
                'Quadros kanban ilimitados',
                'Colaboração em tempo real',
              ].map(item => (
                <li key={item} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full border border-border rounded-lg py-3 px-4 text-foreground text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
              onClick={handleClickLogin}
            >
              <Chromium size={18} />
              Continuar com Google
            </button>

            <p className="text-muted-foreground text-xs text-center">
              Ao continuar, você concorda com os
              {' '}
              <a href="#" className="text-primary underline-offset-2 hover:underline">Termos de Uso</a>
              {' '}
              e a
              {' '}
              <a href="#" className="text-primary underline-offset-2 hover:underline">Política de Privacidade</a>
              .
            </p>
          </div>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
