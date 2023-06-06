import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter Clone',
  description: 'Made with Next.js, Server Components, Server Actions, and Drizzle.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-zinc-950 text-zinc-50 h-full"}>
        {children}
      </body>
    </html>
  )
}
