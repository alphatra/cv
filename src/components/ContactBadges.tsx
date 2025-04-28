'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';

// Define the expected type for the contact prop
interface ContactData {
  location?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  github_user?: string;
  github_link?: string; // Keep for QR code potentially later
  portfolio?: string;
  portfolio_label?: string;
}

interface ContactBadgesProps {
  contact: ContactData;
}

// Helper to generate Google Maps link
const getMapsLink = (location: string) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

const ContactBadges: React.FC<ContactBadgesProps> = ({ contact }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-3"> {/* Adjusted gap */}

      {contact.location && (
        <motion.a
          href={getMapsLink(contact.location)}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center bg-white text-black dark:bg-white border border-black dark:border-black rounded-full px-3 py-1 shadow hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors">
            <span className="bg-black dark:bg-black rounded-full p-1 mr-2">
              <MapPin className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-medium">{contact.location}</span>
          </div>
        </motion.a>
      )}

      {contact.phone && (
        <motion.a
          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center bg-white text-black dark:bg-white border border-black dark:border-black rounded-full px-3 py-1 shadow hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors">
            <span className="bg-black dark:bg-black rounded-full p-1 mr-2">
              <Phone className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-medium">{contact.phone}</span>
          </div>
        </motion.a>
      )}

      {contact.email && (
        <motion.a
          href={`mailto:${contact.email}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center bg-white text-black dark:bg-white border border-black dark:border-black rounded-full px-3 py-1 shadow hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors">
            <span className="bg-black dark:bg-black rounded-full p-1 mr-2">
              <Mail className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-medium">{contact.email}</span>
          </div>
        </motion.a>
      )}

      {contact.linkedin && (
        <motion.a
          href={`https://linkedin.com/in/${contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center bg-white text-black dark:bg-white border border-black dark:border-black rounded-full px-3 py-1 shadow hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors">
            <span className="bg-black dark:bg-black rounded-full p-1 mr-2">
              <Linkedin className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-medium underline">{contact.linkedin}</span>
          </div>
        </motion.a>
      )}

      {contact.github_user && (
        <motion.a
          href={`https://github.com/${contact.github_user}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center bg-white text-black dark:bg-white border border-black dark:border-black rounded-full px-3 py-1 shadow hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors">
            <span className="bg-black dark:bg-black rounded-full p-1 mr-2">
              <Github className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-medium underline">{contact.github_user}</span>
          </div>
        </motion.a>
      )}

      {contact.portfolio && (
        <motion.a
          href={contact.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="cursor-pointer"
        >
          <div className="inline-flex items-center bg-white text-black dark:bg-white border border-black dark:border-black rounded-full px-3 py-1 shadow hover:bg-gray-200 dark:hover:bg-gray-100 transition-colors">
            <span className="bg-black dark:bg-black rounded-full p-1 mr-2">
              <Globe className="w-3 h-3 text-white" />
            </span>
            <span className="text-xs font-medium underline">{contact.portfolio_label || 'Portfolio'}</span>
          </div>
        </motion.a>
      )}

    </div>
  );
};

export default ContactBadges; 