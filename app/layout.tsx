import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" h-[100%] ">
      <body className="h-[100%] bg-[#20293a]"
      >
        {children}
      </body>
    </html>
  );
}
