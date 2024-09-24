"use client";
import Header from "@/components/basicComponents/Header/Header";
import Footer from "@/components/basicComponents/Footer/Footer";
import "../styles/globals.css";
import styles from "../styles/app.module.scss";
import Providers from "@/store/StoreProvider";
import { usePathname } from "next/navigation";
import { Metrika } from "@/components/metrika";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify"; // Добавлено
import "react-toastify/dist/ReactToastify.css"; // Добавлено

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const shouldShowFooter = !pathname.startsWith("/course-editor/");

  return (
    <Providers>
      <html lang="ru">
        <body>
          <div className={styles.container}>
            <Header />
            <div className={styles.mainСontainer}>{children}</div>
            {shouldShowFooter && <Footer />}
          </div>
          <Metrika />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
        <GoogleAnalytics gaId="G-TDTRH122R3" />
      </html>
    </Providers>
  );
}
