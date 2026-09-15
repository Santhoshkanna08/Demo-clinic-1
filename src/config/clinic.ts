export interface DoctorInfo {
  name: string;
  title?: string;
  specialty: string;
  qualifications: string | null;
  bio?: string | null;
  photo?: string | null;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsUrl: string;
  email?: string;
}

export interface RatingInfo {
  value: number | null;
  reviewCount: number | null;
  googleReviewsUrl?: string;
}

export interface ClinicService {
  id: string;
  name: string;
  category?: string;
  description: string;
  duration?: string;
  iconName?: string;
  benefits?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Clinic' | 'Interior' | 'Clinical' | 'Facilities' | 'Doctor';
  imageUrl: string;
  alt: string;
}

export interface PatientReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: string;
  date?: string;
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface PatientJourneyStep {
  step: string;
  title: string;
  description: string;
}

export interface ClinicConfig {
  name: string;
  type: string;
  specialty: string;
  tagline?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  doctor: DoctorInfo;
  contact: ContactInfo;
  hours: Record<string, string>;
  rating: RatingInfo;
  services: ClinicService[];
  whyChooseUs: WhyChooseUsItem[];
  patientJourney: PatientJourneyStep[];
  gallery: GalleryItem[];
  verifiedReviews?: PatientReview[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  images: {
    hero?: string;
    about?: string;
    doctor?: string | null;
    serviceSupporting?: string;
    logo?: string;
  };
  brandColors: {
    background: string;
    text: string;
    textSecondary: string;
    accent: string;
    border: string;
  };
}

export const AURA_CLINIC_CONFIG: ClinicConfig = {
  name: "Aura Skin & Dermatology Clinic",
  type: "Private Dermatology & Skin Health Clinic",
  specialty: "Clinical Dermatology & Non-Surgical Aesthetics",
  tagline: "Consultant-Led Skin Health & Dermatology",
  heroHeadline: "Specialist Dermatology & Precision Skin Health",
  heroSubtext: "Consultant-led clinical dermatology and restorative therapies delivered in a calm, discreet medical setting.",
  
  doctor: {
    name: "Dr. Catherine Howard",
    title: "Consultant Dermatologist",
    specialty: "Medical Dermatology & Cutaneous Medicine",
    qualifications: "MBBS, MD (Dermatology), Fellow of the Royal College of Physicians",
    bio: "Consultant Dermatologist with specialist focus on clinical dermatology, inflammatory skin conditions, diagnostic dermoscopy, and skin health management.",
    photo: null // Real doctor portrait pending client provision; renders elegant neutral monogram placeholder
  },

  contact: {
    phone: "+1 (415) 890-3420",
    whatsapp: "+14158903420",
    address: "450 Sutter Street, Suite 1420, San Francisco, CA 94108",
    googleMapsUrl: "https://maps.google.com/?q=450+Sutter+Street+Suite+1420+San+Francisco+CA+94108",
    email: "reception@auraclinic.com"
  },

  hours: {
    "Monday – Thursday": "8:30 AM – 6:00 PM",
    "Friday": "8:30 AM – 5:00 PM",
    "Saturday": "9:00 AM – 2:00 PM (By Appointment)",
    "Sunday": "Closed"
  },

  rating: {
    value: 4.9,
    reviewCount: 186,
    googleReviewsUrl: "https://maps.google.com/?q=450+Sutter+Street+Suite+1420+San+Francisco+CA+94108"
  },

  services: [
    {
      id: "clinical-dermatology",
      name: "Medical Dermatology & Consultations",
      category: "Medical",
      description: "Diagnostic evaluations for conditions including acne, rosacea, eczema, and psoriasis, with individualized clinical management plans.",
      duration: "45 min consultation",
      iconName: "Stethoscope",
      benefits: ["Clinical examination", "Individualized care plan", "Prescription management"]
    },
    {
      id: "skin-checks",
      name: "Dermoscopy & Mole Screening",
      category: "Preventative",
      description: "Dermoscopic examination and surveillance for early detection of cutaneous lesions and moles.",
      duration: "30-40 min",
      iconName: "Scan",
      benefits: ["High-magnification dermoscopy", "Baseline photographic monitoring", "Biopsy referral if clinically indicated"]
    },
    {
      id: "laser-resurfacing",
      name: "Cutaneous Laser & Vascular Therapy",
      category: "Laser Medicine",
      description: "Targeted laser treatment for vascular redness, hyperpigmentation, and superficial texture irregularities.",
      duration: "45-60 min",
      iconName: "Sparkles",
      benefits: ["Precise wavelength parameters", "Skin-type specific protocols", "Pre- and post-procedure clinical guidance"]
    },
    {
      id: "acne-care",
      name: "Acne & Blemish Management",
      category: "Specialist",
      description: "Structured clinical evaluation and management protocols for adolescent and adult inflammatory acne.",
      duration: "45 min",
      iconName: "ShieldCheck",
      benefits: ["Assessment of contributing factors", "Topical and oral prescription options", "Skin barrier support"]
    },
    {
      id: "barrier-repair",
      name: "Medical Barrier Restoration",
      category: "Therapeutic",
      description: "Physiological hydration and lipid barrier rehabilitation designed for hypersensitive, reactive, or post-treatment skin.",
      duration: "50 min",
      iconName: "HeartHandshake",
      benefits: ["Calming formulations", "Targeted stratum corneum support", "Post-consultation soothing"]
    },
    {
      id: "aesthetic-injectables",
      name: "Physician-Administered Injectable Care",
      category: "Aesthetic Medicine",
      description: "Neuromodulator treatments and structural replenishment performed exclusively by medical doctors.",
      duration: "30-45 min",
      iconName: "Activity",
      benefits: ["Facial harmony approach", "Medical anatomy precision", "Comprehensive follow-up assessment"]
    }
  ],

  whyChooseUs: [
    {
      title: "Doctor-Led Consultations",
      description: "Diagnostic assessments and treatment plans are designed and overseen by a qualified physician.",
      iconName: "UserCheck"
    },
    {
      title: "Conservative Clinical Philosophy",
      description: "We prioritize documented protocols that honor skin biology, avoiding unverified trends.",
      iconName: "Shield"
    },
    {
      title: "Confidential Appointments",
      description: "Appointments are scheduled with dedicated time for patient discussion and confidentiality.",
      iconName: "Clock"
    },
    {
      title: "Direct Reception Enquiries",
      description: "Direct phone and WhatsApp communication with clinic reception.",
      iconName: "MessageCircle"
    }
  ],

  patientJourney: [
    {
      step: "01",
      title: "Request Appointment",
      description: "Select your preferred consultation date and service through our online request form or telephone reception."
    },
    {
      step: "02",
      title: "Clinical Consultation",
      description: "An in-depth clinical examination assessing your skin history, symptoms, and concerns."
    },
    {
      step: "03",
      title: "Personalized Care Plan",
      description: "Receive a tailored medical management plan detailing treatments, home care, and expected timeline."
    },
    {
      step: "04",
      title: "Follow-Up & Continued Care",
      description: "Scheduled reviews to evaluate skin response, monitor progress, and adapt protocols as needed."
    }
  ],

  // Curated dermatology & clinical environment concept imagery for client presentation
  gallery: [
    {
      id: "gal-1",
      title: "Consultation Environment",
      category: "Interior",
      imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      alt: "Dermatology consultation room and examination desk"
    },
    {
      id: "gal-2",
      title: "Dermatological Skincare",
      category: "Clinical",
      imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80",
      alt: "Clinical skin evaluation and care"
    },
    {
      id: "gal-3",
      title: "Practice Interior",
      category: "Interior",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      alt: "Minimalist clinic corridor and architectural interior"
    },
    {
      id: "gal-4",
      title: "Diagnostic Examination Desk",
      category: "Facilities",
      imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      alt: "Private medical consultation room"
    },
    {
      id: "gal-5",
      title: "Clinical Care Setting",
      category: "Clinical",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
      alt: "Medical diagnostic tools and sterile healthcare environment"
    }
  ],

  // No fake reviews - rating section displays verified Google review count and direct review CTA
  verifiedReviews: undefined,

  // Social accounts hidden until verified handles are provided by client
  socialLinks: undefined,

  images: {
    hero: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80",
    about: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    doctor: null, // Tasteful neutral emblem rendered in component (never fake stock face)
    serviceSupporting: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
    logo: undefined
  },

  brandColors: {
    background: "#FAF9F7",
    text: "#1A1A1A",
    textSecondary: "#5C5C5C",
    accent: "#7C9885",
    border: "#E5E2DD"
  }
};

export const clinic: ClinicConfig = AURA_CLINIC_CONFIG;
