'use client'

import Button from '@flowly/components/Button/Button'
import LoginModal from '@flowly/components/Dialog/LoginModal'
import Header from '@flowly/components/Header/Header'
import HeroAnimation from '@flowly/components/HeroAnimation/HeroAnimation'
import { useEffect, useRef } from 'react'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="10" height="10" rx="2" stroke="#9CFF01" strokeWidth="1.5" />
        <rect x="16" y="2" width="10" height="10" rx="2" stroke="#9CFF01" strokeWidth="1.5" />
        <rect x="2" y="16" width="10" height="10" rx="2" stroke="#9CFF01" strokeWidth="1.5" />
        <rect x="16" y="16" width="10" height="10" rx="2" stroke="#9CFF01" strokeWidth="1.5" fill="rgba(156,255,1,0.12)" />
      </svg>
    ),
    title: 'Kanban Visual',
    desc: 'Arraste tarefas entre colunas com fluidez. Visualize seu fluxo de trabalho em tempo real.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="4,20 10,12 16,16 22,6" stroke="#9CFF01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="6" r="2" fill="#9CFF01" />
        <line x1="4" y1="24" x2="24" y2="24" stroke="#9CFF01" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Dashboards de Métricas',
    desc: 'Acompanhe produtividade, throughput e ciclos de entrega com gráficos personalizáveis.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10" stroke="#9CFF01" strokeWidth="1.5" />
        <path d="M14 8v6l4 2" stroke="#9CFF01" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="2" fill="rgba(156,255,1,0.3)" />
      </svg>
    ),
    title: 'Automações de Fluxo',
    desc: 'Configure regras automáticas para mover cards, notificar membros e atualizar status.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="4" stroke="#9CFF01" strokeWidth="1.5" />
        <circle cx="20" cy="18" r="4" stroke="#9CFF01" strokeWidth="1.5" />
        <line x1="13.5" y1="13.5" x2="16.5" y2="14.5" stroke="#9CFF01" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="rgba(156,255,1,0.3)" />
      </svg>
    ),
    title: 'Colaboração em Tempo Real',
    desc: 'Equipes sincronizadas instantaneamente. Comentários, menções e atividade ao vivo.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="20" height="14" rx="2" stroke="#9CFF01" strokeWidth="1.5" />
        <path d="M9 8V6a5 5 0 0 1 10 0v2" stroke="#9CFF01" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="15" r="2" fill="rgba(156,255,1,0.4)" />
      </svg>
    ),
    title: 'Permissões Granulares',
    desc: 'Controle quem pode ver, editar ou administrar cada projeto com roles precisas.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="22" height="18" rx="2" stroke="#9CFF01" strokeWidth="1.5" />
        <line x1="3" y1="11" x2="25" y2="11" stroke="#9CFF01" strokeWidth="1.5" />
        <rect x="7" y="15" width="4" height="4" rx="0.5" fill="rgba(156,255,1,0.5)" />
        <rect x="13" y="15" width="8" height="1.5" rx="0.5" fill="rgba(156,255,1,0.3)" />
        <rect x="13" y="18" width="5" height="1.5" rx="0.5" fill="rgba(156,255,1,0.3)" />
      </svg>
    ),
    title: 'Relatórios Exportáveis',
    desc: 'Exporte dados do seu fluxo em PDF, CSV e integre com ferramentas externas via API.',
  },
]

const stats = [
  { value: '10x', label: 'Mais rápido que emails' },
  { value: '98%', label: 'Satisfação de usuários' },
  { value: '0ms', label: 'Latência de sync' },
  { value: '∞', label: 'Projetos por workspace' },
]

