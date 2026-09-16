import React, { useState } from 'react';
import { Stethoscope, Scan, Sparkles, ShieldCheck, HeartHandshake, Activity, Clock, Check, ArrowRight, Calendar } from 'lucide-react';
import { ClinicConfig, ClinicService } from '../config/clinic';

interface ServicesProps {
  clinic: ClinicConfig;
  onSelectService: (serviceName: string) => void;
}

const getServiceIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Stethoscope':
      return Stethoscope;
    case 'Scan':
      return Scan;
    case 'Sparkles':
      return Sparkles;
    case 'ShieldCheck':
      return ShieldCheck;
    case 'HeartHandshake':
      return HeartHandshake;
    case 'Activity':
      return Activity;
    default:
      return Sparkles;
  }
};

export const Services: React.FC<ServicesProps> = ({ clinic, onSelectService }) => {
  const services = clinic.services || [];
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    services.length > 0 ? services[0].id : ''
  );

  if (services.length === 0) {
    return null;
  }

  const activeService: ClinicService =
    services.find(s => s.id === selectedServiceId) || services[0];
  const ActiveIcon = getServiceIcon(activeService.iconName);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FAF9F7]" aria-label="Clinical Treatments and Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
              Clinical Offerings
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
              Dermatology Consultations &amp; Treatments
            </h2>
            <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
              Medical dermatology, targeted cutaneous therapies, and skin maintenance delivered with clinical precision.
            </p>
          </div>

          <div className="hidden lg:block text-right">
            <span className="text-xs text-[#5C5C5C] uppercase tracking-wider block">
              Direct Inquiries
            </span>
            <a
              href={`tel:${clinic.contact?.phone?.replace(/[^0-9+]/g, '')}`}
              className="text-sm font-semibold text-[#1A1A1A] hover:text-[#7C9885] transition-colors"
            >
              {clinic.contact?.phone}
            </a>
          </div>
        </div>

        {/* Interactive Treatment Explorer: High contrast split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Mobile Horizontal Swipeable Tabs (lg:hidden) */}
          <div className="lg:hidden flex overflow-x-auto scrollbar-none space-x-2.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.iconName);
              const isSelected = service.id === activeService.id;

              return (
                <button
                  key={service.id || index}
                  onClick={() => {
                    setSelectedServiceId(service.id);
                    setTimeout(() => {
                      const card = document.getElementById('service-detail-card');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }
                    }, 50);
                  }}
                  className={`shrink-0 px-4 py-3 rounded-xl border text-left transition-all duration-200 flex items-center space-x-2.5 cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'bg-white border-[#7C9885] shadow-xs text-[#1A1A1A]'
                      : 'bg-white/70 border-[#E5E2DD] text-[#5C5C5C]'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg text-xs ${
                      isSelected
                        ? 'bg-[#7C9885] text-white'
                        : 'bg-[#FAF9F7] text-[#7C9885] border border-[#E5E2DD]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-semibold whitespace-nowrap ${isSelected ? 'text-[#1A1A1A]' : 'text-[#5C5C5C]'}`}>
                    {service.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Left: Service Selection List (hidden lg:block) */}
          <div className="hidden lg:block lg:col-span-5 space-y-3">
            {services.map((service, index) => {
              const Icon = getServiceIcon(service.iconName);
              const isSelected = service.id === activeService.id;

              return (
                <button
                  key={service.id || index}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#7C9885] shadow-xs'
                      : 'bg-white/60 hover:bg-white border-[#E5E2DD] hover:border-[#7C9885]/40'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 pr-2">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-[#7C9885] text-white'
                          : 'bg-[#FAF9F7] text-[#7C9885] border border-[#E5E2DD]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4
                        className={`text-sm sm:text-base font-medium transition-colors ${
                          isSelected ? 'text-[#1A1A1A] font-semibold' : 'text-[#5C5C5C]'
                        }`}
                      >
                        {service.name}
                      </h4>
                      {service.category && (
                        <span className="text-[10px] tracking-wider uppercase text-[#7C9885] font-semibold">
                          {service.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#7C9885] translate-x-1' : 'text-[#E5E2DD]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Treatment Focus Card */}
          <div className="lg:col-span-7" id="service-detail-card">
            <div className="bg-white rounded-3xl border border-[#E5E2DD] p-5 sm:p-10 shadow-xs relative overflow-hidden transition-all duration-300">
              
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#7C9885]" />

              {/* Supporting Clinical Photography */}
              {clinic.images?.serviceSupporting && (
                <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-2xl overflow-hidden border border-[#E5E2DD] mb-6 bg-[#FAF9F7]">
                  <img
                    src={clinic.images.serviceSupporting}
                    alt="Clinical dermatology and skin health care"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_30%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3.5 text-[11px] font-medium text-white/95">
                    Dermatology &amp; Cutaneous Consultation
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-[#7C9885]/10 text-[#7C9885] border border-[#7C9885]/20">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    {activeService.category && (
                      <span className="text-xs uppercase tracking-widest text-[#7C9885] font-semibold">
                        {activeService.category}
                      </span>
                    )}
                    <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-medium">
                      {activeService.name}
                    </h3>
                  </div>
                </div>

                {activeService.duration && (
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FAF9F7] border border-[#E5E2DD] rounded-full text-xs text-[#5C5C5C]">
                    <Clock className="w-3.5 h-3.5 text-[#7C9885]" />
                    <span>{activeService.duration}</span>
                  </div>
                )}
              </div>

              {/* Factual Description */}
              <div className="space-y-4 text-[#5C5C5C] text-base leading-relaxed mb-8">
                <p>{activeService.description}</p>
              </div>

              {/* Specific Clinical Considerations if provided */}
              {activeService.benefits && activeService.benefits.length > 0 && (
                <div className="mb-8 pt-6 border-t border-[#E5E2DD]">
                  <h5 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-3">
                    Key Clinical Focus
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeService.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm text-[#5C5C5C]">
                        <Check className="w-4 h-4 text-[#7C9885] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctor Consultation Disclaimer */}
              <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#E5E2DD] text-xs sm:text-sm text-[#5C5C5C] mb-8 leading-relaxed">
                <p>
                  <strong>Clinical Note:</strong> Treatment suitability is determined through an individualized diagnostic consultation with {clinic.doctor?.name || 'our physician'}.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onSelectService(activeService.name)}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Consultation for this Treatment</span>
                </button>

                {clinic.contact?.phone && (
                  <a
                    href={`tel:${clinic.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:text-[#7C9885] border border-[#E5E2DD] hover:border-[#7C9885] rounded-full transition-colors"
                  >
                    <span>Call Clinic</span>
                  </a>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
