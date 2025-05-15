import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUser from "@/providers/syncUser";
import { Toaster } from "@/components/ui/sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agora",
  description: "An online learning platform powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/logo.svg",
          socialButtonsVariant: "iconButton",
        },
      }}
    >
      <html lang="en">
        <body className={`${monaSans.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SyncUser>
              {children} <Toaster />
            </SyncUser>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
