import { ReactNode } from "react";
import "./globals.css";
import ReactLenis from "lenis/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ReactLenis root options={{ duration: 1.5, smoothWheel: true }}>
      <html lang="en">
        <body className={`antialiased`}>{children}</body>
      </html>
    </ReactLenis>
  );
}
