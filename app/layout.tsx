import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: 'Онлайн-тренинг "Звучит как план"',
  description: "Узнайте, как превратить хаос в систему и планировать без давления",
  openGraph: {
    title: 'Онлайн-тренинг "Звучит как план"',
    description: "Узнайте, как превратить хаос в систему и планировать без давления",
    type: "website",
    locale: "ru_RU",
    siteName: "Choosy Recruitment",
  },
  twitter: {
    card: "summary_large_image",
    title: 'Онлайн-тренинг "Звучит как план"',
    description: "Узнайте, как превратить хаос в систему и планировать без давления",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Yandex.Metrika counter */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(103227860, "init", {
           clickmap:true,
           trackLinks:true,
           accurateTrackBounce:true,
           webvisor:true
      });
    `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/103227860" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
