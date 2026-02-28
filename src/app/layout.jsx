import { AuthProvider } from "../components/AuthProvider";
import LayoutContent from "../components/LayoutContent";
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
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
