import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "รุ้งกานฎา จีนา | คนดีศรีเชียงใหม่",
  description: "แฟ้มสะสมผลงานบุคคลต้นแบบคนดีศรีเชียงใหม่ ประจำปี ๒๕๖๙",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
