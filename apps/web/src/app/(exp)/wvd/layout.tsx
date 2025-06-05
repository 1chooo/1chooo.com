import type React from "react"
import { WebVitals } from "@/components/web-vitals/use-web-vitals"
import config from "@/config";
const {
  googleAnalyticId,
} = config;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticId}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${googleAnalyticId});
            `,
          }}
        />
      </head>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  )
}
