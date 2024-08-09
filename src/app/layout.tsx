import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
  description:
    "I'm Hugo ChunHo Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  authors: [{ name: "Hugo ChunHo Lin (1chooo)" }],
  keywords: ["Hugo ChunHo Lin", "1chooo", "Software Engineering", "Open Source", "NCU"],
  openGraph: {
    url: "https://1chooo.com/",
    type: "website",
    siteName: "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
    title: "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
    description:
      "I'm Hugo ChunHo Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: [
      {
        url: "https://raw.githubusercontent.com/1chooo/1chooo.com/main/docs/imgs/cover_transparent_bg.png",
        width: 1200,
        height: 630,
        alt: "Hugo ChunHo Lin (1chooo) Cover Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo ChunHo Lin (1chooo) | Open Source Enthusiast",
    description:
      "I'm Hugo ChunHo Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: "https://raw.githubusercontent.com/1chooo/1chooo.com/main/docs/imgs/cover_transparent_bg.png",
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JGG75799PJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JGG75799PJ');
          `}
        </Script>

        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

        {/* Favicon and Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
