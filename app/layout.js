import './globals.css'

export const metadata = {
  title: 'Mastery CourseFlow',
  description: 'TRAIN YOUR VOICE. CONTROL YOUR SPEECH. Speech performance training platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
