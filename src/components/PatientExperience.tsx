import React from 'react';
import { Calendar, Stethoscope, FileText, Activity, ArrowRight } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface PatientExperienceProps {
  clinic: ClinicConfig;
  onBookClick: () => void;
}

export const PatientExperience: React.FC<PatientExperienceProps> = ({ clinic, onBookClick }) => {
  const steps = clinic.patientJourney || [];

  if (steps.length === 0) {
    return null;
  }

  const stepIcons = [Calendar, Stethoscope, FileText, Activity];

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#FAF9F7]" aria-label="Patient Experience and Journey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
            The Consultation Pathway
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
            The Consultation Pathway
          </h2>
          <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
            From your initial appointment request to post-procedure follow-up, our clinical process is designed to be structured, transparent, and respectful of your time.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Subtle Horizontal Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-px bg-[#E5E2DD] -z-0" />

          {steps.map((item, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <div key={item.step || index} className="relative z-10 flex flex-col bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E2DD] shadow-xs">
                
                {/* Step Indicator & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-editorial text-3xl font-semibold text-[#7C9885]">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF9F7] border border-[#E5E2DD] text-[#1A1A1A] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#7C9885]" />
                  </div>
                </div>

                <h3 className="font-editorial text-xl text-[#1A1A1A] font-medium mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed flex-1">
                  {item.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[#E5E2DD]/70 text-[11px] uppercase tracking-wider text-[#5C5C5C] font-medium">
                  Phase 0{index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-14 p-8 rounded-3xl bg-white border border-[#E5E2DD] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-editorial text-2xl text-[#1A1A1A] font-medium">
              Ready to begin your consultation?
            </h4>
            <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1">
              Select an available time that fits your schedule with our reception coordinator.
            </p>
          </div>

          <button
            onClick={onBookClick}
            className="shrink-0 inline-flex items-center space-x-2 px-7 py-3.5 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>Request Initial Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
