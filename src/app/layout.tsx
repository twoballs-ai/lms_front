import Header from '@/components/basicComponents/Header/Header';
import Footer from '@/components/basicComponents/Footer/Footer';
import "../styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <Header />
          <div className="container__main-container">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
