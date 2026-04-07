import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: '--font-playfair' });

export const metadata = {
  title: "Yến Sào Miền Biển Nguyên Chất - Công ty Yến Thành",
  description: "Trải nghiệm Yến sào Nha Trang Khánh Hoà nguyên chất 100%. Mua ngay yến sào cao cấp, sạch không tạp chất từ Công ty Yến Thành. Cam kết chất lượng và sức khỏe.",
  keywords: "Yến sào miền biển nguyên chất, Yến sào Nha Trang Khánh Hoà nguyên chất, Yến sào cao cấp nguyên chất, yến sào sạch không tạp chất, giá yến sào hôm nay",
  openGraph: {
    title: "Yến Sào Miền Biển Nguyên Chất",
    description: "Yến sào nguyên chất từ Nha Trang - Khánh Hòa. Cam kết 100% nguyên chất, tư vấn và dùng thử miễn phí.",
    locale: "vi_VN",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
