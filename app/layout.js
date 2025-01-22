import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] })

export const metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        <main className="cantainer mx-auto max-w-5xl px-4 md:px-0 overflow-hidden">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
