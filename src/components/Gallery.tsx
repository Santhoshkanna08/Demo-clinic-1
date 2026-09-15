import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { ClinicConfig, GalleryItem } from '../config/clinic';

interface GalleryProps {
  clinic: ClinicConfig;
}

export const Gallery: React.FC<GalleryProps> = ({ clinic }) => {
  const galleryItems = clinic.gallery || [];
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Per Missing Data Rule: If clinic has no gallery items, hide cleanly
  if (galleryItems.length === 0) {
    return null;
  }

  // Map items to editorial positions
  const item0 = galleryItems[0]; // Large tall image
  const item1 = galleryItems[1]; // Small top-right
  const item2 = galleryItems[2]; // Small mid-right
  const item3 = galleryItems[3]; // Small bottom-left
  const item4 = galleryItems[4] || galleryItems[0]; // Wide panorama

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white border-t border-[#E5E2DD]" aria-label="Clinical Environment and Concept Gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
              Clinical Setting
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
              Clinical Environment &amp; Care Spaces
            </h2>
            <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
              Curated concepts reflecting our commitment to calm, organized consultation spaces, advanced diagnostics, and dedicated patient privacy.
            </p>
          </div>

          <div className="text-xs text-[#5C5C5C] md:text-right">
            <span className="inline-block px-3 py-1.5 rounded-full bg-[#FAF9F7] border border-[#E5E2DD] text-[11px] font-medium text-[#1A1A1A]">
              Practice Environment Concepts
            </span>
          </div>
        </div>

        {/* Editorial Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* [ LARGE IMAGE ] Spans 7 cols and 2 rows on desktop */}
          {item0 && (
            <div
              onClick={() => setLightboxImage(item0)}
              className="lg:col-span-7 lg:row-span-2 group relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-[#FAF9F7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 min-h-[340px] sm:min-h-[420px] lg:min-h-[500px]"
            >
              <img
                src={item0.imageUrl}
                alt={item0.alt || item0.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7C9885] font-semibold bg-white px-2 py-0.5 rounded-xs">
                      {item0.category}
                    </span>
                    <h3 className="font-editorial text-2xl font-medium text-white mt-1.5">
                      {item0.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">{item0.alt}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 ml-3">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* [ SMALL TOP-RIGHT ] Spans 5 cols */}
          {item1 && (
            <div
              onClick={() => setLightboxImage(item1)}
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-[#FAF9F7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]"
            >
              <img
                src={item1.imageUrl}
                alt={item1.alt || item1.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7C9885] font-semibold bg-white px-2 py-0.5 rounded-xs">
                      {item1.category}
                    </span>
                    <h3 className="font-editorial text-lg font-medium text-white mt-1">
                      {item1.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 ml-2">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* [ SMALL MID-RIGHT ] Spans 5 cols */}
          {item2 && (
            <div
              onClick={() => setLightboxImage(item2)}
              className="lg:col-span-5 group relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-[#FAF9F7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]"
            >
              <img
                src={item2.imageUrl}
                alt={item2.alt || item2.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7C9885] font-semibold bg-white px-2 py-0.5 rounded-xs">
                      {item2.category}
                    </span>
                    <h3 className="font-editorial text-lg font-medium text-white mt-1">
                      {item2.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 ml-2">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* [ SMALL BOTTOM-LEFT ] Spans 4 cols */}
          {item3 && (
            <div
              onClick={() => setLightboxImage(item3)}
              className="sm:col-span-1 lg:col-span-4 group relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-[#FAF9F7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]"
            >
              <img
                src={item3.imageUrl}
                alt={item3.alt || item3.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7C9885] font-semibold bg-white px-2 py-0.5 rounded-xs">
                      {item3.category}
                    </span>
                    <h3 className="font-editorial text-lg font-medium text-white mt-1">
                      {item3.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 ml-2">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* [ WIDE IMAGE BOTTOM ] Spans 8 cols */}
          {item4 && (
            <div
              onClick={() => setLightboxImage(item4)}
              className="sm:col-span-2 lg:col-span-8 group relative rounded-2xl overflow-hidden border border-[#E5E2DD] bg-[#FAF9F7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/9] lg:aspect-[21/9]"
            >
              <img
                src={item4.imageUrl}
                alt={item4.alt || item4.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7C9885] font-semibold bg-white px-2 py-0.5 rounded-xs">
                      {item4.category}
                    </span>
                    <h3 className="font-editorial text-xl sm:text-2xl font-medium text-white mt-1">
                      {item4.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-1">{item4.alt}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 ml-3">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Clean Lightbox Modal */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImage.title}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-[#1A1A1A] transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="relative flex-1 flex items-center justify-center bg-black/40 p-2">
                <img
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.alt || lightboxImage.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-6 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#7C9885] font-semibold">
                    {lightboxImage.category}
                  </span>
                  <h3 className="font-editorial text-xl text-white font-medium mt-0.5">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-xs text-white/60 mt-1">{lightboxImage.alt}</p>
                </div>
                <span className="text-xs text-white/40">{clinic.name}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
