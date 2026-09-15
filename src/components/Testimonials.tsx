import React from 'react';
import { Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';

interface TestimonialsProps {
  clinic: ClinicConfig;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ clinic }) => {
  const reviews = clinic.verifiedReviews || [];
  const hasRating = Boolean(clinic.rating && clinic.rating.value !== null && clinic.rating.value > 0);
  const ratingValue = clinic.rating?.value;
  const reviewCount = clinic.rating?.reviewCount;
  const reviewsUrl = clinic.rating?.googleReviewsUrl || clinic.contact?.googleMapsUrl;

  // If no rating and no reviews exist, hide the section cleanly
  if (!hasRating && reviews.length === 0) {
    return null;
  }

  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-[#FAF9F7] border-t border-[#E5E2DD]"
      aria-label="Patient Reviews"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
              Public Feedback
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
              Patient Reviews
            </h2>
            <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
              Read authentic perspectives from patients who have visited {clinic.name}.
            </p>
          </div>

          {/* Rating Summary Card */}
          {hasRating && (
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5E2DD] shadow-xs flex items-center space-x-5 shrink-0">
              <div className="text-center pr-4 border-r border-[#E5E2DD]">
                <span className="font-editorial text-4xl font-semibold text-[#1A1A1A] block leading-none">
                  {ratingValue?.toFixed(1)}
                </span>
                <div className="flex text-amber-500 mt-1.5 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  Google Reviews
                </p>
                <p className="text-xs text-[#5C5C5C] mt-0.5">
                  Based on {reviewCount} Google reviews
                </p>

                {reviewsUrl && (
                  <a
                    href={reviewsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#7C9885] hover:underline mt-2"
                  >
                    <span>View Google Reviews</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selected Reviews Grid - Only displayed if verified reviews are provided */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E2DD] shadow-xs flex flex-col justify-between hover:border-[#7C9885]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#5C5C5C] uppercase tracking-wider font-medium">
                      {rev.source}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed italic mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E2DD]/70 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#7C9885]/10 text-[#7C9885] flex items-center justify-center text-xs font-semibold">
                      {rev.author[0]}
                    </div>
                    <span className="text-xs font-semibold text-[#1A1A1A]">{rev.author}</span>
                  </div>
                  {rev.date && (
                    <span className="text-[11px] text-[#5C5C5C]">{rev.date}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* When individual review texts are omitted, display verified Google review portal card */
          <div className="bg-white rounded-3xl border border-[#E5E2DD] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#7C9885]/10 text-[#7C9885] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A] font-medium mb-2">
              Google Patient Reviews
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed mb-6">
              Our clinic reviews are published directly on Google by patients who have visited {clinic.name}. We invite you to view all public reviews and ratings.
            </p>
            {reviewsUrl && (
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
