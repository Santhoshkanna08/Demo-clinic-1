import React from 'react';
import { UserCheck, Shield, Clock, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface WhyChooseUsProps {
  clinic: ClinicConfig;
}

const getAdvantageIcon = (iconName?: string) => {
  switch (iconName) {
    case 'UserCheck':
      return UserCheck;
    case 'Shield':
      return Shield;
    case 'Clock':
      return Clock;
    case 'MessageCircle':
      return MessageCircle;
    case 'MapPin':
      return MapPin;
    default:
      return Sparkles;
  }
};

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ clinic }) => {
  const items = clinic.whyChooseUs || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-white border-y border-[#E5E2DD]" aria-label="Clinical Principles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
            Standards of Care
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
            Clinical Principles at {clinic.name}
          </h2>
          <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
            A medical practice founded on patient confidentiality, diagnostic thoroughness, and dedicated treatment planning.
          </p>
        </div>

        {/* Varied Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, index) => {
            const Icon = getAdvantageIcon(item.iconName);
            return (
              <div
                key={index}
                className="relative bg-[#FAF9F7] rounded-2xl p-6 sm:p-7 border border-[#E5E2DD] flex flex-col justify-between hover:border-[#7C9885]/60 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E2DD] text-[#7C9885] flex items-center justify-center mb-5 group-hover:bg-[#7C9885] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-editorial text-xl text-[#1A1A1A] font-medium leading-snug mb-2.5">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E2DD]/70 flex items-center justify-between text-[11px] text-[#5C5C5C] uppercase tracking-wider font-semibold">
                  <span>Principle 0{index + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C9885]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitment note */}
        <div className="mt-12 bg-[#FAF9F7] rounded-2xl border border-[#E5E2DD] p-6 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
            <strong className="text-[#1A1A1A]">Our Commitment:</strong> We adhere strictly to medical ethics. We will never recommend unnecessary procedures or treatments incompatible with your clinical diagnosis.
          </p>
        </div>

      </div>
    </section>
  );
};
