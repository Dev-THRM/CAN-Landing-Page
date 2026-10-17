import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play, Pause, RotateCcw, ChevronRight, ArrowDown, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero.png';
import standeeExploded from '../assets/standee_exploded.jpg';
import standee from '../assets/standee.jpg';
import kiosk from '../assets/kiosk.jpg';
import canLogo from '../assets/can logo.png';
import ribbonImg from '../assets/ribbon.jpg';
import firstImg from '../assets/first-img.avif';
import secondImg from '../assets/second-img.avif';
import canLit from '../assets/canlit.png';
import { Link } from 'react-router-dom';
import canMount from '../assets/canmount.png';
import canVue from '../assets/canvue.png';
import canvueExplodedVideo from '../assets/canvue-exploded.mp4';
import canvueExplodedPoster from '../assets/canvue-exploded-poster.jpg';
import { blogPosts } from '../data/blogs';
import HeroReference from '../components/HeroReference';

gsap.registerPlugin(ScrollTrigger);



// Loader
const Loader = ({ setLoading }) => {
  useEffect(() => {
    const safetyTimer = setTimeout(() => setLoading(false), 1600);
    const tl = gsap.timeline({ onComplete: () => {
      clearTimeout(safetyTimer);
      setLoading(false);
    } });
    tl.to('.loader-icon', { rotate: 360, duration: 1, ease: 'power2.inOut' })
      .to('.loader-screen', { opacity: 0, duration: 0.5, ease: 'power2.inOut', delay: 0.2 });
    return () => clearTimeout(safetyTimer);
  }, [setLoading]);

  return (
    <div className="loader-screen fixed inset-0 z-[200] flex items-center justify-center bg-[#f4f4f5]">
      <div className="loader-icon w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-3xl font-black">
        ✦
      </div>
    </div>
  );
};

