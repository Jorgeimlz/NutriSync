import React from 'react';
import '@/app/globals.css';

export const metadata = {
  title: 'NutriSync',
  description: 'Sincroniza tu nutrición fácilmente',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
