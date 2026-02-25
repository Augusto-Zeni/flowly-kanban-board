'use client'

import Button from '@flowly/components/Button/Button'
import Header from '@flowly/components/Header/Header'
import Spline from '@splinetool/react-spline'

export default function Page() {
  const handleClickStartFree = () => {
    // eslint-disable-next-line no-console
    console.log('Start free')
  }

  return (
    <div className="h-screen w-full">
      {/* Hero principal com Spline */}
      <main className="relative h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-full h-full">
          <Spline
            scene="https://prod.spline.design/vRiG1UG2bscPQ0RN/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />

          <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-center px-7">
            <h1 className="text-white-primary text-8xl">
              Onde suas ideias
              {' '}
              <br />
              encontram o
              {' '}
              <span className="text-primary">fluxo</span>
            </h1>

            <hr className="w-1/3 border-t border-white-primary opacity-30 my-7" />

            <h2 className="text-white-primary text-xl font-light">
              A maneira mais inteligente de organizar seu fluxo de trabalho.
            </h2>

            <Button
              id="start-free-button"
              variant="primary"
              onClick={handleClickStartFree}
              className="mt-7 w-fit"
            >
              Começar Gratuitamente
            </Button>
          </div>
        </div>
      </main>

      {/* Cabeçalho */}
      <Header />

      {/* Seção de features */}
      {/* <section id="features" className="py-20 px-6 text-center">
        <h3 className="text-2xl font-semibold mb-6">Recursos principais</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>Recurso 1</div>
          <div>Recurso 2</div>
          <div>Recurso 3</div>
        </div>
      </section> */}

      {/* Seção sobre */}
      {/* <section id="about" className="py-20 px-6">
        <h3 className="text-2xl font-semibold mb-6">Sobre o app</h3>
        <p className="max-w-2xl mx-auto">
          Aqui você explica brevemente o propósito do aplicativo.
        </p>
      </section> */}

      {/* Seção de call-to-action */}
      {/* <section id="download" className="py-20 px-6 bg-gray-100 text-center">
        <h3 className="text-2xl font-semibold mb-6">Pronto para começar?</h3>
        <a
          href="#"
          className="px-8 py-4 bg-green-600 text-white rounded-xl"
        >
          Baixar agora
        </a>
      </section> */}

      {/* Rodapé */}
      {/* <footer className="py-10 text-center text-sm text-gray-500">
        © 2025 Flowly. Todos os direitos reservados.
      </footer> */}
    </div>
  )
}
