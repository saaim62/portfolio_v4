import './globals.css';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'Saim Asif | Full Stack AI Engineer',
  description: 'Portfolio of Saim Asif - Architecting God-Tier AI Systems',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#050507] text-white antialiased selection:bg-indigo-500/30 selection:text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
