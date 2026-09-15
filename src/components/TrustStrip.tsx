import React from 'react';
import { Star, MapPin, UserCheck, CalendarCheck } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface TrustStripProps {
  clinic: ClinicConfig;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ clinic }) => {
  const hasRating = clinic.rating && clinic.rating.value !== null && clinic.rating.value > 0;
  const doctorName = clinic.doctor?.name;
  const addressShort = clinic.contact?.address ? clinic.contact.address.split(',')[0] : null;

  // Build trust points dynamically ONLY using verified information
  const trustPoints = [
    hasRating && {
      icon: Star,
      title: `${clinic.rating.value?.toFixed(1)} Rating`,
      description: `Based on ${clinic.rating.reviewCount} Google reviews`,
      link: clinic.rating.googleReviewsUrl
    },
    doctorName && {
      icon: UserCheck,
      title: 'Consultant-Led',
      description: doctorName,
      link: '#doctor'
    },
    {
      icon: CalendarCheck,
      title: 'Direct Scheduling',
      description: 'Simple Enquiry & Confirmation',
      link: '#book-appointment'
    },
    addressShort && {
      icon: MapPin,
      title: 'Clinic Location',
      description: addressShort,
      link: '#contact'
    }
  ].filter(Boolean) as Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    link?: string;
  }>;

  if (trustPoints.length === 0) return null;

  return (
    <div className="border-y border-[#E5E2DD] bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E5E2DD]">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            const content = (
              <div className={`flex items-start space-x-3.5 ${index > 0 ? 'md:pl-6 pt-4 md:pt-0' : ''}`}>
                <div className="p-2.5 rounded-lg bg-[#FAF9F7] text-[#7C9885] border border-[#E5E2DD]/80 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    {point.title}
                  </p>
                  <p className="text-xs text-[#5C5C5C] truncate mt-0.5 font-normal">
                    {point.description}
                  </p>
                </div>
              </div>
            );

            return point.link ? (
              <a
                key={index}
                href={point.link}
                className="block group hover:opacity-85 transition-opacity"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
