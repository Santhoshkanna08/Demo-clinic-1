import React, { useState, useEffect } from 'react';
import { clinic } from './config/clinic';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { About } from './components/About';
import { DoctorProfile } from './components/DoctorProfile';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PatientExperience } from './components/PatientExperience';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { AppointmentForm } from './components/AppointmentForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [preselectedService, setPreselectedService] = useState<string>('');

  const scrollToAppointment = () => {
    const el = document.getElementById('book-appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        if (input) input.focus();
      }, 400);
    }
  };

  const handleSelectService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToAppointment();
  };

  // Set document title and inject local healthcare Schema.org JSON-LD using only verified clinic data
  useEffect(() => {
    document.title = `${clinic.name} | ${clinic.specialty || clinic.type}`;

    // Generate local medical business structured data with only verified data
    const structuredData: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": clinic.name,
      "description": clinic.heroSubtext || clinic.specialty,
      "telephone": clinic.contact.phone,
      "medicalSpecialty": clinic.specialty,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": clinic.contact.address
      }
    };

    if (clinic.doctor?.name) {
      structuredData.physician = {
        "@type": "Physician",
        "name": clinic.doctor.name,
        "medicalSpecialty": clinic.doctor.specialty
      };
    }

    if (clinic.rating?.value && clinic.rating.reviewCount) {
      structuredData.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": clinic.rating.value,
        "reviewCount": clinic.rating.reviewCount
      };
    }

    // Insert or update script element
    const existingScript = document.getElementById('clinic-schema-jsonld');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(structuredData);
    } else {
      const script = document.createElement('script');
      script.id = 'clinic-schema-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1A1A1A] pb-16 sm:pb-0">
      {/* Sticky Header */}
      <Header
        clinic={clinic}
        onBookClick={scrollToAppointment}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          clinic={clinic}
          onBookClick={scrollToAppointment}
        />

        <TrustStrip
          clinic={clinic}
        />

        <About
          clinic={clinic}
          onBookClick={scrollToAppointment}
        />

        <DoctorProfile
          clinic={clinic}
          onBookClick={scrollToAppointment}
        />

        <Services
          clinic={clinic}
          onSelectService={handleSelectService}
        />

        <WhyChooseUs
          clinic={clinic}
        />

        <PatientExperience
          clinic={clinic}
          onBookClick={scrollToAppointment}
        />

        <Gallery
          clinic={clinic}
        />

        <Testimonials
          clinic={clinic}
        />

        <AppointmentForm
          clinic={clinic}
          preselectedService={preselectedService}
        />

        <Contact
          clinic={clinic}
        />
      </main>

      {/* Footer */}
      <Footer
        clinic={clinic}
      />

      {/* Floating WhatsApp Action for Tablet / Desktop */}
      <WhatsAppButton
        clinic={clinic}
      />

      {/* Unified Bottom Sticky Action Bar for Mobile */}
      <MobileStickyBar
        clinic={clinic}
        onBookClick={scrollToAppointment}
      />
    </div>
  );
}
