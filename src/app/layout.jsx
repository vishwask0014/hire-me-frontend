import { AuthProvider } from "../components/AuthProvider";
import LayoutContent from "../components/LayoutContent";
import "./globals.css";

export const metadata = {
  title: "HireMe",
  description: "Photographer hiring platform for newbies and professionals",
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
