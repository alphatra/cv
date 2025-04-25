'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  className?: string;
  fgColor?: string; // Foreground/dark color
  bgColor?: string; // Background/light color (use #00000000 for transparent)
}

export default function QRCodeGenerator({ 
  url, 
  size = 80, 
  className = "",
  fgColor = '#000000', // Default to black
  bgColor = '#ffffff'  // Default to white
}: QRCodeGeneratorProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true);
        const dataUrl = await QRCode.toDataURL(url, {
          width: size,
          margin: 1,
          color: {
            dark: fgColor,
            light: bgColor
          }
        });
        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error('Error generating QR code:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      generateQRCode();
    }
  }, [url, size, fgColor, bgColor]);

  if (isLoading) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-gray-700 rounded animate-pulse ${className}`}
      />
    );
  }

  return (
    <img
      src={qrCodeDataUrl}
      width={size}
      height={size}
      alt="QR Code"
      className={`rounded ${className}`}
    />
  );
} 