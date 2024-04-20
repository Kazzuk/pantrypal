import Footer from '@/components/footer';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'pantrypal',
  description:
    'Meet pantrypal, your culinary companion powered by OpenAI. Say goodbye to wasted ingredients with our intuitive platform that generates recipes tailored to what you have on hand, minimising food waste while maximising flavor and creativity. Embrace a sustainable approach to cooking and discover endless possibilities in your kitchen today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
