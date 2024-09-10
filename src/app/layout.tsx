import Header from '@/components/basicComponents/Header/Header';
import Footer from '@/components/basicComponents/Footer/Footer';
import "../styles/globals.css"
import styles from '../styles/app.module.scss'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className={styles.container}>
          <Header />
          <div className={styles.mainСontainer}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
