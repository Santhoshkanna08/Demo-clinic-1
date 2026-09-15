import React from 'react';
import { ClinicConfig } from '../config/clinic';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppButtonProps {
  clinic: ClinicConfig;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ clinic }) => {
  const whatsapp = clinic.contact?.whatsapp;

  // Per rule: If WhatsApp number is unavailable, hide cleanly
  if (!whatsapp || whatsapp.trim().length === 0) {
    return null;
  }

  const cleanNumber = whatsapp.replace(/[^0-9]/g, '');
  const prefilledText = encodeURIComponent(
    `Hello, I would like to enquire about an appointment at ${clinic.name}.`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${prefilledText}`;

  return (
    <aside aria-label="Quick WhatsApp Communication">
      {/* Visible on tablet and desktop; on mobile, the unified MobileStickyBar provides the WhatsApp action */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center justify-center px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.45)] transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] group"
        aria-label={`Chat with ${clinic.name} on WhatsApp`}
      >
        {/* Outer active beacon dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white border border-[#25D366]/20" />
        </span>

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-5 h-5" variant="white-bubble" />

        {/* Text Label */}
        <span className="text-xs font-semibold tracking-wide pl-2.5 pr-1">
          WhatsApp Reception
        </span>
      </a>
    </aside>
  );
};
