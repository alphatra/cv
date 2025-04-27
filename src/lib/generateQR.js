// @ts-expect-error
import QRCode from 'qrcode';
// @ts-expect-error
import fs from 'fs';
// @ts-expect-error
import path from 'path';

const generateQR = async () => {
  try {
    // GitHub profile URL - update this to your GitHub URL
    const url = 'https://github.com/alphatra';
    
    // Path to save the QR code
    const outputPath = path.join(process.cwd(), 'public', 'qr.png');
    
    // QR code options
    const options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    };
    
    // Generate and save the QR code
    await QRCode.toFile(outputPath, url, options);
    
    console.log('QR code generated successfully at', outputPath);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

// Run the function
generateQR(); 