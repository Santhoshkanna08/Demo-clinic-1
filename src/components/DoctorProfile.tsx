import React, { useState } from 'react';
import { GraduationCap, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface DoctorProfileProps {
  clinic: ClinicConfig;
  onBookClick: () => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({ clinic, onBookClick }) => {
  const [imageError, setImageError] = useState(false);
  const doctor = clinic.doctor;

  // If doctor information is completely unavailable, cleanly hide the section
  if (!doctor || !doctor.name) {
    return null;
  }

  const hasPhoto = Boolean(doctor.photo) && !imageError;
  const hasQualifications = Boolean(doctor.qualifications && doctor.qualifications.trim().length > 0);
  const hasBio = Boolean(doctor.bio && doctor.bio.trim().length > 0);

  // Generate clean initials for monogram
  const initials = doctor.name
    .replace(/^Dr\.\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <section id="doctor" className="py-20 md:py-28 bg-white border-t border-[#E5E2DD]" aria-label="Meet the Doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
            Clinical Leadership
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
            Meet Your Treating Physician
          </h2>
          <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
            Direct clinical oversight and personalized medical management under certified specialist care.
          </p>
        </div>

        {/* Doctor Card with Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center bg-[#FAF9F7] rounded-3xl border border-[#E5E2DD] p-5 sm:p-10 lg:p-12 shadow-xs">
          
          {/* Doctor Portrait / Monogram Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-white shadow-sm aspect-[16/11] sm:aspect-[4/5] flex items-center justify-center">
                {hasPhoto ? (
                  <img
                    src={doctor.photo || ''}
                    alt={`Portrait of ${doctor.name}`}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-[center_top] filter contrast-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Refined Monogram / Initial Visual */
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-white to-[#FAF9F7] text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#7C9885]/10 border border-[#7C9885]/20 flex items-center justify-center text-[#7C9885] font-editorial text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4 shadow-xs">
                      {initials || 'DR'}
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] font-medium">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-[#5C5C5C] mt-1 uppercase tracking-wider font-semibold">
                      {doctor.specialty}
                    </p>
                    <div className="w-10 h-px bg-[#E5E2DD] my-3 sm:my-4" />
                    <span className="text-[11px] text-[#7C9885] uppercase tracking-widest font-medium">
                      Consultant Dermatologist
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Doctor Information & Credentials */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-[#E5E2DD] rounded-full text-xs text-[#7C9885] font-semibold tracking-wider uppercase mb-3">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{doctor.title || 'Consultant Dermatologist'}</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#1A1A1A] font-normal tracking-tight">
                {doctor.name}
              </h3>
              
              <p className="text-sm sm:text-base font-medium text-[#5C5C5C] mt-1">
                {doctor.specialty}
              </p>
            </div>

            {/* Qualifications - Rendered ONLY if verified */}
            {hasQualifications && (
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E5E2DD] space-y-2">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  <GraduationCap className="w-4 h-4 text-[#7C9885]" />
                  <span>Qualifications &amp; Credentials</span>
                </div>
                <p className="text-sm text-[#5C5C5C] leading-relaxed font-normal">
                  {doctor.qualifications}
                </p>
              </div>
            )}

            {/* Bio / Philosophy - Rendered ONLY if provided */}
            {hasBio && (
              <div className="space-y-3 text-sm sm:text-base text-[#5C5C5C] leading-relaxed">
                <p>{doctor.bio}</p>
              </div>
            )}

            {/* Clinical Standards Checklist */}
            <div className="pt-2 border-t border-[#E5E2DD] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#5C5C5C]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C9885] shrink-0" />
                <span>Individual diagnostic consultations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C9885] shrink-0" />
                <span>Conservative treatment protocols</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C9885] shrink-0" />
                <span>Structured follow-up reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#7C9885] shrink-0" />
                <span>Direct physician oversight</span>
              </div>
            </div>

            {/* Book CTA */}
            <div className="pt-2 sm:pt-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#7C9885] active:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs min-h-[48px]"
              >
                <span>Request Consultation with {doctor.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
