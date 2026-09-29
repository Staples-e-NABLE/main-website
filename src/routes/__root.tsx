import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

import '../styles.css'

const DEVICES = [
  {
    id: '1',
    title: '',
    recipientFirstName: 'Shipped to Egypt',
    
    src: '/Focus and Targets (1).webp',
    imgClass: 'object-cover',
  },
  {
    id: '2',
    
    recipientFirstName: 'Shipped within the U.S.',
    
    src: '/Focus and Targets.webp',
    imgClass: 'object-cover',
  },
  {
    id: '3',
    title: '',
    recipientFirstName: 'Prototype Hand',
    
    src: '/IMG_7481.webp',
    // Rotates 90 deg and scales down so the entire photo fits in frame
    imgClass: 'rotate-90 object-contain scale-160', 
  },
]

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Staples e-NABLE — Free 3D-Printed Hands & Arms',
      },
      {
        name: 'description',
        content:
          'Staples High School e-NABLE chapter designs and delivers free 3D-printed assistive hands and arms. Request a device, volunteer, or browse devices we have delivered.',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">
            {children}

            
          </main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  )
}