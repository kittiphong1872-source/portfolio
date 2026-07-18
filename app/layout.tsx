import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "รุ้งกานฎา จีนา (สายรุ้ง) | แฟ้มผลงานเยาวชนต้นแบบเชียงใหม่",
  description: "แฟ้มผลงานเด็กหญิงรุ้งกานฎา จีนา เยาวชนเชียงใหม่ผู้สืบสานศิลปวัฒนธรรมล้านนา ดนตรีพื้นเมือง คุณธรรม และจิตอาสา ประจำปี ๒๕๖๙",
  keywords: ["รุ้งกานฎา จีนา", "คนดีศรีเชียงใหม่", "เยาวชนเชียงใหม่", "วัฒนธรรมล้านนา", "แฟ้มสะสมผลงาน"],
  openGraph: {
    title: "รุ้งกานฎา จีนา | Culture · Character · Community",
    description: "เยาวชนเชียงใหม่ผู้ใช้วินัย ศิลปวัฒนธรรม และจิตอาสาสร้างคุณค่าให้ชุมชน",
    type: "profile",
    locale: "th_TH",
    images: [{url: "/og.jpg", width: 1200, height: 630, alt: "แฟ้มผลงานรุ้งกานฎา จีนา"}],
  },
  twitter: {
    card: "summary_large_image",
    title: "รุ้งกานฎา จีนา | แฟ้มผลงานเยาวชนต้นแบบ",
    description: "Culture · Character · Community",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
