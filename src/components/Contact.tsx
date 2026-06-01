import React, { useState, useRef } from 'react';

const services = [
  'Theatrical Key Art',
  'Visual Identity',
  'Cinematic Cover Art',
  'Bespoke Illustration',
  'Other'
];

const timelines = [
  'Urgent (<1 month)',
  'Next 2-3 months',
  'Flexible / Long term'
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', brief: '' });
  const [selectedService, setSelectedService] = useState(services[0]);
  const [customService, setCustomService] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState(timelines[2]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const maxChars = 500;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 22; // subtle tilt angle
    const rotateY = (x - xc) / 22;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 0, 127, 0.25), 0 0 30px rgba(0, 255, 255, 0.2)'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: ''
    });
  };

  const getMailtoUrl = () => {
    const actualService = selectedService === 'Other' ? customService : selectedService;
    const mailSubject = `[Inquiry] ${formData.subject} | ${actualService}`;
    const mailBody = `Hello Sujith,

My name is ${formData.name} (${formData.email}).

I'm reaching out regarding a project inquiry.
- Service Requested: ${actualService}
- Expected Timeline: ${selectedTimeline}

Project Details:
------------------------------------------
${formData.brief}
------------------------------------------

Best regards,
${formData.name}`;

    return `mailto:sujithputta02@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.brief) return;
    if (selectedService === 'Other' && !customService.trim()) return;

    setLoading(true);
    // Simulate beautiful luxury network resolve
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Dynamically fire mail client redirect
      window.location.href = getMailtoUrl();
    }, 1200);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', brief: '' });
    setSelectedService(services[0]);
    setCustomService('');
    setSelectedTimeline(timelines[2]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'brief' && value.length > maxChars) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0E0E0E] z-10 select-none overflow-hidden border-t border-white/5"
    >
      
      {/* Ambient specular glowing lights */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-white/[0.015] blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white/[0.012] blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Left Column: Typographic Header & External Stack */}
        <div className="lg:col-span-6 flex flex-col items-start text-left select-none">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45">
              07 — INQUIRIES
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <h2 className="text-[15px] sm:text-[17px] font-heading font-normal tracking-[0.1em] uppercase text-white/80">
              Start A Project
            </h2>
          </div>

          <h3 className="text-[36px] sm:text-[48px] md:text-[56px] font-heading font-light tracking-[-0.03em] text-white leading-tight mb-6 sm:mb-8 max-w-lg">
            Let's Create Something Worth Remembering.
          </h3>

          <p className="text-[15px] sm:text-[17px] font-body text-[#A3A3A3] leading-relaxed mb-10 max-w-md">
            "Whether it's a cinematic poster, brand identity, campaign visual, or creative collaboration, I'm always open to crafting something meaningful."
          </p>

          {/* Social Hyperlinks Stack */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] sm:text-[15px] font-heading font-semibold uppercase tracking-wider text-white/45">
            <a
              href="https://www.instagram.com/pixelcraft.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 duration-300"
              data-cursor="Instagram"
              data-magnetic
            >
              Instagram
            </a>
            <span className="text-white/10 select-none">/</span>
            <a
              href="https://www.behance.net/Pixelcraftbysujith"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 duration-300"
              data-cursor="Behance"
              data-magnetic
            >
              Behance
            </a>
            <span className="text-white/10 select-none">/</span>
            <a
              href="https://in.pinterest.com/pixelcraftbysujith/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 duration-300"
              data-cursor="Pinterest"
              data-magnetic
            >
              Pinterest
            </a>
            <span className="text-white/10 select-none">/</span>
            <a
              href="mailto:sujithputta02@gmail.com"
              className="text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 duration-300"
              data-cursor="Email"
              data-magnetic
            >
              Email
            </a>
          </div>

        </div>

        {/* Right Column: Bespoke Contact Capture Form / Success Module */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle}
          className="lg:col-span-6 w-full max-w-xl disco-card border-disco-chrome rounded-2xl p-6 sm:p-8 relative min-h-[380px] flex items-center justify-center transition-all duration-500"
        >
          
          {/* Mirror Tile grid overlay */}
          <div className="disco-tile-grid opacity-20 pointer-events-none" />
          
          {/* Twinkling sparkles */}
          <div className="disco-sparkle top-4 left-6 sparkle-slow pointer-events-none" />
          <div className="disco-sparkle bottom-6 right-8 sparkle-fast pointer-events-none" />
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 text-left relative z-10">
              
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/45">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Liam Henderson"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#ff007f]/50 focus:shadow-[0_0_15px_rgba(255,0,127,0.15)] placeholder-white/25 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/45">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="hello@collaborator.co"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#ff007f]/50 focus:shadow-[0_0_15px_rgba(255,0,127,0.15)] placeholder-white/25 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Subject Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/45">
                  SUBJECT / TOPIC
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Creative Direction for new Campaign"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#ff007f]/50 focus:shadow-[0_0_15px_rgba(255,0,127,0.15)] placeholder-white/25 hover:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Dynamic Service Selection Chips */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/45">
                  SELECT SERVICE TYPE
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => {
                    const isSelected = selectedService === service;
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 select-none cursor-pointer border ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                            : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
                
                {/* Conditional Other service text input */}
                {selectedService === 'Other' && (
                  <input
                    type="text"
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder="Specify your custom design service..."
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#ff007f]/50 focus:shadow-[0_0_15px_rgba(255,0,127,0.15)] placeholder-white/25 hover:border-white/20 transition-all duration-300 mt-1.5 animate-[fadeIn_0.3s_ease-out]"
                  />
                )}
              </div>

              {/* Dynamic Timeline Selector Chips */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/45">
                  ESTIMATED TIMELINE
                </label>
                <div className="flex flex-wrap gap-2">
                  {timelines.map((time) => {
                    const isSelected = selectedTimeline === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTimeline(time)}
                        className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-heading font-semibold uppercase tracking-wider transition-all duration-300 select-none cursor-pointer border ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                            : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Brief Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/45">
                    PROJECT BRIEF
                  </label>
                  <span className="text-[10px] font-heading font-medium text-white/30">
                    {formData.brief.length} / {maxChars}
                  </span>
                </div>
                <textarea
                  name="brief"
                  value={formData.brief}
                  onChange={handleInputChange}
                  placeholder="Outline the cinematic scale of what we are building..."
                  rows={4}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-[#ff007f]/50 focus:shadow-[0_0_15px_rgba(255,0,127,0.15)] placeholder-white/25 hover:border-white/20 transition-all duration-300 resize-none scroll-bar-custom"
                />
              </div>

              {/* Submit Pill Button - Decorated with dynamic specular sweep reflection shine */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center bg-white hover:bg-black text-black hover:text-white border border-white hover:border-white/20 rounded-full font-heading font-semibold uppercase tracking-wider text-[12px] py-3.5 mt-2 transition-all duration-300 cursor-pointer disabled:opacity-40 chrome-sweep-effect shadow-[0_4px_15px_rgba(255,255,255,0.06)] hover:shadow-disco-neon"
                data-cursor={loading ? "Sending..." : "Submit Inquiry"}
                data-magnetic
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Send Inquire Node</span>
                )}
              </button>

            </form>
          ) : (
            /* Immersive Success Panel */
            <div className="w-full py-8 text-center flex flex-col items-center gap-6 select-none animate-[fadeIn_0.5s_ease-out]">
              
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] animate-pulse">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-[20px] sm:text-[23px] font-heading font-bold text-white tracking-tight">
                  Inquire Node Received!
                </h4>
                <p className="text-[14px] sm:text-[15px] font-body text-[#A3A3A3] leading-relaxed max-w-sm">
                  "Your details have been registered. Your email draft has been generated and launched. If the mail client didn't pop up, please click below."
                </p>
              </div>

              {/* Selected Specs Badge */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 w-full max-w-xs text-left flex flex-col gap-2.5">
                <div>
                  <span className="text-[9px] font-heading font-semibold uppercase tracking-wider text-white/35 block">
                    SUBJECT TOPIC
                  </span>
                  <span className="text-[13px] font-heading font-semibold text-white/90 truncate block">
                    {formData.subject}
                  </span>
                </div>
                <div className="w-full h-[1px] bg-white/5" />
                <div>
                  <span className="text-[9px] font-heading font-semibold uppercase tracking-wider text-white/35 block">
                    SERVICE SELECTED
                  </span>
                  <span className="text-[13px] font-heading font-semibold text-white/90">
                    {selectedService === 'Other' ? customService : selectedService}
                  </span>
                </div>
                <div className="w-full h-[1px] bg-white/5" />
                <div>
                  <span className="text-[9px] font-heading font-semibold uppercase tracking-wider text-white/35 block">
                    TIMELINE SPEC
                  </span>
                  <span className="text-[13px] font-heading font-semibold text-white/90">
                    {selectedTimeline}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <a
                  href={getMailtoUrl()}
                  className="inline-flex items-center justify-center bg-white text-black font-heading font-semibold uppercase tracking-wider text-[11px] px-6 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-all duration-300"
                  data-cursor="Open Mail"
                >
                  Launch Mail Again
                </a>
                
                <button
                  onClick={handleResetForm}
                  className="inline-flex items-center justify-center bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-full font-heading font-semibold uppercase tracking-wider text-[11px] px-6 py-2.5 duration-300 cursor-pointer"
                  data-cursor="Return"
                >
                  Send Another Brief
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
