import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import {Providers} from "@/app/(components)/Providers";

const figTree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Youtube Downloader'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={figTree.className}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  )
}
