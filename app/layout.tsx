import './globals.css'

export const metadata = {
  title: 'TypeOut',
  description: 'Enhance your typing speed with TypeOut',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
