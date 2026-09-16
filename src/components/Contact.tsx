import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, Navigation } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactProps {
  clinic: ClinicConfig;
}

export const Contact: React.FC<ContactProps> = ({ clinic }) => {
  const contact = clinic.contact;
  const hours = clinic.hours || {};
  const hasHours = Object.keys(hours).length > 0;
  const hasPhone = Boolean(contact?.phone);
  const hasAddress = Boolean(contact?.address);
  const hasMapsUrl = Boolean(contact?.googleMapsUrl);
  const hasWhatsApp = Boolean(contact?.whatsapp);

  if (!hasPhone && !hasAddress && !hasHours) {
    return null;
  }

  const encodedWhatsAppMsg = encodeURIComponent(
    `Hello, I would like to enquire about an appointment at ${clinic.name}.`
  );
  const cleanWhatsAppNumber = contact?.whatsapp?.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF9F7]" aria-label="Contact Information and Location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
            Location & Contact
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
            Visit Our Medical Practice
          </h2>
          <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
            {hasAddress ? contact.address : `Direct enquiries and appointment scheduling with ${clinic.name}.`}
          </p>
        </div>

        {/* Contact Information & Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Cards: Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address Card */}
              {hasAddress && (
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E2DD] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] text-[#7C9885] border border-[#E5E2DD] flex items-center justify-center mb-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl text-[#1A1A1A] font-medium mb-1.5">
                      Clinic Address
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                      {contact.address}
                    </p>
                  </div>

                  {hasMapsUrl && (
                    <div className="pt-6">
                      <a
                        href={contact.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#7C9885] hover:text-[#1A1A1A] transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Telephone & Reception Card */}
              {hasPhone && (
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E2DD] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] text-[#7C9885] border border-[#E5E2DD] flex items-center justify-center mb-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl text-[#1A1A1A] font-medium mb-1.5">
                      Direct Telephone
                    </h3>
                    <p className="text-xs text-[#5C5C5C] mb-2">
                      Reception & Enquiries:
                    </p>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-base font-semibold text-[#1A1A1A] hover:text-[#7C9885] transition-colors block"
                    >
                      {contact.phone}
                    </a>
                  </div>

                  <div className="pt-6">
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] hover:text-[#7C9885] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#7C9885]" />
                      <span>Call Clinic</span>
                    </a>
                  </div>
                </div>
              )}

            </div>

            {/* Opening Hours Table */}
            {hasHours && (
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E2DD] shadow-xs">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="p-2 rounded-lg bg-[#FAF9F7] text-[#7C9885] border border-[#E5E2DD]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl text-[#1A1A1A] font-medium">
                      Clinic Opening Hours
                    </h3>
                    <p className="text-xs text-[#5C5C5C]">
                      Consultations are arranged by advance appointment.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-[#E5E2DD] text-xs sm:text-sm">
                  {Object.entries(hours).map(([days, timeStr]) => (
                    <div key={days} className="py-2.5 flex justify-between items-center">
                      <span className="font-medium text-[#1A1A1A]">{days}</span>
                      <span className="text-[#5C5C5C] font-mono text-xs">{timeStr}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Card: Directions & Quick Interactive Action Box */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl border border-[#E5E2DD] p-5 sm:p-8 shadow-xs flex-1 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-[#7C9885] block">
                    Direct Enquiries
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-normal mt-1">
                    Contact Reception
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5C5C] mt-2 leading-relaxed">
                    Connect directly with our clinic desk to request appointment availability, ask visit questions, or obtain directions.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-2">
                  {hasPhone && (
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-colors shadow-xs min-h-[48px]"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Clinic: {contact.phone}</span>
                    </a>
                  )}

                  {hasMapsUrl && (
                    <a
                      href={contact.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-white hover:bg-[#FAF9F7] text-[#1A1A1A] border border-[#E5E2DD] hover:border-[#7C9885] text-xs uppercase tracking-widest font-semibold rounded-full transition-colors min-h-[48px]"
                    >
                      <Navigation className="w-4 h-4 text-[#7C9885]" />
                      <span>Get Directions</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5C5C5C]" />
                    </a>
                  )}

                  {hasWhatsApp && (
                    <a
                      href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodedWhatsAppMsg}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center space-x-2.5 py-3.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 text-xs uppercase tracking-widest font-semibold rounded-full transition-colors min-h-[48px]"
                    >
                      <WhatsAppIcon className="w-4 h-4" variant="green-badge" />
                      <span>WhatsApp Reception</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Consultation Scheduling Notice */}
              <div className="mt-8 pt-6 border-t border-[#E5E2DD] text-xs text-[#5C5C5C] space-y-1">
                <p><strong>Practice Note:</strong> Appointments are scheduled in advance to ensure dedicated time with treating staff.</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
