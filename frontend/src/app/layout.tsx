// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'দারুল হিকমাহ ইনস্টিটিউট',
  description: 'আধুনিক ইসলামী শিক্ষার একটি প্রতিষ্ঠান',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={`${inter.className} bg-gradient-to-br from-green-50 to-emerald-50 text-gray-800`}>
        {/* Page Content */}
        <main>{children}</main>
        {/* Footer */}

        
        
      </body>
    </html>
  )
}
