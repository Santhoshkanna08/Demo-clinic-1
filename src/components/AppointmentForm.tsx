import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, User, Stethoscope, MessageSquare, Shield, CheckCircle2, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { ClinicConfig } from '../config/clinic';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AppointmentFormProps {
  clinic: ClinicConfig;
  preselectedService?: string;
}

// Configurable endpoint: when a live server endpoint is provided, the form POSTs directly.
// In demonstration mode without a backend endpoint, it formats the request and offers direct
// verified WhatsApp and telephone transmission without faking a database storage response.
const SUBMISSION_ENDPOINT: string | null = null;

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ clinic, preselectedService }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8:30 AM – 12:00 PM)');
  const [service, setService] = useState(preselectedService || 'Medical Dermatology & Consultations');
  const [message, setMessage] = useState('');
  
  // Honeypot spam prevention
  const [honeypot, setHoneypot] = useState('');

  // States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [preparedRequest, setPreparedRequest] = useState<{
    text: string;
    whatsappUrl: string;
  } | null>(null);
  const [liveSubmitted, setLiveSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  // Today's date string for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errs.phone = 'Please enter a valid telephone number';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please select a preferred appointment date';
    } else if (preferredDate < todayStr) {
      errs.preferredDate = 'Please select a future date';
    }

    if (!service) {
      errs.service = 'Please select a consultation service';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam honeypot check
    if (honeypot.trim().length > 0) {
      return;
    }

    if (!validate()) {
      return;
    }

    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      preferredDate,
      preferredTime,
      service,
      message: message.trim() || undefined,
      clinic: clinic.name
    };

    // If a live endpoint is supplied, perform a real network submission
    if (SUBMISSION_ENDPOINT) {
      setIsSubmitting(true);
      try {
        const res = await fetch(SUBMISSION_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }

        setLiveSubmitted(true);
      } catch (err: any) {
        setSubmitError(err?.message || 'Unable to transmit appointment request. Please contact clinic reception directly.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Concept / Presentation Mode: We do NOT fake a database submission
    // Instead, prepare the structured enquiry for direct transmission to reception
    const enquiryLines = [
      `Hello ${clinic.name},`,
      `I would like to request an appointment:`,
      `• Patient: ${payload.fullName}`,
      `• Phone: ${payload.phone}`,
      `• Consultation: ${payload.service}`,
      `• Preferred Date: ${payload.preferredDate}`,
      `• Preferred Time: ${payload.preferredTime}`
    ];

    if (payload.message) {
      enquiryLines.push(`• Notes: ${payload.message}`);
    }

    const formattedText = enquiryLines.join('\n');
    const cleanWhatsApp = clinic.contact?.whatsapp?.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(formattedText)}`;

    setPreparedRequest({
      text: formattedText,
      whatsappUrl
    });
  };

  const handleReset = () => {
    setPreparedRequest(null);
    setLiveSubmitted(false);
    setFullName('');
    setPhone('');
    setPreferredDate('');
    setMessage('');
    setErrors({});
  };

  const hasPhone = Boolean(clinic.contact?.phone);
  const hasWhatsApp = Boolean(clinic.contact?.whatsapp);

  return (
    <section id="book-appointment" className="py-20 md:py-28 bg-white border-t border-[#E5E2DD]" aria-label="Appointment Request Form">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7C9885] block mb-2">
            Appointments
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal leading-tight">
            Request a Consultation
          </h2>
          <p className="text-[#5C5C5C] text-sm sm:text-base mt-3 leading-relaxed">
            Submit your preferred date and consultation type below. Our reception team will review clinical availability and contact you to confirm your booking.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Form Box */}
          <div className="lg:col-span-8 bg-[#FAF9F7] rounded-3xl border border-[#E5E2DD] p-5 sm:p-10 shadow-xs">
            
            {/* Live Endpoint Success State */}
            {liveSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#7C9885]/10 text-[#7C9885] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1A1A1A]">
                  Appointment Request Received
                </h3>
                <p className="text-sm text-[#5C5C5C] max-w-md mx-auto leading-relaxed">
                  Thank you, {fullName}. Our administrative team at {clinic.name} will contact you at {phone} to finalize your consultation time.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold rounded-full cursor-pointer hover:bg-[#7C9885] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : preparedRequest ? (
              /* Presentation Mode: Prepared Request State */
              <div className="py-4 space-y-6">
                <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-[#E5E2DD]">
                  <div className="p-2 rounded-xl bg-[#7C9885]/10 text-[#7C9885] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-xl text-[#1A1A1A] font-medium">
                      Appointment Enquiry Prepared
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C5C5C] mt-1 leading-relaxed">
                      Your consultation details are compiled below. To transmit this enquiry directly to clinic reception, select your preferred contact channel:
                    </p>
                  </div>
                </div>

                {/* Preformatted Summary Box */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E2DD] text-xs font-mono text-[#1A1A1A] whitespace-pre-line leading-relaxed">
                  {preparedRequest.text}
                </div>

                {/* Action Buttons for Direct Transmission */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {hasWhatsApp && (
                    <a
                      href={preparedRequest.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-colors shadow-xs min-h-[48px]"
                    >
                      <WhatsAppIcon className="w-4 h-4" variant="white-bubble" />
                      <span>Send Enquiry via WhatsApp</span>
                    </a>
                  )}

                  {hasPhone && (
                    <a
                      href={`tel:${clinic.contact?.phone?.replace(/[^0-9+]/g, '')}`}
                      className="flex-1 flex items-center justify-center space-x-2 py-4 px-6 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-colors shadow-xs min-h-[48px]"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Reception Now</span>
                    </a>
                  )}
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-[#5C5C5C]">
                  <button
                    type="button"
                    onClick={() => setPreparedRequest(null)}
                    className="hover:text-[#1A1A1A] underline transition-colors cursor-pointer"
                  >
                    Edit Information
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="hover:text-[#1A1A1A] transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Form</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Appointment Request Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Spam Honeypot Field */}
                <input
                  type="text"
                  name="clinic_patient_reference"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {submitError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                      Full Name <span className="text-[#7C9885]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder="e.g., Sarah Jenkins"
                        className={`w-full px-4 py-3 bg-white rounded-xl border text-base sm:text-sm text-[#1A1A1A] placeholder-[#5C5C5C]/50 focus:outline-hidden focus:ring-2 focus:ring-[#7C9885] transition-all min-h-[48px] sm:min-h-[44px] ${
                          errors.fullName ? 'border-red-500' : 'border-[#E5E2DD]'
                        }`}
                      />
                      <User className="w-4 h-4 text-[#5C5C5C] absolute right-3.5 top-4 sm:top-3.5 pointer-events-none" />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Telephone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                      Telephone Number <span className="text-[#7C9885]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="e.g., +1 (415) 555-0192"
                        className={`w-full px-4 py-3 bg-white rounded-xl border text-base sm:text-sm text-[#1A1A1A] placeholder-[#5C5C5C]/50 focus:outline-hidden focus:ring-2 focus:ring-[#7C9885] transition-all min-h-[48px] sm:min-h-[44px] ${
                          errors.phone ? 'border-red-500' : 'border-[#E5E2DD]'
                        }`}
                      />
                      <Phone className="w-4 h-4 text-[#5C5C5C] absolute right-3.5 top-4 sm:top-3.5 pointer-events-none" />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  
                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                      Preferred Date <span className="text-[#7C9885]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="preferredDate"
                        type="date"
                        required
                        min={todayStr}
                        value={preferredDate}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) setErrors(prev => ({ ...prev, preferredDate: '' }));
                        }}
                        className={`w-full px-4 py-3 bg-white rounded-xl border text-base sm:text-sm text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-[#7C9885] transition-all min-h-[48px] sm:min-h-[44px] ${
                          errors.preferredDate ? 'border-red-500' : 'border-[#E5E2DD]'
                        }`}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* Preferred Time Window */}
                  <div>
                    <label htmlFor="preferredTime" className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                      Preferred Time Window
                    </label>
                    <select
                      id="preferredTime"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E2DD] text-base sm:text-sm text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-[#7C9885] transition-all min-h-[48px] sm:min-h-[44px]"
                    >
                      <option value="Morning (8:30 AM – 12:00 PM)">Morning (8:30 AM – 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM – 5:00 PM)">Afternoon (12:00 PM – 5:00 PM)</option>
                      <option value="Late Afternoon (5:00 PM – 6:00 PM)">Late Afternoon (5:00 PM – 6:00 PM)</option>
                    </select>
                  </div>

                </div>

                {/* Consultation / Service */}
                <div>
                  <label htmlFor="service" className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                    Consultation Type / Treatment Focus <span className="text-[#7C9885]">*</span>
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E2DD] text-base sm:text-sm text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-[#7C9885] transition-all min-h-[48px] sm:min-h-[44px]"
                  >
                    {clinic.services && clinic.services.length > 0 ? (
                      clinic.services.map(s => (
                        <option key={s.id} value={s.name}>
                          {s.name} {s.duration ? `(${s.duration})` : ''}
                        </option>
                      ))
                    ) : (
                      <option value="General Dermatology Consultation">General Dermatology Consultation</option>
                    )}
                  </select>
                </div>

                {/* Additional Notes (Non-sensitive) */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-2">
                    Additional Inquiries or Scheduling Notes <span className="text-[#5C5C5C] font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide any timing preferences or questions regarding your initial consultation..."
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E2DD] text-base sm:text-sm text-[#1A1A1A] placeholder-[#5C5C5C]/50 focus:outline-hidden focus:ring-2 focus:ring-[#7C9885] transition-all"
                  />
                  <p className="text-[11px] text-[#5C5C5C] mt-1.5">
                    For patient privacy, please do not include confidential diagnostic history or sensitive medical records in web form submissions.
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#1A1A1A] hover:bg-[#7C9885] text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Transmitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Appointment Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Information & Direct Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Booking Channels */}
            <div className="bg-[#FAF9F7] rounded-3xl border border-[#E5E2DD] p-6 sm:p-7 space-y-4">
              <h4 className="font-editorial text-xl sm:text-2xl text-[#1A1A1A] font-medium">
                Prefer Direct Scheduling?
              </h4>
              <p className="text-sm text-[#5C5C5C] leading-relaxed">
                Connect directly with clinic reception for immediate date inquiries or consultation questions.
              </p>

              <div className="space-y-3 pt-2">
                {hasPhone && (
                  <a
                    href={`tel:${clinic.contact?.phone?.replace(/[^0-9+]/g, '')}`}
                    className="w-full flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-[#E5E2DD] hover:border-[#7C9885] text-[#1A1A1A] transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-[#FAF9F7] text-[#7C9885]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5C5C5C] uppercase tracking-wider font-semibold">Telephone Reception</p>
                      <p className="text-sm font-semibold">{clinic.contact?.phone}</p>
                    </div>
                  </a>
                )}

                {hasWhatsApp && (
                  <a
                    href={`https://wa.me/${clinic.contact?.whatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${clinic.name}, I would like to enquire about an appointment.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-[#E5E2DD] hover:border-[#25D366] text-[#1A1A1A] transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#128C7E]">
                      <WhatsAppIcon className="w-4 h-4" variant="green-badge" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#5C5C5C] uppercase tracking-wider font-semibold">WhatsApp Desk</p>
                      <p className="text-sm font-semibold">Message Reception</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Privacy & Clinical Notice */}
            <div className="p-5 rounded-2xl bg-white border border-[#E5E2DD] text-xs text-[#5C5C5C] space-y-2">
              <div className="flex items-center space-x-2 text-[#1A1A1A] font-semibold">
                <Shield className="w-4 h-4 text-[#7C9885]" />
                <span>Patient Confidentiality</span>
              </div>
              <p className="leading-relaxed">
                All patient communications are handled in accordance with strict medical privacy standards. Submitting this form requests appointment availability and does not establish a formal doctor-patient relationship until clinical consultation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
