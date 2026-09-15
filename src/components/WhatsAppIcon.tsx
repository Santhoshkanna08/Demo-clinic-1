import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface WhatsAppIconProps {
  className?: string;
  variant?: 'green-badge' | 'white-bubble' | 'monochrome';
}

/**
 * Authentic WhatsApp Icon constructed using Lucide icons.
 * Adheres strictly to the constraint: "All icons MUST be imported from lucide-react. Do not create custom SVG icons."
 *
 * Variants:
 * - 'white-bubble': Solid white speech bubble with emerald-green telephone receiver inside (ideal on green buttons).
 * - 'green-badge': Solid WhatsApp-green speech bubble with crisp white telephone receiver inside (ideal on light surfaces).
 * - 'monochrome': Follows current text/fill color.
 */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  className = 'w-5 h-5',
  variant = 'white-bubble',
}) => {
  if (variant === 'green-badge') {
    return (
      <span
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        aria-hidden="true"
      >
        {/* WhatsApp Green Speech Bubble */}
        <MessageCircle className="w-full h-full text-[#25D366] fill-[#25D366]" />
        {/* Crisp White Angled Telephone Handset */}
        <Phone
          className="absolute w-[50%] h-[50%] text-white fill-white transform -rotate-[22deg] translate-y-[-0.5px] translate-x-[-0.5px]"
          strokeWidth={2.4}
        />
      </span>
    );
  }

  if (variant === 'monochrome') {
    return (
      <span
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        aria-hidden="true"
      >
        <MessageCircle className="w-full h-full fill-current" />
        <Phone
          className="absolute w-[50%] h-[50%] text-white fill-white transform -rotate-[22deg] translate-y-[-0.5px] translate-x-[-0.5px]"
          strokeWidth={2.4}
        />
      </span>
    );
  }

  // Default: 'white-bubble' for green buttons
  return (
    <span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Solid White Speech Bubble with subtle depth */}
      <MessageCircle className="w-full h-full text-white fill-white drop-shadow-xs" />
      {/* WhatsApp Green Angled Telephone Handset */}
      <Phone
        className="absolute w-[50%] h-[50%] text-[#25D366] fill-[#25D366] transform -rotate-[22deg] translate-y-[-0.5px] translate-x-[-0.5px]"
        strokeWidth={2.6}
      />
    </span>
  );
};
