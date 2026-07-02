import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Saim Asif | Senior Software Engineer & AI Specialist',
  description: 'Portfolio of Saim Asif - Full Stack AI Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
