import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Kratu Hall of Residence | VSSUT Burla",
  description:
    "Official website of Kratu Hall of Residence at Veer Surendra Sai University of Technology, Burla. Home to 254 boarders, part of the legendary Saptarishi tradition since 1956.",
  keywords: [
    "Kratu Hall of Residence",
    "Kratu Hall",
    "VSSUT Burla",
    "Veer Surendra Sai University of Technology",
    "UCE Burla",
    "Sambalpur University",
    "Engineering Hostel",
    "Boys Hostel VSSUT",
    "B.Tech Hostel Odisha",
    "Saptarishi Tradition",
    "SEARCH Cluster Sambalpur",
    "VSSUT Accommodation",
    "Best Engineering Hostel in Odisha",
    "Odisha",
  ],
  openGraph: {
    title: "Kratu Hall of Residence | VSSUT Burla",
    description: "Official website of Kratu Hall of Residence at Veer Surendra Sai University of Technology, Burla. Home to 254 boarders, part of the legendary Saptarishi tradition since 1956.",
    images: [
      {
        url: "/hostel-images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Kratu Hall of Residence - VSSUT Burla",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kratu Hall of Residence | VSSUT Burla",
    description: "Official website of Kratu Hall of Residence at Veer Surendra Sai University of Technology, Burla.",
    images: ["/hostel-images/opengraph.png"],
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
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased cursor-none">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
