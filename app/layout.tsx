import './globals.css'

export const metadata = {
  title: 'Trackmania Name Colors Generator',
  description: 'Generate colorful, styled Trackmania names easily!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white p-6 font-sans">{children}</body>
    </html>
  )
}