import './globals.css';

export const metadata = {
  title: 'IFP Intan — Media Pembelajaran Interaktif IPS',
  description: 'Aplikasi Pembelajaran Interaktif IPS Literasi Finansial & Pengenalan Rupiah TE 2022 Kurikulum Merdeka Fase D untuk IFP 4K Touchscreen.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