// FAQ
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/15 cursor-pointer interactive group py-8 sm:py-10 transition-colors" onClick={onClick}>
      <div className="flex justify-between items-center text-xl md:text-2xl font-normal text-white group-hover:text-cyan-400 transition-colors gap-6">
        <h3 className="pr-4 leading-relaxed">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <ArrowUpRight size={26} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pt-6 pb-2 text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const featureTabs = [
  { id: 0, number: '01', label: 'Resolution Redefined' },
  { id: 1, number: '02', label: 'IQ World Control' },
  { id: 2, number: '03', label: 'Product Lineup' }
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const panelsRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    
    let ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.hero-title-letter', {
        y: 100, opacity: 0, duration: 1, stagger: 0.05, ease: 'power4.out', delay: 0.2
      });
      gsap.from('.hero-orb', {
        scale: 0, opacity: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)', delay: 0.8
      });

      // Background morphing
      gsap.to('.bg-morph-container', {
        scrollTrigger: {
          trigger: '.protocol-section',
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: true,
        },
        backgroundColor: '#0a0b10' // Dark blueish like video
      });

      // Protocol Ribbon scroll parallax
      gsap.fromTo('.protocol-ribbon-img',
        { yPercent: -12, scale: 1.08 },
        {
          yPercent: 12,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.protocol-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );

      // Video scale effect
      gsap.fromTo('.video-block', 
        { scale: 0.9, borderRadius: '40px' },
        { scale: 1, borderRadius: '0px', scrollTrigger: { trigger: '.video-section', start: 'top bottom', end: 'center center', scrub: true } }
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, [loading]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans bg-morph-container">
      {loading && <Loader setLoading={setLoading} />}

      {/* HERO SECTION */}
      <HeroReference />


      {/* PROTOCOL SECTION */}
      <section className="protocol-section relative min-h-[90vh] py-20 px-8 sm:px-14 md:px-24 lg:px-32 flex flex-col justify-between overflow-hidden bg-[#0c0d12]">
         {/* Background Ribbon Wave Graphic with Living Floating Wave Motion & Glow */}
         <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Ambient glowing light pulses */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[140px] pointer-events-none animate-pulse-glow"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full bg-fuchsia-500/15 blur-[130px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '-3s' }}></div>

            <img 
              src={ribbonImg} 
              alt="Slender Fluid Wave Ribbon" 
              className="protocol-ribbon-img w-full h-full object-cover object-right md:object-center opacity-75 animate-fluid-float will-change-transform" 
            />
            {/* Deep dark gradient masks to ensure 100% crisp text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-[#0c0d12]/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12] via-[#0c0d12]/85 to-transparent max-w-4xl"></div>
         </div>

         {/* Top-Left Content with Framer Motion Reveal */}
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-80px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 max-w-3xl text-left pt-6 sm:pt-10"
         >
           <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold mb-4 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
             <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
             WHY CAN ?
           </span>
           <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6 leading-[1.15] animate-text-breathe">
             We’re Here to Revolutionize the World of Digital Displays
           </h2>
           <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal mb-8">
             Dynamic Contrast and an IPS Panel <strong className="text-white font-semibold">Toughened glass</strong> with a viewing angle of 178 degrees. High Definition 768p in 32", Full HD 1080p in 43", and 4K screens in 43" and above sizes to provide a clear, crisp image.
           </p>
         </motion.div>

         {/* Bottom Feature Tabs Row with Light Sweep Shimmer & Staggered Reveal */}
         <motion.div 
           initial={{ opacity: 0, y: 25 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-40px" }}
           transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
           className="relative z-10 pt-16 sm:pt-24 pb-4"
         >
           <div className="relative border-t border-white/10 pt-8 overflow-hidden">
             {/* Neon Shimmer Light Sweep across the divider line */}
             <div className="absolute top-0 left-0 w-1/3 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer-sweep"></div>

             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
               <div className="text-base sm:text-lg md:text-xl font-medium text-white/90 hover:text-cyan-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer interactive group flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22d3ee]"></span>
                 178° Viewing Angle
               </div>
               <span className="hidden sm:inline-block text-white/40 text-lg transition-transform duration-500 hover:rotate-90 hover:text-cyan-400 cursor-default">+</span>
               <div className="text-base sm:text-lg md:text-xl font-medium text-white/90 hover:text-cyan-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer interactive group flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22d3ee]"></span>
                 IPS Toughened Glass
               </div>
               <span className="hidden sm:inline-block text-white/40 text-lg transition-transform duration-500 hover:rotate-90 hover:text-cyan-400 cursor-default">+</span>
               <div className="text-base sm:text-lg md:text-xl font-medium text-white/90 hover:text-cyan-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer interactive group flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22d3ee]"></span>
                 768p HD · 1080p FHD · 4K UHD
               </div>
               <span className="hidden sm:inline-block text-white/40 text-lg transition-transform duration-500 hover:rotate-90 hover:text-cyan-400 cursor-default">+</span>
               <div className="text-base sm:text-lg md:text-xl font-medium text-white/90 hover:text-cyan-300 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer interactive group flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#22d3ee]"></span>
                 32" · 43" · 55"+ Sizes
               </div>
             </div>
           </div>
         </motion.div>
      </section>

      {/* ── INTERACTIVE TABBED FEATURE SHOWCASE (OPTION 2) ── */}
      <section className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#06070a] overflow-hidden">
        {/* Ambient Spatial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Glassmorphic Segmented Tabs Header */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <div className="inline-flex items-center p-1.5 sm:p-2 rounded-full bg-zinc-900/80 border border-white/15 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] max-w-full overflow-x-auto no-scrollbar">
              {featureTabs.map((tab) => {
                const isActive = activeFeatureTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFeatureTab(tab.id)}
                    className={`relative flex items-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-white shadow-[0_0_25px_rgba(34,211,238,0.3)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureTabIndicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-cyan-500/15 border border-cyan-400/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]' : 'bg-transparent'}`}></span>
                      <span className="font-mono text-[10px] sm:text-xs opacity-70">{tab.number}.</span>
                      <span>{tab.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Display with AnimatePresence */}
          <div className="relative min-h-[580px] lg:min-h-[620px]">
            <AnimatePresence mode="wait">
              {activeFeatureTab === 0 && (
                <motion.div
                  key="tab-resolution"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#121622]/90 via-[#0b0e17]/95 to-[#06080e]/98 border border-white/12 text-white shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 backdrop-blur-2xl overflow-hidden group"
                >
                  {/* Gloss rim highlight */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"></div>
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none"></div>

                  {/* Left Content */}
                  <div className="flex-1 flex flex-col justify-center text-left relative z-10 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                        RESOLUTION REDEFINED
                      </span>
                      <span className="text-xs font-mono text-gray-500 tracking-widest hidden sm:inline-block">CAN // 01</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.08] mb-6">
                      IPS Full Toughened Glass. <br/>
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">
                        768p, 1080p FHD & 4K Ultra HD.
                      </span>
                    </h2>

                    {/* Stat Blocks */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 py-5 my-2 border-y border-white/10">
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white tracking-tight">16.7 M</div>
                        <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-cyan-400 mt-1">Colours Spectrum</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white tracking-tight">380 Nits</div>
                        <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-cyan-400 mt-1">Commercial Brightness</div>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white tracking-tight">178°</div>
                        <div className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-cyan-400 mt-1">Wide IPS Angle</div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed my-5 font-normal max-w-xl">
                      Experience the full potential of CAN commercial digital displays with 768p HD on 32", Full HD 1080p on 43", and 4K Ultra HD on 43" and above sizes, backed by 16.7M vivid colours and commercial-grade toughened glass.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {['A+ Grade IPS Panel', 'Full Toughened Glass', '178° Vision Angle', '1-Yr Onsite Warranty'].map((pill, idx) => (
                        <span key={idx} className="text-[10px] sm:text-[11px] font-medium text-gray-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
                          {pill}
                        </span>
                      ))}
                    </div>

                    <Link 
                      to="/technology" 
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-white bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/15 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] interactive group w-fit"
                    >
                      <span>EXPLORE TECHNOLOGY</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right Image */}
                  <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative z-10">
                    <div className="absolute inset-0 bg-radial from-cyan-500/20 via-transparent to-transparent blur-3xl pointer-events-none"></div>
                    <div className="relative group/img overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 p-3 sm:p-5 w-full flex items-center justify-center shadow-2xl">
                      <img 
                        src={firstImg} 
                        alt="Resolution Redefined Product Displays" 
                        className="w-full h-auto max-h-[320px] sm:max-h-[380px] md:max-h-[420px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] group-hover/img:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-xl pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span>4K UHD COMMERCIAL GRADE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === 1 && (
                <motion.div
                  key="tab-iqworld"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#121324]/90 via-[#0a0c16]/95 to-[#06080e]/98 border border-white/12 text-white shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 backdrop-blur-2xl overflow-hidden group"
                >
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none"></div>
                  <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/15 blur-[120px] rounded-full pointer-events-none"></div>

                  {/* Left Mockup */}
                  <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 order-2 lg:order-1 relative z-10">
                    <div className="absolute inset-0 bg-radial from-blue-500/20 via-transparent to-transparent blur-3xl pointer-events-none"></div>
                    <div className="relative group/img overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 p-3 sm:p-5 w-full flex items-center justify-center shadow-2xl">
                      <img 
                        src={secondImg} 
                        alt="IQ World Control App Interface" 
                        className="w-full h-auto max-h-[320px] sm:max-h-[380px] md:max-h-[420px] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] group-hover/img:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] sm:text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-xl pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                        <span>LIVE FLEET CONTROL</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 flex flex-col justify-center text-left order-1 lg:order-2 relative z-10 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                        FEATURE RICH CONTROL CENTER
                      </span>
                      <span className="text-xs font-mono text-gray-500 tracking-widest hidden sm:inline-block">CAN // 02</span>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.08]">
                        IQ World <br/>
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                          Display Screen Control App
                        </span>
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-6 font-normal max-w-xl">
                      The IQ World app transforms your CAN Displays into a centralized control hub. Manage multiple screens effortlessly from anywhere with schedule management, split-screen layouts, scrolling ticker text, and inbuilt image & video editing tools.
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                        <div className="text-xs sm:text-sm font-semibold text-white mb-1">Centralized Control</div>
                        <p className="text-[11px] text-gray-400">Manage and monitor multiple screens from one central dashboard.</p>
                      </div>
                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                        <div className="text-xs sm:text-sm font-semibold text-white mb-1">Split-Screen Layouts</div>
                        <p className="text-[11px] text-gray-400">Run videos, image carousels, and live scrolling text tickers simultaneously.</p>
                      </div>
                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                        <div className="text-xs sm:text-sm font-semibold text-white mb-1">Schedule Management</div>
                        <p className="text-[11px] text-gray-400">Automate content schedules and playlists across dates and times.</p>
                      </div>
                      <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-left">
                        <div className="text-xs sm:text-sm font-semibold text-white mb-1">Inbuilt Media Editor</div>
                        <p className="text-[11px] text-gray-400">Create and edit images and video banners directly inside the app.</p>
                      </div>
                    </div>

                    <a 
                      href="https://play.google.com/store/apps/details?id=com.iqw.iqworld_mobile&hl=en_IN" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-white bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/15 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] interactive group w-fit"
                    >
                      <span>GET IQ WORLD APP</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === 2 && (
                <motion.div
                  key="tab-lineup"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#121622]/90 via-[#0b0e17]/95 to-[#06080e]/98 border border-white/12 text-white shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-12 lg:p-16 backdrop-blur-2xl overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

                  {/* Header */}
                  <div className="text-left relative z-10 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                          PRODUCT LINEUP
                        </span>
                        <span className="text-xs font-mono text-gray-500 tracking-widest hidden sm:inline-block">CAN // 03</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
                        Different Styles, For <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">Different Spaces</span>
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-md font-normal leading-relaxed text-left md:text-right">
                      Commercial digital displays built with A+ grade IPS panels, full toughened glass, and 1-Year Onsite Warranty.
                    </p>
                  </div>

                  {/* 3 Showcase Bento Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full relative z-10">
                    
                    {/* Product 1: CAN / CANLit */}
                    <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/12 hover:border-cyan-500/50 text-white flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.18)] hover:-translate-y-1 transition-all duration-300 group p-5 sm:p-6 backdrop-blur-md">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                            A-FRAME DIGITAL STANDEE
                          </span>
                          <span className="text-xs font-mono text-gray-500">CAN 3201 / 4301</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors text-left mb-1">
                          CAN / CANLit
                        </h3>
                        <p className="text-xs text-gray-400 font-normal text-left mb-4">
                          Brilliant IPS Panel Full Toughened Glass display with continuous scrolling text, inbuilt image & video editor, and 1-Year Onsite Warranty.
                        </p>
                      </div>

                      <div className="h-48 sm:h-56 flex items-center justify-center rounded-2xl bg-black/50 border border-white/5 p-4 my-2 relative overflow-hidden group-hover:border-cyan-500/20 transition-colors">
                        <img src={canLit} alt="CANLit Displays" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-3">
                        <div className="text-[11px] text-gray-400 font-mono">178° IPS · Toughened Glass</div>
                        <Link 
                          to="/contact?model=CANLit"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Enquire</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Product 2: CANMount */}
                    <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/12 hover:border-cyan-500/50 text-white flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.18)] hover:-translate-y-1 transition-all duration-300 group p-5 sm:p-6 backdrop-blur-md">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                            VERTICAL WALL MOUNT
                          </span>
                          <span className="text-xs font-mono text-gray-500">CANMount 32-55</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors text-left mb-1">
                          CANMount
                        </h3>
                        <p className="text-xs text-gray-400 font-normal text-left mb-4">
                          Brilliant IPS Panel Full Toughened Glass vertical wall display delivering 16.7M colours, up to 380 Nits brightness, and 4K support on 50"+ screens.
                        </p>
                      </div>

                      <div className="h-48 sm:h-56 flex items-center justify-center rounded-2xl bg-black/50 border border-white/5 p-4 my-2 relative overflow-hidden group-hover:border-cyan-500/20 transition-colors">
                        <img src={canMount} alt="CANMount Displays" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-3">
                        <div className="text-[11px] text-gray-400 font-mono">16.7M Colours · 380 Nits</div>
                        <Link 
                          to="/contact?model=CANMount"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Enquire</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                    {/* Product 3: CANVue */}
                    <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/12 hover:border-cyan-500/50 text-white flex flex-col justify-between shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.18)] hover:-translate-y-1 transition-all duration-300 group p-5 sm:p-6 backdrop-blur-md">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                            MOBILE CASTER STANDEE
                          </span>
                          <span className="text-xs font-mono text-gray-500">CANVue 32-86</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors text-left mb-1">
                          CANVue
                        </h3>
                        <p className="text-xs text-gray-400 font-normal text-left mb-4">
                          IPS Panel Full Toughened Glass display with smooth mobile caster wheels, available in sizes up to 86" with 4K resolution and 10W built-in audio.
                        </p>
                      </div>

                      <div className="h-48 sm:h-56 flex items-center justify-center rounded-2xl bg-black/50 border border-white/5 p-4 my-2 relative overflow-hidden group-hover:border-cyan-500/20 transition-colors">
                        <img src={canVue} alt="CANVue Displays" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-3">
                        <div className="text-[11px] text-gray-400 font-mono">Mobile Casters · 10W Audio</div>
                        <Link 
                          to="/contact?model=CANVue"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group-hover:translate-x-0.5 transition-transform"
                        >
                          <span>Enquire</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
      
      {/* BLOG SECTION */}
      <section className="py-32 sm:py-44 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#06070a] relative overflow-hidden border-t border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 -left-24 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Heading */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 sm:mb-24 text-left"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] max-w-4xl">
              Blog is Must For Our Readers,<br className="hidden sm:inline" /> Trend keepers.
            </h2>
          </motion.div>

          {/* 3 Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {blogPosts.slice(0, 3).map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeOut" }}
                className="h-full"
              >
                <Link 
                  to={`/blog/${post.slug || post.id}`}
                  className="group rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-between shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(34,211,238,0.15)] interactive cursor-pointer p-8 sm:p-10 lg:p-12 h-full block"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/60 mb-6 border border-white/5">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="text-base sm:text-lg lg:text-xl font-medium text-white group-hover:text-cyan-300 transition-colors leading-relaxed mb-6">
                      {post.title}
                    </h3>
                    <div className="pt-5 mt-auto border-t border-white/10 flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider uppercase text-cyan-400 group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 sm:py-44 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#06070a] border-t border-white/10">
         <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-6xl font-light text-white tracking-tight mb-16 sm:mb-20 text-left"
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="flex flex-col border-t border-white/15">
              {[
                { q: "What is CAN and how is it unique in the landscape?", a: "CAN provides commercial digital displays with A+ Grade IPS panels, full toughened glass protection, and 178° viewing angles designed for retail, commercial, and corporate environments." },
                { q: "How can users explore and manage the CAN network?", a: "Users can manage displays via the IQ World App with cloud-based schedule management, split-screen layouts, continuous scrolling text, and an inbuilt editor." },
                { q: "What hardware solutions does CAN offer?", a: "CAN offers freestanding A-frame standees (CAN / CANLit), vertical wall displays (CANMount), mobile caster standees (CANVue), and interactive touch desk displays (CANDesk)." },
                { q: "What warranty and service comes with CAN displays?", a: "All CAN displays come with a 1-Year Onsite Warranty and dedicated customer support across India." }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                >
                  <FAQItem isOpen={openIndex === idx} onClick={() => setOpenIndex(openIndex === idx ? null : idx)} question={faq.q} answer={faq.a} />
                </motion.div>
              ))}
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
