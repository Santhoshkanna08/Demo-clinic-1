import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface HeaderProps {
  clinic: ClinicConfig;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ clinic, onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero', show: true },
    { label: 'About', href: '#about', show: true },
    { label: 'Treatments', href: '#services', show: clinic.services && clinic.services.length > 0 },
    { label: 'Doctor', href: '#doctor', show: Boolean(clinic.doctor && clinic.doctor.name) },
    { label: 'Pathway', href: '#experience', show: Boolean(clinic.patientJourney && clinic.patientJourney.length > 0) },
    { label: 'Reviews', href: '#reviews', show: Boolean(clinic.rating && clinic.rating.value) },
    { label: 'Contact', href: '#contact', show: Boolean(clinic.contact && (clinic.contact.phone || clinic.contact.address)) },
  ].filter(link => link.show);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F7]/95 backdrop-blur-md shadow-xs border-b border-[#E5E2DD] py-3.5'
          : 'bg-[#FAF9F7]/80 backdrop-blur-xs border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex flex-col focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7C9885] rounded-sm"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] group-hover:text-[#7C9885] transition-colors">
              {clinic.name}
            </span>
            {clinic.type && (
              <span className="text-[11px] tracking-wider uppercase font-medium text-[#5C5C5C] -mt-1 hidden sm:block">
                {clinic.type}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors tracking-wide relative py-1 focus:outline-hidden focus-visible:text-[#1A1A1A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            {clinic.contact.phone && (
              <a
                href={`tel:${clinic.contact.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center p-2.5 text-xs font-semibold text-[#1A1A1A] hover:text-[#7C9885] transition-colors border border-[#E5E2DD] hover:border-[#7C9885]/40 rounded-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7C9885]"
                title="Call Clinic"
                aria-label={`Call ${clinic.name} at ${clinic.contact.phone}`}
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onBookClick}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 shadow-xs hover:shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A] cursor-pointer"
            >
              <span>Request Appointment</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onBookClick}
              className="sm:hidden px-3.5 py-2 bg-[#1A1A1A] text-white text-xs font-medium tracking-wide rounded-full cursor-pointer"
            >
              Request
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-[#1A1A1A] hover:text-[#7C9885] rounded-md focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#7C9885] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#FAF9F7] border-b border-[#E5E2DD] shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-medium text-[#1A1A1A] hover:text-[#7C9885] py-2 border-b border-[#E5E2DD]/50"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Request Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {clinic.contact.phone && (
                <a
                  href={`tel:${clinic.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="w-full py-3 bg-white border border-[#E5E2DD] text-[#1A1A1A] text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7C9885]" />
                  <span>Call {clinic.contact.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
