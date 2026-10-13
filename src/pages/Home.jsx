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

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
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

      // Vertical Stacking Cards Scroll Animation: Overlapping & Depth Effect
      const stackedCards = gsap.utils.toArray('.stacked-card');
      stackedCards.forEach((card, i) => {
        const topOffset = 48 + (i * 14); // Refined staggered top offsets: 48px, 62px, 76px

        // Pin each card in place when it reaches its top position
        ScrollTrigger.create({
          trigger: card,
          start: () => `top top+=${topOffset}`,
          endTrigger: panelsRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // When the NEXT card (i+1) approaches and glides up over this card, scale down and dim
        if (i < stackedCards.length - 1) {
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.45,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: stackedCards[i + 1],
              start: 'top 90%',
              end: () => `top top+=${topOffset + 20}`,
              scrub: true,
            }
          });
        }
        // When card (i+2) overlaps, scale this card down even further
        if (i < stackedCards.length - 2) {
          gsap.to(card, {
            scale: 0.88,
            opacity: 0.2,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: stackedCards[i + 2],
              start: 'top 90%',
              end: () => `top top+=${topOffset + 48}`,
              scrub: true,
            }
          });
        }
      });

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
             Dynamic Contrast and an IPS Panel <strong className="text-white font-semibold">Toughened glass</strong> with a viewing angle of 178 degrees. Standard 1080p High Definition screens available in 32", 43", and 4K screens in 55", and above sizes to provide a clear, crisp image.
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
                 1080p FHD & 4K UHD
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

      {/* VERTICAL STACKING CARDS SECTION */}
      <section ref={panelsRef} className="relative py-28 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#06070a]">
        <div className="max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40 pb-40">
          {/* Card 1: Resolution Redefined */}
          <div 
            className="stacked-card sticky z-10 top-10 sm:top-12 md:top-14 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#121622]/95 via-[#0b0e17]/95 to-[#06080e]/98 border border-white/10 text-white shadow-[0_25px_80px_rgba(0,0,0,0.85)] px-5 sm:px-7 md:px-9 pt-4 sm:pt-5 pb-5 sm:pb-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 transition-shadow duration-500 backdrop-blur-xl relative will-change-transform"
            style={{ top: 'clamp(2rem, 3.5vh, 2.75rem)' }}
          >
            {/* Ambient Background Glows & Gloss Edge */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[110px] rounded-full pointer-events-none"></div>

            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-center max-w-xl text-left relative z-10">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-sm mb-2.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                RESOLUTION REDEFINED
              </span>
              
              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-8 mb-3.5 pb-3.5 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">16.7 M</span>
                  <span className="text-[11px] sm:text-xs font-medium text-cyan-400/90 uppercase tracking-wider">Colours</span>
                </div>
                <div className="hidden sm:block w-[1px] h-8 bg-white/10"></div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">380 Nits</span>
                  <span className="text-[11px] sm:text-xs font-medium text-cyan-400/90 uppercase tracking-wider">LED Brightness</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 font-normal">
                Experience the full potential of high-definition display screens with crystal-clear 4K clarity, vibrant colour accuracy, superior contrast ratios, and durable energy-saving LED panels built for commercial longevity.
              </p>

              {/* Link / CTA */}
              <a href="#explore" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/15 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] interactive group w-fit">
                <span>READ MORE</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full flex items-center justify-center p-2 sm:p-4 relative z-10">
              <div className="absolute inset-0 bg-radial from-cyan-500/15 via-transparent to-transparent blur-3xl pointer-events-none"></div>
              <img 
                src={firstImg} 
                alt="Resolution Redefined Product Displays" 
                className="w-full h-auto max-h-[280px] sm:max-h-[320px] md:max-h-[360px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Card 2: Feature Rich Control Center */}
          <div 
            className="stacked-card sticky z-20 top-11 sm:top-13 md:top-15 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#121622]/95 via-[#0b0e17]/95 to-[#06080e]/98 border border-white/15 text-white shadow-[0_-25px_60px_rgba(0,0,0,0.95),0_25px_80px_rgba(0,0,0,0.9)] px-5 sm:px-7 md:px-9 pt-4 sm:pt-5 pb-5 sm:pb-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 transition-shadow duration-500 backdrop-blur-xl relative will-change-transform"
            style={{ top: 'clamp(2.25rem, 4vh, 3.1rem)' }}
          >
            {/* Ambient Background Glows & Gloss Edge */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-600/10 blur-[110px] rounded-full pointer-events-none"></div>

            {/* Left Image (App Devices Mockup) */}
            <div className="flex-1 w-full flex items-center justify-center order-2 lg:order-1 p-2 sm:p-4 relative z-10">
              <div className="absolute inset-0 bg-radial from-blue-500/15 via-transparent to-transparent blur-3xl pointer-events-none"></div>
              <img 
                src={secondImg} 
                alt="IQ World Control App Interface" 
                className="w-full h-auto max-h-[280px] sm:max-h-[320px] md:max-h-[360px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col justify-center max-w-xl text-left order-1 lg:order-2 relative z-10">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-sm mb-2.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                FEATURE RICH CONTROL CENTER
              </span>

              {/* Title & Subtitle */}
              <div className="flex flex-wrap items-baseline gap-2.5 mb-3 pb-3 border-b border-white/10">
                <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">IQ World</h2>
                <span className="text-xs sm:text-sm text-gray-400 font-normal">Display Screen Control App</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 font-normal">
                A cloud-based powerhouse that transforms your CAN Displays into a centralized control hub. Monitor multi-screen fleets with schedule management, split-screen layouts, live ticker scrolling, and inbuilt media studio tools.
              </p>

              {/* Link / CTA */}
              <a href="#download" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white bg-white/10 hover:bg-cyan-500 hover:text-black border border-white/15 hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] interactive group w-fit">
                <span>DOWNLOAD APK</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Card 3: Different Styles, For Different Spaces */}
          <div 
            className="stacked-card sticky z-30 top-12 sm:top-14 md:top-16 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#121622]/95 via-[#0b0e17]/95 to-[#06080e]/98 border border-white/15 text-white shadow-[0_-25px_60px_rgba(0,0,0,0.98),0_25px_80px_rgba(0,0,0,0.95)] px-5 sm:px-7 md:px-9 pt-4 sm:pt-5 pb-5 sm:pb-6 flex flex-col justify-start transition-shadow duration-500 backdrop-blur-xl relative will-change-transform"
            style={{ top: 'clamp(2.5rem, 4.5vh, 3.5rem)' }}
          >
            {/* Ambient Background Glows & Gloss Edge */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Top Heading */}
            <div className="text-left relative z-10 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-sm mb-1.5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                PRODUCT LINEUP
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-light tracking-tight text-white leading-tight mb-1">
                Different Styles, For Different Spaces
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl font-normal leading-relaxed">
                Architectural commercial displays crafted for high-impact visual presence and seamless deployment.
              </p>
            </div>

            {/* 3 Sub-Cards Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 w-full relative z-10">
              {/* Sub-Card 1: CANLit */}
              <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/12 hover:border-cyan-500/40 text-white flex flex-col justify-between shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(34,211,238,0.12)] hover:scale-[1.01] transition-all duration-300 group relative backdrop-blur-md p-3 sm:p-3.5">
                <div className="mb-2 text-left flex items-start justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-0 group-hover:text-cyan-300 transition-colors">CANLit</h3>
                    <p className="text-[11px] text-gray-400 font-medium">Best and brightest.</p>
                  </div>
                  <span className="text-[9px] font-semibold text-cyan-400/90 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 group-hover:border-cyan-500/30">FLAGSHIP</span>
                </div>
                <div className="h-36 sm:h-40 md:h-44 lg:h-48 flex items-center justify-center rounded-xl bg-black/40 border border-white/5 p-2 relative overflow-hidden">
                  <img src={canLit} alt="CANLit Displays" className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Sub-Card 2: CANMount */}
              <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/12 hover:border-cyan-500/40 text-white flex flex-col justify-between shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(34,211,238,0.12)] hover:scale-[1.01] transition-all duration-300 group relative backdrop-blur-md p-3 sm:p-3.5">
                <div className="mb-2 text-left flex items-start justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-0 group-hover:text-cyan-300 transition-colors">CANMount</h3>
                    <p className="text-[11px] text-gray-400 font-medium">True-to-life display.</p>
                  </div>
                  <span className="text-[9px] font-semibold text-cyan-400/90 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 group-hover:border-cyan-500/30">WALL MOUNT</span>
                </div>
                <div className="h-36 sm:h-40 md:h-44 lg:h-48 flex items-center justify-center rounded-xl bg-black/40 border border-white/5 p-2 relative overflow-hidden">
                  <img src={canMount} alt="CANMount Displays" className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>

              {/* Sub-Card 3: CANVue */}
              <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/12 hover:border-cyan-500/40 text-white flex flex-col justify-between shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_25px_rgba(34,211,238,0.12)] hover:scale-[1.01] transition-all duration-300 group relative backdrop-blur-md p-3 sm:p-3.5">
                <div className="mb-2 text-left flex items-start justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-0 group-hover:text-cyan-300 transition-colors">CANVue</h3>
                    <p className="text-[11px] text-gray-400 font-medium">Seamless crystal vision.</p>
                  </div>
                  <span className="text-[9px] font-semibold text-cyan-400/90 uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 group-hover:border-cyan-500/30">KIOSK</span>
                </div>
                <div className="h-36 sm:h-40 md:h-44 lg:h-48 flex items-center justify-center rounded-xl bg-black/40 border border-white/5 p-2 relative overflow-hidden">
                  <img src={canVue} alt="CANVue Displays" className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
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
                { q: "What is CAN and how is it unique in the landscape?", a: "CAN is an advanced digital display ecosystem combining seamless architectural hardware protocols with powerful cloud software for autonomous commercial management." },
                { q: "How can users explore and manage the CAN network?", a: "Users can access the centralized control hub via the IQ World App to monitor, update, and manage multiple screens effortlessly from any location." },
                { q: "What hardware solutions does CAN offer?", a: "CAN provides the CANLit flagship freestanding displays, ultra-slim CANMount architectural wall mounts, and CANVue interactive touch kiosks engineered for high-traffic public installations." },
                { q: "How does CAN ensure 24/7 reliability and uptime?", a: "By utilizing silent heat dissipation thermal designs, commercial-grade panel architecture, and AI-driven automated content scheduling." }
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
