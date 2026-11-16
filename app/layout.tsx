import './globals.css';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Saim Asif — Senior Full Stack Engineer & Technical Team Lead',
  description:
    'Senior Full Stack Engineer and Technical Team Lead in Lahore, Pakistan. Led three engineers to build Case Management Hub, a HIPAA-compliant healthcare SaaS used by 70+ paying organizations. Founder of DropRoute. React, Next.js, NestJS, React Native, Native Android, AWS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
