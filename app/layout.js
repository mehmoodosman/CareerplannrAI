import { Inter } from "next/font/google";
import "./globals.css";

import {ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton,UserButton } from '@clerk/nextjs'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CareerSwipe AI",
  description: "Swipe-able, intuitive career path recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
    <body className={inter.className} style={{ backgroundColor: '#121212' }}>
      {children}
    </body>
    </html>
    </ClerkProvider>
  );
}