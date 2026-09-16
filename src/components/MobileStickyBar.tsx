import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';
import { WhatsAppIcon } from './WhatsAppIcon';

interface MobileStickyBarProps {
  clinic: ClinicConfig;
  onBookClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ clinic, onBookClick }) => {
  const phone = clinic.contact?.phone;
  const whatsapp = clinic.contact?.whatsapp;

  const hasPhone = Boolean(phone);
  const hasWhatsApp = Boolean(whatsapp);

  if (!hasPhone && !hasWhatsApp) {
    return null;
  }

  const cleanPhone = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const cleanWhatsApp = whatsapp ? whatsapp.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello, I would like to enquire about an appointment at ${clinic.name}.`
  )}`;

  return (
    <nav
      id="mobile-sticky-action-bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E2DD] px-3 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      aria-label="Quick Mobile Actions"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Call Action */}
        {hasPhone && (
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 min-h-[46px] flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-[#FAF9F7] active:bg-[#E5E2DD] text-[#1A1A1A] border border-[#E5E2DD] rounded-xl text-[11px] xs:text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
            aria-label={`Call ${clinic.name}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#7C9885] shrink-0" />
            <span className="truncate">Call</span>
          </a>
        )}

        {/* WhatsApp Action */}
        {hasWhatsApp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 min-h-[46px] flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-[#25D366]/10 active:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl text-[11px] xs:text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" variant="green-badge" />
            <span className="truncate">WhatsApp</span>
          </a>
        )}

        {/* Request Appointment Action */}
        <button
          onClick={onBookClick}
          className="flex-[1.2] min-h-[46px] flex items-center justify-center space-x-1.5 py-2.5 px-2.5 bg-[#1A1A1A] active:bg-[#7C9885] text-white rounded-xl text-[11px] xs:text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer shrink-0"
          aria-label="Request an Appointment"
        >
          <Calendar className="w-3.5 h-3.5 text-[#7C9885] shrink-0" />
          <span className="truncate">Request</span>
        </button>

      </div>
    </nav>
  );
};
