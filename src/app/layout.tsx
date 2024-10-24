import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/globals.css";
import UseTheme from "@/contexts/ThemeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React components with Typescript",
  description: "Next.js React components",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
            <head>
        {/* Primary Meta Tags */}
        <title>{String(metadata.title ?? "Fallback Title")}</title>
        <meta
          name="description"
          content={String(metadata.description ?? "Fallback description")}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon/favicon.ico" />

        {/* Favicon for Apple Devices */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/favicon.ico"
        />

        {/* Favicon for Different Devices */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon.ico"
        />

        {/* Viewport Meta Tag for Responsive Design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={String(metadata.title ?? "Fallback Title")}
        />
        <meta
          property="og:description"
          content={String(metadata.description ?? "Fallback description")}
        />
        <meta property="og:type" content="website" />
        {/* Uncomment and provide URLs for Open Graph if necessary */}
        {/* <meta property="og:url" content="https://www.myapp.com/" />
        <meta property="og:image" content="https://www.myapp.com/og-image.jpg" /> */}

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={String(metadata.title ?? "Fallback Title")}
        />
        <meta
          name="twitter:description"
          content={String(metadata.description ?? "Fallback description")}
        />
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
      <body className="">
        <UseTheme>
          <Header />
          <main className="p-3 py-20 min-h-screen">{children}</main>
          <Footer />
        </UseTheme>
      </body>
    </html>
  );
}
