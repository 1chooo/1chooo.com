import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./_fonts/InterVariable.woff2",
  variable: "--sans",
});

const serif = localFont({
  src: "./_fonts/LoraItalicVariable.woff2",
  variable: "--serif",
});

export const metadata: Metadata = {
  title: "Lin Hugo",
  description: "Lin Hugo is a software builder, writer, and photographer.",
  metadataBase: new URL("https://1chooo.com"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="overflow-x-hidden touch-manipulation">
      <body
        className={`${sans.variable} ${serif.variable} w-full p-6 sm:p-10 md:p-14 text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7 text-rurikon-500 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
