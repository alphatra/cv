'use client'

import React, { useState } from 'react';
import { Download } from 'lucide-react';

export function DownloadPdfButton() {
  return (
    <a
      href="/cv.pdf"
      download
      className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
      title="Download CV as PDF"
      aria-label="Download CV as PDF"
    >
      <Download className="w-5 h-5" />
    </a>
  );
} 