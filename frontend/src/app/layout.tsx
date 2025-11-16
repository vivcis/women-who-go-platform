import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/contexts/ModalContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoWomen - Excel in Go Programming",
  description:
    "Join a supportive community of women dedicated to mastering Go. We provide the tools, mentorship, and opportunities you need to thrive in your tech career.",
  keywords: [
    "Go programming",
    "women in tech",
    "Golang community",
    "programming mentorship",
    "tech career",
    "women developers",
    "Go learning resources"
  ],
  authors: [{ name: "GoWomen" }],
  creator: "GoWomen",
  openGraph: {
    title: "GoWomen - Excel in Go Programming",
    description: "Join a supportive community of women dedicated to mastering Go. We provide the tools, mentorship, and opportunities you need to thrive in your tech career.",
    type: "website",
    locale: "en_US",
    siteName: "GoWomen",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoWomen - Excel in Go Programming",
    description: "Join a supportive community of women dedicated to mastering Go. We provide the tools, mentorship, and opportunities you need to thrive in your tech career.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8B5CF6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <ModalProvider>
            {children}
            <Toaster
              toastOptions={{
                duration: 5000,
                success: {
                  duration: 4000,
                },
                error: {
                  duration: 6000,
                },
              }}
            />
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
