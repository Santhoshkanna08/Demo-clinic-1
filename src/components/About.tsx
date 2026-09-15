import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Stethoscope, ArrowRight } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface AboutProps {
  clinic: ClinicConfig;
  onBookClick: () => void;
}

export const About: React.FC<AboutProps> = ({ clinic, onBookClick }) => {
  const [imageError, setImageError] = useState(false);
  const aboutImage = clinic.images?.about || clinic.images?.hero;

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF9F7]" aria-label="About the Clinic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tagline */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
            Clinical Practice
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
            Consultation &amp; Clinical Dermatology Care
          </h2>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-white shadow-sm">
                {aboutImage && !imageError ? (
                  <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#FAF9F7]">
                    <img
                      src={aboutImage}
                      alt="Dermatology consultation room and clinical interior concept"
                      loading="lazy"
                      decoding="async"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="aspect-4/3 w-full bg-white p-8 sm:p-10 flex flex-col justify-between border-l-4 border-[#7C9885]">
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-widest font-semibold text-[#7C9885]">
                        The Practice
                      </p>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A]">
                        {clinic.name}
                      </h3>
                    </div>

                    <div className="space-y-3 py-6 text-sm text-[#5C5C5C] leading-relaxed">
                      <p>
                        Established for clinical dermatology and skin health care, our practice focuses on individualized patient evaluations and conservative management.
                      </p>
                      <p>
                        Consultations are conducted with direct diagnostic examination and clear physician communication.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E2DD] flex items-center justify-between text-xs text-[#5C5C5C]">
                      <span>Medical Practice</span>
                      <span className="font-medium text-[#1A1A1A]">{clinic.specialty}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Clinical Consideration Card */}
              <div className="mt-4 sm:mt-6 bg-white p-5 rounded-xl border border-[#E5E2DD] shadow-xs">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-[#7C9885]/10 text-[#7C9885] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                      Physician-Led Examinations
                    </h4>
                    <p className="text-xs text-[#5C5C5C] mt-1 leading-relaxed">
                      Treatments are planned around clinical assessments and individual skin presentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Narrative Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A] leading-snug">
                Dedicated Focus on Skin Health
              </h3>
              <p className="text-[#5C5C5C] text-base leading-relaxed">
                At {clinic.name}, we provide clinical dermatology consultations for patients seeking diagnostic guidance for acute and ongoing skin conditions.
              </p>
              <p className="text-[#5C5C5C] text-base leading-relaxed">
                Whether assessing dermatological concerns such as acne and rosacea, performing dermoscopic mole examinations, or discussing treatment options, each visit is scheduled with dedicated physician time.
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-[#E5E2DD] bg-white">
                <div className="text-[#7C9885] mb-2">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-[#1A1A1A]">Clinical Examination</h4>
                <p className="text-xs text-[#5C5C5C] mt-1 leading-relaxed">
                  Evaluations focused on assessing your symptoms and clinical history.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E5E2DD] bg-white">
                <div className="text-[#7C9885] mb-2">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-[#1A1A1A]">Structured Planning</h4>
                <p className="text-xs text-[#5C5C5C] mt-1 leading-relaxed">
                  Clear care recommendations, home care guidance, and review timelines.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:text-[#7C9885] group transition-colors cursor-pointer"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
