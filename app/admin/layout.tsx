import "../globals.css";
import "./style.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "../Provider";
import UIProvider from "../NextUIProvider";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "admin",
  description: "admin side",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <body className={inter.className}>
            <UIProvider>
              <main className="">{children}</main>
            </UIProvider>
          </body>
        </Provider>
        <script src="https://unpkg.com/@popperjs/core@2"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        
      </body>
    </html>
  );
}
