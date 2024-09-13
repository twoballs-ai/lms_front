"use client";
import Header from '@/components/basicComponents/Header/Header';
import Footer from '@/components/basicComponents/Footer/Footer';
import "../styles/globals.css";
import styles from '../styles/app.module.scss';
import Providers from '@/store/StoreProvider';
import { usePathname } from 'next/navigation'; // Import the hook

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  // Check if the current path is the dynamic route
  const shouldShowFooter = !pathname.startsWith('/course-editor/');

  return (
    <Providers>
      <html lang="ru">
        <body>
          <div className={styles.container}>
            <Header />
            <div className={styles.mainСontainer}>{children}</div>
            {shouldShowFooter && <Footer />} {/* Conditionally render the Footer */}
          </div>
        </body>
      </html>
    </Providers>
  );
}
