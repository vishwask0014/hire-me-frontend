import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "HireMe",
  description: "Freelancer and hirer platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <NavBar />
          <main className="mx-auto w-full max-w-5xl px-6 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