export default function Page() {
  const heroTextRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered entrance for hero text
    const heroEl = heroTextRef.current
    if (heroEl) {
      const children = heroEl.querySelectorAll('.hero-animate')
      children.forEach((el, i) => {
        const htmlEl = el as HTMLElement
        htmlEl.style.opacity = '0'
        htmlEl.style.transform = 'translateY(32px)'
        htmlEl.style.transition = `opacity 0.8s ease ${0.3 + i * 0.15}s, transform 0.8s ease ${0.3 + i * 0.15}s`
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            htmlEl.style.opacity = '1'
            htmlEl.style.transform = 'translateY(0)'
          })
        })
      })
    }
  }, [])

  useEffect(() => {
    // Intersection observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatables = entry.target.querySelectorAll('.scroll-animate')
            animatables.forEach((el, i) => {
              const htmlEl = el as HTMLElement
              htmlEl.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`
              htmlEl.style.opacity = '1'
              htmlEl.style.transform = 'translateY(0)'
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = [featuresRef.current, statsRef.current]
    sections.forEach((s) => {
      if (s) {
        const animatables = s.querySelectorAll('.scroll-animate')
        animatables.forEach((el) => {
          const htmlEl = el as HTMLElement
          htmlEl.style.opacity = '0'
          htmlEl.style.transform = 'translateY(40px)'
        })
        observer.observe(s)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: '#171719', color: '#FEFEFE' }}>

      {/* ── HERO ── */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <Header />
        <HeroAnimation />

        {/* Left edge accent line */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, #9CFF01 40%, #9CFF01 60%, transparent)',
            opacity: 0.4,
          }}
        />

        {/* Content */}
        <div ref={heroTextRef} className="relative z-10 w-full px-6 md:px-16 lg:px-24 xl:px-32">
          {/* Tag line */}
          <div className="hero-animate inline-flex items-center gap-2 mb-6 md:mb-8">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#9CFF01', boxShadow: '0 0 8px #9CFF01' }}
            />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#9CFF01', letterSpacing: '0.2em' }}>
              Kanban + Analytics
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-animate font-semibold leading-none"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Onde suas ideias
            <br />
            <span style={{ color: '#9CFF01' }}>encontram</span>
            <br />
            o
            {' '}
            <span
              style={{
                color: '#9CFF01',
                textShadow: '0 0 40px rgba(156,255,1,0.4)',
              }}
            >
              fluxo
            </span>
            .
          </h1>

          {/* Separator */}
          <div
            className="hero-animate my-6 md:my-8"
            style={{ width: '60px', height: '2px', background: '#9CFF01', opacity: 0.6 }}
          />

          {/* Subtitle */}
          <p
            className="hero-animate font-light max-w-lg"
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              color: 'rgba(254,254,254,0.65)',
              lineHeight: 1.7,
            }}
          >
            A maneira mais inteligente de organizar seu fluxo de trabalho. Kanban visual, dashboards de métricas e automações — tudo em um lugar.
          </p>

          {/* CTA */}
          <div className="hero-animate flex flex-wrap items-center gap-4 mt-8 md:mt-10">
            <LoginModal
              trigger={(
                <Button
                  id="start-free-button"
                  variant="primary"
                  className="text-sm"
                >
                  Começar Gratuitamente
                </Button>
              )}
            />
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium cursor-pointer group"
              style={{ color: 'rgba(254,254,254,0.5)' }}
            >
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border group-hover:border-primary group-hover:text-primary transition-all duration-300"
                style={{ borderColor: 'rgba(254,254,254,0.2)', color: 'rgba(254,254,254,0.5)' }}
              >
                ▶
              </span>
              <span className="group-hover:text-white-primary transition-colors duration-300">Ver demonstração</span>
            </button>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(254,254,254,0.25)', letterSpacing: '0.15em', fontSize: '0.65rem' }}>scroll</span>
          <div
            className="w-px h-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(156,255,1,0.6), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div
        ref={statsRef}
        style={{
          borderTop: '1px solid rgba(156,255,1,0.08)',
          borderBottom: '1px solid rgba(156,255,1,0.08)',
          background: 'rgba(156,255,1,0.02)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="scroll-animate py-10 px-8 flex flex-col items-center text-center"
              style={{
                borderRight: i < 3 ? '1px solid rgba(156,255,1,0.08)' : undefined,
              }}
            >
              <span
                className="font-semibold leading-none"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#9CFF01',
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 30px rgba(156,255,1,0.3)',
                }}
              >
                {stat.value}
              </span>
              <span
                className="mt-2 font-light text-sm"
                style={{ color: 'rgba(254,254,254,0.45)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section
        ref={featuresRef}
        className="w-full py-24 md:py-36 px-6 md:px-16 lg:px-24 xl:px-32"
      >
        {/* Section header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <div className="scroll-animate inline-flex items-center gap-2 mb-4">
            <div style={{ width: 24, height: 1, background: '#9CFF01' }} />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#9CFF01', letterSpacing: '0.2em' }}>Recursos</span>
          </div>
          <h2
            className="scroll-animate font-semibold leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.02em' }}
          >
            Tudo que seu time precisa
            <br />
            <span style={{ color: 'rgba(254,254,254,0.35)' }}>para entregar mais rápido.</span>
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: '1px solid rgba(156,255,1,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
          {features.map(feat => (
            <div
              key={feat.title}
              className="scroll-animate group relative p-8 md:p-10 cursor-default"
              style={{
                background: '#1a1a1c',
                borderRight: '1px solid rgba(156,255,1,0.06)',
                borderBottom: '1px solid rgba(156,255,1,0.06)',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(156,255,1,0.04)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#1a1a1c'
              }}
            >
              {/* Top accent on hover */}
              <div
                className="absolute top-0 left-0 w-full"
                style={{
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, rgba(156,255,1,0.3), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              />

              <div
                className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl"
                style={{
                  background: 'rgba(156,255,1,0.06)',
                  border: '1px solid rgba(156,255,1,0.12)',
                }}
              >
                {feat.icon}
              </div>

              <h3
                className="font-medium mb-3"
                style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}
              >
                {feat.title}
              </h3>

              <p
                className="font-light text-sm leading-relaxed"
                style={{ color: 'rgba(254,254,254,0.45)', lineHeight: 1.75 }}
              >
                {feat.desc}
              </p>

              {/* Arrow indicator */}
              <div
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all duration-300"
                style={{ color: '#9CFF01', opacity: 0.6 }}
              >
                <span>Saiba mais</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ── */}
      <section
        className="w-full py-24 md:py-36 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden"
        style={{ borderTop: '1px solid rgba(156,255,1,0.06)' }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div style={{ width: 24, height: 1, background: '#9CFF01' }} />
              <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#9CFF01', letterSpacing: '0.2em' }}>Dashboard</span>
            </div>
            <h2
              className="font-semibold leading-tight mb-6"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em' }}
            >
              Métricas que
              <br />
              <span style={{ color: '#9CFF01' }}>revelam o ritmo</span>
              <br />
              do seu time.
            </h2>
            <p
              className="font-light leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(254,254,254,0.5)', fontSize: '1rem', lineHeight: 1.8 }}
            >
              Dashboards configuráveis com Burndown charts, Velocity, Cumulative Flow e muito mais. Adicione, remova e reorganize widgets de acordo com o que seu time realmente usa.
            </p>

            <ul className="space-y-3">
              {['Widgets drag-and-drop', 'Filtros por período, membro e projeto', 'Comparativo entre sprints', 'Alertas de gargalo automáticos'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(254,254,254,0.6)' }}>
                  <span style={{ color: '#9CFF01', fontSize: '0.9rem' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Abstract dashboard mockup */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#1a1a1c',
              border: '1px solid rgba(156,255,1,0.1)',
              aspectRatio: '16/10',
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(156,255,1,0.06)', background: '#1c1c1e' }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,87,0.7)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,68,0.7)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(40,201,64,0.7)' }} />
              <div className="flex-1 mx-4 rounded" style={{ height: 14, background: 'rgba(255,255,255,0.05)' }} />
            </div>

            {/* Dashboard content */}
            <div className="p-5 grid grid-cols-3 grid-rows-3 gap-3 h-full">
              {/* Big chart */}
              <div
                className="col-span-2 row-span-2 rounded-xl p-4 flex flex-col"
                style={{ background: 'rgba(156,255,1,0.04)', border: '1px solid rgba(156,255,1,0.08)' }}
              >
                <div className="text-xs font-medium mb-3" style={{ color: 'rgba(254,254,254,0.4)' }}>Velocity</div>
                <div className="flex-1 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? '#9CFF01' : `rgba(156,255,1,${0.15 + i * 0.05})` }} />
                  ))}
                </div>
              </div>

              {/* Stat card 1 */}
              <div
                className="rounded-xl p-3 flex flex-col justify-between"
                style={{ background: 'rgba(156,255,1,0.04)', border: '1px solid rgba(156,255,1,0.08)' }}
              >
                <div className="text-xs" style={{ color: 'rgba(254,254,254,0.4)' }}>Cards done</div>
                <div className="font-semibold text-xl" style={{ color: '#9CFF01' }}>142</div>
              </div>

              {/* Stat card 2 */}
              <div
                className="rounded-xl p-3 flex flex-col justify-between"
                style={{ background: 'rgba(156,255,1,0.04)', border: '1px solid rgba(156,255,1,0.08)' }}
              >
                <div className="text-xs" style={{ color: 'rgba(254,254,254,0.4)' }}>Cycle time</div>
                <div className="font-semibold text-xl" style={{ color: '#9CFF01' }}>2.4d</div>
              </div>

              {/* Small donut */}
              <div
                className="col-span-1 rounded-xl p-3 flex flex-col"
                style={{ background: 'rgba(156,255,1,0.04)', border: '1px solid rgba(156,255,1,0.08)' }}
              >
                <div className="text-xs mb-2" style={{ color: 'rgba(254,254,254,0.4)' }}>Status</div>
                <div className="flex gap-1 flex-wrap">
                  {['Todo', 'Doing', 'Done'].map((s, i) => (
                    <span
                      key={s}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: `rgba(156,255,1,${0.08 + i * 0.06})`,
                        color: 'rgba(254,254,254,0.6)',
                        fontSize: '0.6rem',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress bars */}
              <div
                className="col-span-2 rounded-xl p-3"
                style={{ background: 'rgba(156,255,1,0.04)', border: '1px solid rgba(156,255,1,0.08)' }}
              >
                <div className="text-xs mb-2" style={{ color: 'rgba(254,254,254,0.4)' }}>Sprint Progress</div>
                <div className="space-y-1.5">
                  {[75, 50, 90].map((p, i) => (
                    <div key={i} className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${p}%`,
                          background: `rgba(156,255,1,${0.4 + i * 0.2})`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 70% 30%, rgba(156,255,1,0.04) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="w-full py-24 md:py-36 px-6 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(156,255,1,0.06)' }}
      >
        {/* BG decorative */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(156,255,1,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#9CFF01', boxShadow: '0 0 8px #9CFF01' }}
            />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: '#9CFF01', letterSpacing: '0.2em' }}>Comece agora</span>
          </div>
          <h2
            className="font-semibold leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            Seu time já está
            <br />
            <span style={{ color: '#9CFF01' }}>pronto para o próximo nível.</span>
          </h2>
          <p
            className="font-light mb-10 mx-auto max-w-md"
            style={{ color: 'rgba(254,254,254,0.45)', fontSize: '1rem', lineHeight: 1.8 }}
          >
            Crie sua conta gratuitamente e comece a organizar seu fluxo de trabalho com clareza.
          </p>
          <LoginModal
            trigger={(
              <Button
                id="cta-start-free"
                variant="primary"
                className="text-base px-10 py-3"
              >
                Começar Gratuitamente
              </Button>
            )}
          />
          <p className="mt-4 text-xs" style={{ color: 'rgba(254,254,254,0.2)' }}>
            Sem cartão de crédito · Setup em 2 minutos
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(156,255,1,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold" style={{ color: '#9CFF01', letterSpacing: '-0.01em' }}>Flowly</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(254,254,254,0.2)' }}>
          © 2025 Flowly. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 text-xs" style={{ color: 'rgba(254,254,254,0.2)' }}>
          <a href="#" className="hover:text-white-primary transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white-primary transition-colors">Termos</a>
          <a href="#" className="hover:text-white-primary transition-colors">Suporte</a>
        </div>
      </footer>

    </div>
  )
}
