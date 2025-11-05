import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionProviderWrapper from "./SessionProviderWrapper";

export const metadata = {
  title: "Redeem System",
  description: "A simple redeem system for users and admins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-linear-to-br from-slate-100 via-white to-slate-200">
        {/* ✅ Client wrapper for SessionProvider */}
        <SessionProviderWrapper>
          <Navbar />
          <main className="pt-20">{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
