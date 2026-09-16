import React, { useState } from 'react';
import { Phone, Star, ArrowRight, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface HeroProps {
  clinic: ClinicConfig;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ clinic, onBookClick }) => {
  const [imageError, setImageError] = useState(false);
  const heroImage = clinic.images?.hero;
  const hasRating = clinic.rating && clinic.rating.value !== null && clinic.rating.value > 0;
  const hasPhone = Boolean(clinic.contact?.phone);
  const firstOpeningDay = clinic.hours ? Object.keys(clinic.hours)[0] : null;
  const firstOpeningHours = firstOpeningDay ? clinic.hours[firstOpeningDay] : null;

  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 sm:pt-32 md:pt-36 sm:pb-20 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-[#FAF9F7]"
      aria-label="Clinic Overview"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-8 z-10">
            
            {/* Top Meta Badges: Specialty & Google Rating */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
              {clinic.specialty && (
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E5E2DD] rounded-full text-[#5C5C5C] font-semibold tracking-wider uppercase text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C9885]"></span>
                  <span>{clinic.specialty}</span>
                </div>
              )}

              {hasRating && (
                <a
                  href={clinic.rating.googleReviewsUrl || '#reviews'}
                  target={clinic.rating.googleReviewsUrl ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white border border-[#E5E2DD] hover:border-[#7C9885]/50 transition-colors rounded-full text-[#1A1A1A] font-medium text-xs"
                >
                  <div className="flex text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-semibold text-xs">{clinic.rating.value?.toFixed(1)}</span>
                  <span className="text-[#5C5C5C]">
                    ({clinic.rating.reviewCount} Reviews)
                  </span>
                </a>
              )}
            </div>

            {/* Main Headline */}
            <div className="space-y-3.5 sm:space-y-4">
              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.12] text-[#1A1A1A] tracking-tight font-normal">
                {clinic.heroHeadline || clinic.name}
              </h1>
              
              <p className="text-[#5C5C5C] text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                {clinic.heroSubtext ||
                  `${clinic.name} provides consultant-led clinical dermatology and restorative therapies in a calm medical setting.`}
              </p>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center space-x-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#1A1A1A] hover:bg-[#7C9885] active:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer min-h-[48px]"
              >
                <span>Request an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {hasPhone && (
                <a
                  href={`tel:${clinic.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-white hover:bg-[#FAF9F7] active:bg-[#E5E2DD]/20 text-[#1A1A1A] border border-[#E5E2DD] hover:border-[#7C9885]/60 text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 min-h-[48px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7C9885]" />
                  <span>Call Clinic</span>
                </a>
              )}
            </div>

            {/* Subtle Clinical Highlights Bar */}
            <div className="pt-3.5 sm:pt-4 border-t border-[#E5E2DD]/80 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-[#5C5C5C]">
              {clinic.doctor?.name && (
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-full bg-[#7C9885]/10 text-[#7C9885] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="truncate">
                    Consultant: <strong className="text-[#1A1A1A] font-medium">{clinic.doctor.name}</strong>
                  </span>
                </div>
              )}

              {clinic.contact?.address && (
                <div className="flex items-center space-x-2.5">
                  <div className="p-1.5 rounded-full bg-[#7C9885]/10 text-[#7C9885] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="truncate max-w-[280px]" title={clinic.contact.address}>
                    {clinic.contact.address.split(',')[0]}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Refined Editorial Visual Composition */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Subtle Geometry */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-[#7C9885]/8 rounded-full blur-2xl pointer-events-none -z-10" />
              <div className="absolute -bottom-6 -left-6 w-80 h-80 bg-[#E5E2DD]/50 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Main Visual Container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-white shadow-md transition-transform duration-500 hover:shadow-lg">
                {heroImage && !imageError ? (
                  <div className="aspect-[16/11] sm:aspect-[4/5] w-full relative overflow-hidden bg-[#FAF9F7]">
                    <img
                      src={heroImage}
                      alt={`Clinical dermatology and skin health consultation at ${clinic.name}`}
                      loading="eager"
                      decoding="async"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-[center_28%] transform transition-transform duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Subtle Overlay Badge */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-[#E5E2DD] shadow-xs">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#5C5C5C] font-semibold">
                            Clinical Dermatology
                          </p>
                          <p className="text-xs font-semibold text-[#1A1A1A] truncate">
                            {clinic.name}
                          </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#7C9885]" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Refined Architectural / Monogram Visual Placeholder */
                  <div className="aspect-[16/11] sm:aspect-4/5 w-full bg-gradient-to-b from-white to-[#FAF9F7] p-6 sm:p-8 flex flex-col justify-between border-t-2 border-[#7C9885]">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#7C9885]/10 border border-[#7C9885]/20 flex items-center justify-center text-[#7C9885] font-editorial text-xl sm:text-2xl font-bold">
                        {clinic.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#7C9885]">
                          Clinical Practice
                        </span>
                        <p className="text-[10px] text-[#5C5C5C]">{clinic.specialty}</p>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-4 my-auto py-4 sm:py-8 text-center">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#7C9885]/10 text-[#7C9885] text-xs font-medium">
                        Doctor-Led Practice
                      </div>
                      <h3 className="font-editorial text-xl sm:text-3xl text-[#1A1A1A] font-medium leading-tight">
                        Dermatology &amp; Cutaneous Care
                      </h3>
                      <div className="w-12 h-px bg-[#7C9885]/40 mx-auto" />
                    </div>

                    <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E5E2DD] text-left space-y-0.5 sm:space-y-1">
                      <p className="text-xs font-medium text-[#1A1A1A]">{clinic.name}</p>
                      <p className="text-[11px] text-[#5C5C5C] truncate">{clinic.contact.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Hours Pill */}
              {firstOpeningHours && (
                <div className="flex absolute -bottom-3 left-3 sm:-bottom-4 sm:-left-4 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-[#E5E2DD] shadow-sm items-center space-x-2.5 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-[#FAF9F7] border border-[#E5E2DD] text-[#7C9885] shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#5C5C5C] uppercase tracking-wider font-semibold">Today's Clinic Hours</p>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{firstOpeningHours}</p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
