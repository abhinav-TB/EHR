import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css"; // Ensure you have a global CSS file for Tailwind

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'FHIR EHR',
  description: 'A FHIR-based Electronic Health Record app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}


