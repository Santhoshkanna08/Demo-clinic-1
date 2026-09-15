import React from 'react';
import { Instagram, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface FooterProps {
  clinic: ClinicConfig;
}

export const Footer: React.FC<FooterProps> = ({ clinic }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About Practice', href: '#about' },
    { label: 'Treatments & Services', href: '#services' },
    { label: 'Meet the Doctor', href: '#doctor' },
    { label: 'Consultation Process', href: '#experience' },
    { label: 'Request Appointment', href: '#book-appointment' },
    { label: 'Location & Contact', href: '#contact' },
  ];

  const firstHours = clinic.hours ? Object.entries(clinic.hours)[0] : null;

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-20 sm:pb-12 border-t border-white/10" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-editorial text-3xl font-semibold tracking-tight text-white block">
              {clinic.name}
            </span>
            <p className="text-xs uppercase tracking-widest text-[#7C9885] font-semibold">
              {clinic.type || clinic.specialty}
            </p>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              {clinic.heroSubtext || clinic.tagline || `${clinic.name} provides consultant-led clinical dermatology and skin health management.`}
            </p>

            {/* Social links - Only displayed if verified URL exists */}
            {clinic.socialLinks?.instagram && (
              <div className="pt-2">
                <a
                  href={clinic.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-xs text-white/70 hover:text-white transition-colors"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="w-4 h-4 text-[#7C9885]" />
                  <span>Follow us on Instagram</span>
                </a>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/90">
              Practice Location & Enquiries
            </h4>
            
            <div className="space-y-3 text-xs text-white/70">
              {clinic.contact?.address && (
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#7C9885] shrink-0 mt-0.5" />
                  <span>{clinic.contact.address}</span>
                </div>
              )}

              {clinic.contact?.phone && (
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#7C9885] shrink-0" />
                  <a
                    href={`tel:${clinic.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-white transition-colors font-medium"
                  >
                    {clinic.contact.phone}
                  </a>
                </div>
              )}

              {firstHours && (
                <div className="flex items-start space-x-2.5">
                  <Clock className="w-4 h-4 text-[#7C9885] shrink-0 mt-0.5" />
                  <span>{firstHours[0]}: {firstHours[1]}</span>
                </div>
              )}
            </div>

            {/* Back to top button */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer py-1"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer */}
        <div className="py-6 border-b border-white/10 text-[11px] text-white/40 leading-relaxed">
          <p>
            <strong>Medical Disclaimer:</strong> This website concept is for informational and demonstration purposes only and does not constitute medical advice. Please consult a qualified healthcare professional for medical diagnosis and treatment. No doctor-patient relationship is created through web enquiries.
          </p>
        </div>

        {/* Copyright & Axiom Syndicate Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 {clinic.name}. All rights reserved.</p>
          <p className="text-white/40 text-xs">Website concept by Axiom Syndicate</p>
        </div>

      </div>
    </footer>
  );
};
