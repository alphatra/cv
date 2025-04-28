'use client'

import React, { useState } from 'react';
import { Download } from 'lucide-react';

export function DownloadPdfButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-pdf'); // Call the API route

      if (!response.ok) {
        throw new Error(`Failed to generate PDF: ${response.statusText}`);
      }

      const blob = await response.blob(); // Get the PDF data as a Blob
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'cv-gracjan-ziemianski.pdf'); // Set the filename
      document.body.appendChild(link);
      link.click(); // Trigger the download
      link.parentNode?.removeChild(link); // Clean up the link
      window.URL.revokeObjectURL(url); // Release the object URL

    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again."); // Basic error feedback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
      title="Download CV as PDF"
      aria-label="Download CV as PDF"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <Download className="w-5 h-5" />
      )}
      {isLoading ? 'Generating...' : ''}
    </button>
  );
} 