import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UseTheme } from "@/contexts/ThemeContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/layout/Dashboard";

const inter = Inter({ subsets: ["latin"] });

// Defining the metadata using the Metadata type
export const metadata: Metadata = {
  title: "React components with Typescript",
  description: "Next.js React components",
};

type RootLayoutProps = {
  children: React.ReactNode;
  displayLayout?: "header" | "dashboard";
};

export default function RootLayout({
  children,
  displayLayout = "header",
}: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description ?? ""} />

        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.svg" />

        {/* Favicon for Apple Devices */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />

        {/* Favicon for Different Devices */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />

        {/* Viewport Meta Tag for Responsive Design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description ?? ""} />
        <meta property="og:type" content="website" />
        {/* Uncomment and provide URLs for Open Graph if necessary */}
        {/* <meta property="og:url" content="https://www.myapp.com/" />
        <meta property="og:image" content="https://www.myapp.com/og-image.jpg" /> */}

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description ?? ""} />
        {/* Uncomment and provide image for Twitter if necessary */}
        {/* <meta name="twitter:image" content="https://www.myapp.com/twitter-image.jpg" /> */}

        {/* Additional Metadata */}
        <meta charSet="UTF-8" />

        {/* Google Analytics */}
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ANALYTICS_ID"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GOOGLE_ANALYTICS_ID');
          `}
        </script> 
        */}
      </head>
      <body className={inter.className}>
        <UseTheme>
          {" "}
          {/* Wrap your layout in UseTheme */}
          {displayLayout === "header" ? <Header /> : <Dashboard />}
          <main className="min-h-screen py-16 px-2">{children}</main>
          <Footer />
        </UseTheme>
      </body>
    </html>
  );
}
