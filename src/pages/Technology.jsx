import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Smartphone, MonitorSmartphone, Airplay, Maximize2, X, Check, Eye, Sparkles } from 'lucide-react';
import cantechno from '../assets/cantechno.jpg';
import canOrientationPortrait from '../assets/can-orientation-portrait.jpg';
import canOrientationLandscape from '../assets/can-orientation-landscape.jpg';
import remote from '../assets/remote.jpg';
import iqscreens from '../assets/iqscreens.jpg';

gsap.registerPlugin(ScrollTrigger);

const Technology = () => {
  const containerRef = useRef(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Animations - Dramatic 3D Blur & Letter Spacing
      gsap.fromTo('.hero-word',
        { y: 150, opacity: 0, rotationX: -90, transformOrigin: '50% 50% -50px', filter: 'blur(20px)', letterSpacing: '0.5em' },
        { y: 0, opacity: 1, rotationX: 0, filter: 'blur(0px)', letterSpacing: 'normal', duration: 2, stagger: 0.15, ease: 'expo.out', delay: 0.2 }
      );

      gsap.fromTo('.hero-bg', 
        { scale: 1.2, opacity: 0, filter: 'blur(10px)' },
        { scale: 1.05, opacity: 0.6, filter: 'blur(0px)', duration: 3, ease: 'power3.out' }
      );

      // 2. Global Creative Text Skew & Unfold Reveal
      const texts = gsap.utils.toArray('.anim-text');
      texts.forEach((text) => {
        gsap.fromTo(text, 
          { y: 100, opacity: 0, skewY: 7, rotateX: -40, transformOrigin: 'left top' },
          { 
            y: 0, opacity: 1, skewY: 0, rotateX: 0, duration: 1.5, ease: 'expo.out',
            scrollTrigger: { trigger: text, start: 'top 95%' }
          }
        );
      });

      // 3. Image Mask Reveal (Clip-Path Wipe)
      const imgs = gsap.utils.toArray('.anim-img');
      imgs.forEach((img) => {
        gsap.fromTo(img, 
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', scale: 1.3, filter: 'grayscale(100%)' },
          { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', scale: 1, filter: 'grayscale(0%)',
            duration: 2, ease: 'power4.inOut',
            scrollTrigger: { trigger: img, start: 'top 90%' }
          }
        );
      });

      // 4. Dramatic 3D Card Flips
      gsap.fromTo('.tech-card-1',
        { y: 250, opacity: 0, rotationY: 45, rotationX: 20, scale: 0.7 },
        { y: 0, opacity: 1, rotationY: 0, rotationX: 0, scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: '.cards-container', start: 'top 80%' }}
      );
      gsap.fromTo('.tech-card-2',
        { y: 350, opacity: 0, rotationY: -45, rotationX: 20, scale: 0.7 },
        { y: 0, opacity: 1, rotationY: 0, rotationX: 0, scale: 1, duration: 1.8, delay: 0.15, ease: 'expo.out', scrollTrigger: { trigger: '.cards-container', start: 'top 80%' }}
      );

      // 5. Versatility Orientation Cards Reveal
      gsap.fromTo('.orientation-card',
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.versatility-section', start: 'top 75%' } }
      );
      
      // Massive Background Text Scrubbing
      gsap.to('.bg-text-scroll', {
        x: '-40%',
        ease: 'none',
        scrollTrigger: { trigger: '.versatility-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      // 6. Remote Control Clean Grounded Reveal (No flying or rotation)
      gsap.fromTo('.remote-card',
        { y: 60, opacity: 0, scale: 0.98 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.remote-card', start: 'top 80%' }
        }
      );

      // 7. IQ World Complex 3D Turn
      gsap.fromTo('.iq-img-container',
        { scale: 0.5, opacity: 0, rotationX: 55, rotationY: -40, y: 300, z: -500 },
        { 
          scale: 1, opacity: 1, rotationX: 0, rotationY: 0, y: 0, z: 0,
          duration: 2.5,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.iq-section', start: 'top 75%' }
        }
      );

      // 8. Newsletter Circular Reveal
      gsap.fromTo('.newsletter-card',
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', duration: 2.5, ease: 'power3.inOut', scrollTrigger: { trigger: '.newsletter-section', start: 'top 75%' } }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen font-sans overflow-hidden pt-20">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={cantechno} 
            alt="CAN Technology" 
            className="hero-bg w-full h-full object-cover opacity-0 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-6xl px-6" style={{ perspective: '1000px' }}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter mb-8 text-white drop-shadow-2xl leading-[1.05] overflow-hidden flex flex-col items-center">
            <span className="hero-word inline-block">Engineered</span>
            <span className="hero-word inline-block">for</span>
            <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 px-4">
              Excellence
            </span>
          </h1>
          <p className="hero-word text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the hardware and software systems that power the next generation of digital display technology.
          </p>
        </div>
      </section>

      {/* ILLUMINATE SECTION */}
      <section className="py-24 md:py-40 px-6 sm:px-12 md:px-20 lg:px-32 relative bg-[#0c0d12]">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-32">
            <div className="flex-[1.2]" style={{ perspective: '1000px' }}>
              <div className="anim-text w-fit">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold mb-6 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
                   <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                   REDEFINING DISPLAY
                </span>
              </div>
              <h2 className="anim-text text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.1]">
                Illuminate <br/>Anywhere <span className="font-bold">Anytime</span>
              </h2>
            </div>
            <div className="flex-1 lg:pt-20" style={{ perspective: '1000px' }}>
              <p className="anim-text text-base sm:text-xl text-gray-300 leading-relaxed font-light border-l border-cyan-500/30 pl-6">
                Welcome to a world where clarity meets innovation, where every detail matters, and where CAN Display becomes the canvas for your visual masterpiece.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 cards-container" style={{ perspective: '1200px' }}>
            {/* Card 1 */}
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="tech-card-1 rounded-[40px] bg-gradient-to-br from-[#161a29]/95 via-[#0e121d]/95 to-[#06080e]/98 border border-white/10 p-10 sm:p-14 shadow-2xl backdrop-blur-md hover:border-cyan-500/40 relative overflow-hidden flex flex-col justify-center min-h-[350px] transform-style-3d"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              <MonitorSmartphone className="text-cyan-400 mb-8" size={48} strokeWidth={1} />
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-6">
                 Resolution <span className="font-bold text-cyan-400">Redefined</span>
              </h3>
              <p className="text-gray-400 leading-relaxed text-base sm:text-lg font-light">
                Elevate your viewing experience with IPS Panel's HD brilliance or dive into the future with 4K resolution support, available in our 43" and above screen sizes. CAN Display ensures every detail is brought to life on your screen.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="tech-card-2 rounded-[40px] bg-gradient-to-br from-[#161a29]/95 via-[#0e121d]/95 to-[#06080e]/98 border border-white/10 p-10 sm:p-14 shadow-2xl backdrop-blur-md hover:border-blue-500/40 md:mt-24 relative overflow-hidden flex flex-col justify-center min-h-[350px] transform-style-3d"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
              <Airplay className="text-blue-400 mb-8" size={48} strokeWidth={1} />
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-6">
                 Panoramic <span className="font-bold text-blue-400">Precision</span>
              </h3>
              <p className="text-gray-400 leading-relaxed text-base sm:text-lg font-light">
                Enjoy a mesmerizing 178-degree vision angle, allowing you to capture every detail from any corner of the room. Immerse yourself in a display that goes beyond the ordinary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VERSATILITY IN ORIENTATION - REDESIGNED HERO SHOWCASE */}
      <section className="versatility-section py-20 md:py-32 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#06070a] relative overflow-hidden border-t border-white/5">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-blue-600/10 blur-[180px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none"></div>
        <div className="bg-text-scroll absolute text-[18vw] font-black text-white/[0.015] whitespace-nowrap top-12 left-0 pointer-events-none select-none tracking-tighter">
          VERSATILITY IN EVERY ANGLE
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="anim-text">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full backdrop-blur-sm mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                DUAL ORIENTATION FLEXIBILITY
              </span>
            </div>
            
            <h2 className="anim-text text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Versatility in <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300">Orientation</span>
            </h2>
            
            <p className="anim-text text-base sm:text-lg text-gray-300 leading-relaxed font-light mb-8 max-w-2xl">
              Engineered for seamless commercial versatility. Deploy CAN displays horizontally for high-impact menu boards, dashboards, and video walls — or vertically for elegant floor standees, retail showcases, and directory kiosks.
            </p>

          </div>

          {/* Cards Showcase Grid - Side-by-Side Dual View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* 1. PORTRAIT CARD */}
            <div className="orientation-card flex flex-col rounded-3xl bg-[#090b10]/90 border border-white/10 hover:border-cyan-500/40 p-5 sm:p-7 backdrop-blur-2xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] group">
                {/* Card Top Pill Bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                      <div className="w-3.5 h-5 border-2 border-cyan-400 rounded-sm"></div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">Vertical Display</div>
                      <h3 className="text-lg sm:text-xl font-medium text-white">Portrait Orientation</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      9:16 Standee
                    </span>
                    <button
                      type="button"
                      onClick={() => setFullscreenImage({ src: canOrientationPortrait, title: 'Portrait Floor Standee in Retail Boutique', orientation: 'Portrait' })}
                      className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="Inspect full screen"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Physical Display Enclosure / Screen Container */}
                <div className="relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#141824] to-[#0a0d14] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.9)] mb-6">
                  {/* Subtle Bezel Status Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 mb-2 text-[10px] text-gray-400 tracking-wider">
                    <span className="flex items-center gap-1.5 text-cyan-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      LIVE CAN DISPLAY
                    </span>
                    <span className="text-gray-500 font-mono">STAND / FLOOR KIOSK</span>
                  </div>

                  {/* 16:9 Aspect Viewport - Ensures 100% of the photograph and screen are fully visible without cropping */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black shadow-inner border border-white/5">
                    <img
                      src={canOrientationPortrait}
                      alt="CAN Vertical Portrait Display Standee in Luxury Retail Store"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block"
                    />

                    {/* Subtle Glass Glare Accent */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>

                    {/* Floating Hotspot Badges on Image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white tracking-wide shadow-lg flex items-center gap-1.5">
                        <Sparkles size={11} className="text-cyan-400" />
                        Retail Boutique Setup
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[11px] font-medium text-cyan-300 tracking-wide shadow-xl">
                        Freestanding CAN Standee
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-xl">
                        Eye-Level 9:16
                      </span>
                    </div>
                  </div>
                </div>

                {/* Use Case & Features Breakdown */}
                <div className="mt-auto space-y-4">
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    Engineered to command attention in high-footfall areas. Ideal for fashion boutiques, hotel lobbies, corporate entrances, and interactive wayfinding directories.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Mounting</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-400" /> A-Frame Floor Stand
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Applications</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-400" /> Retail & Kiosks
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Resolution</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-400" /> FHD / 4K Commercial
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Glass & Panel</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-cyan-400" /> Toughened IPS Glass
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* 2. LANDSCAPE CARD */}
            <div className="orientation-card flex flex-col rounded-3xl bg-[#090b10]/90 border border-white/10 hover:border-blue-500/40 p-5 sm:p-7 backdrop-blur-2xl transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] group">
                {/* Card Top Pill Bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
                      <div className="w-5 h-3.5 border-2 border-blue-400 rounded-sm"></div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase">Horizontal Display</div>
                      <h3 className="text-lg sm:text-xl font-medium text-white">Landscape Orientation</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      16:9 Wall Mount
                    </span>
                    <button
                      type="button"
                      onClick={() => setFullscreenImage({ src: canOrientationLandscape, title: 'Landscape Digital Menu Display with 178° Wide Angle', orientation: 'Landscape' })}
                      className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-blue-500/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                      title="Inspect full screen"
                    >
                      <Maximize2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Physical Display Enclosure / Screen Container */}
                <div className="relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#141824] to-[#0a0d14] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_15px_35px_rgba(0,0,0,0.9)] mb-6">
                  {/* Subtle Bezel Status Bar */}
                  <div className="flex items-center justify-between px-3 py-1.5 mb-2 text-[10px] text-gray-400 tracking-wider">
                    <span className="flex items-center gap-1.5 text-blue-300 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                      LIVE CAN DISPLAY
                    </span>
                    <span className="text-gray-500 font-mono">WALL MOUNT / MENU BOARD</span>
                  </div>

                  {/* 16:9 Aspect Viewport - 100% of the screen, pizza menu, CAN logo, and 178° viewing angle callout visible */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black shadow-inner border border-white/5">
                    <img
                      src={canOrientationLandscape}
                      alt="CAN Horizontal Landscape Menu Display in Pizza Restaurant with 178 degree wide viewing angle"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 block"
                    />

                    {/* Subtle Glass Glare Accent */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none"></div>

                    {/* Floating Hotspot Badges on Image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white tracking-wide shadow-lg flex items-center gap-1.5">
                        <Sparkles size={11} className="text-blue-400" />
                        Restaurant Digital Menu
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-blue-500/30 text-[11px] font-medium text-blue-300 tracking-wide shadow-xl">
                        178° Wide Viewing Angle
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest shadow-xl">
                        Panoramic 16:9
                      </span>
                    </div>
                  </div>
                </div>

                {/* Use Case & Features Breakdown */}
                <div className="mt-auto space-y-4">
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    Built for expansive horizontal visibility in fast-casual restaurants, bars, meeting rooms, and command centers. Features an ultra-wide 178° viewing angle so menus are crystal clear from any vantage point.
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Mounting</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-blue-400" /> VESA Wall / Ceiling
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Viewing Angle</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-blue-400" /> 178° IPS Uniformity
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Content Format</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-blue-400" /> Dynamic Menu Boards
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mb-1">Duty Cycle</div>
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <Check size={12} className="text-blue-400" /> 24/7 Commercial Grade
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Fullscreen Image Lightbox Modal */}
        <AnimatePresence>
          {fullscreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenImage(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            >
              <div 
                className="relative max-w-6xl w-full bg-[#0d1017] border border-white/20 rounded-3xl overflow-hidden shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-black/40">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase">
                      {fullscreenImage.orientation}
                    </span>
                    <h4 className="text-base sm:text-lg font-medium text-white">{fullscreenImage.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFullscreenImage(null)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="p-3 sm:p-6 bg-black flex items-center justify-center">
                  <img
                    src={fullscreenImage.src}
                    alt={fullscreenImage.title}
                    className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SLEEK REMOTE CONTROL - GROUNDED SHOWCASE */}
      <section className="py-20 md:py-32 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#0a0c12] border-t border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[160px] rounded-full pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Grounded Remote Showcase Card */}
          <div className="order-2 lg:order-1 w-full">
            <div className="remote-card rounded-3xl bg-[#0e111a] border border-white/10 p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-cyan-500/30 transition-all duration-500 group">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-white/5">
                <img 
                  src={remote} 
                  alt="CAN Smart Remote Control with Digital Signage Kiosk" 
                  className="w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                
                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>
                
                {/* Badges on image */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-white tracking-wide shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Direct Screen Control
                  </span>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-xl">
                    Ergonomic Remote
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-widest shadow-xl">
                    CAN Display & Totem
                  </span>
                </div>
              </div>

              {/* Status bar under image */}
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Instant Wireless Pairing
                </span>
                <span className="font-mono text-gray-400">IQ WORLD SYNCED</span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Information & Details */}
          <div className="order-1 lg:order-2 text-left lg:pl-6">
            <div className="anim-text flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                INTUITIVE HARDWARE
              </span>
            </div>

            <h2 className="anim-text text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight mb-6">
              Sleek Remote <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Control</span>
            </h2>

            <p className="anim-text text-base sm:text-lg text-gray-300 leading-relaxed font-light mb-8">
              Take complete command with our sleek remote control, designed for modern commercial environments. Effortlessly switch input sources, adjust audio and brightness, and navigate IQ World playlists with responsive precision.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                  <Check size={14} className="text-cyan-400 shrink-0" />
                  Tactile Navigation Pad
                </div>
                <p className="text-xs text-gray-400 pl-5">Intuitive 4-way directional control for menus and media apps.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                  <Check size={14} className="text-cyan-400 shrink-0" />
                  Dedicated App Shortcut
                </div>
                <p className="text-xs text-gray-400 pl-5">Instant access to IQ World digital signage management.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                  <Check size={14} className="text-cyan-400 shrink-0" />
                  Long-Range Transmission
                </div>
                <p className="text-xs text-gray-400 pl-5">Multi-angle signal coverage for large commercial spaces.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                  <Check size={14} className="text-cyan-400 shrink-0" />
                  Ergonomic Matte Finish
                </div>
                <p className="text-xs text-gray-400 pl-5">Comfortable handheld grip built for heavy daily use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IQ WORLD */}
      <section className="iq-section py-24 md:py-40 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#06070a] border-t border-white/5 relative overflow-hidden">
         <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-fuchsia-600/10 blur-[200px] rounded-full pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 items-end" style={{ perspective: '1000px' }}>
              <div className="flex-[1.2]">
                <div className="anim-text w-fit mx-auto lg:mx-0">
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-fuchsia-400 font-semibold mb-6 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 backdrop-blur-sm">
                     <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping"></span>
                     IQ WORLD
                  </span>
                </div>
                <h2 className="anim-text text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-light tracking-tight text-white leading-[1.05]">
                  Seamless User <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Experience</span>
                </h2>
              </div>
              <div className="flex-1 flex flex-col items-start gap-5 border-l-2 border-fuchsia-500/30 pl-6">
                <p className="anim-text text-lg sm:text-xl text-gray-400 leading-relaxed font-light text-left">
                  Empower yourself with the IQ World app's robust features. Manage screens efficiently with admin control, while clients enjoy a seamless viewing experience. It's control at your fingertips.
                </p>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.iqw.iqworld_mobile&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anim-text inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase text-white bg-fuchsia-600/20 hover:bg-fuchsia-500 hover:text-white border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all duration-300 shadow-[0_0_20px_rgba(217,70,239,0.2)]"
                >
                  <span>Get IQ World App</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="relative mt-16 perspective-1000">
              <div className="iq-img-container rounded-[40px] overflow-hidden border border-white/10 bg-black p-4 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.9)] transform-style-3d group">
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/20 via-transparent to-transparent pointer-events-none mix-blend-overlay z-10"></div>
                <div className="anim-img w-full h-full rounded-[24px] overflow-hidden">
                  <img src={iqscreens} alt="IQ World Dashboard" className="w-full h-auto object-cover shadow-2xl border border-white/5" />
                </div>
                
                {/* Floating UI Elements Overlay */}
                <motion.div 
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, type: 'spring', bounce: 0.4 }}
                  className="absolute -bottom-10 sm:-bottom-16 -right-4 sm:-right-10 rounded-[32px] bg-[#0c0d12]/90 border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl max-w-[400px] z-20"
                >
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-4 pb-4 border-b border-white/10 flex items-center gap-3 text-fuchsia-400">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#e879f9]"></span>
                    Real-Time Info
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                    A cloud-based software that gives you a centralised control hub to monitor multiple screens effortlessly. Feature rich with schedule management, split-screen options, and text scrolling.
                  </p>
                </motion.div>
              </div>
            </div>
         </div>
      </section>

      {/* SUBSCRIBE TO NEWS SECTION */}
      {/* <section className="newsletter-section py-32 sm:py-40 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#0c0d12] relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto w-full relative">
          <div className="newsletter-card relative rounded-[40px] md:rounded-[48px] bg-gradient-to-br from-[#121622]/95 via-[#0b0e17]/95 to-[#06080e]/98 border border-white/10 p-10 sm:p-16 lg:p-24 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20 w-full">
            {/* Ambient glows *
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"></div>
            <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Left Content *
            <div className="flex-1 text-left max-w-2xl relative z-10" style={{ perspective: '1000px' }}>
              <div className="anim-text w-fit">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  NEWSLETTER
                </span>
              </div>

              <h2 className="anim-text text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-6 leading-[1.1]">
                Stay Ahead of the <br/><span className="font-bold">Signage Curve</span>
              </h2>
              <p className="anim-text text-base sm:text-lg text-gray-400 font-light leading-relaxed">
                Subscribe to get curated updates on digital displays, commercial hardware releases, and intelligent software trends directly to your inbox.
              </p>
            </div>

            {/* Right Content *
            <div className="anim-text flex-[0.9] w-full max-w-lg relative z-10">
              <form onSubmit={handleSubscribe} className="flex flex-col gap-5 w-full">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#06070a]/80 border border-white/10 text-white text-lg rounded-3xl pl-16 pr-8 py-5 sm:py-6 outline-none focus:border-cyan-500/50 focus:bg-[#06070a] transition-all placeholder:text-gray-600 shadow-inner"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`w-full flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase py-5 sm:py-6 rounded-3xl transition-all duration-300 interactive ${
                    subscribed 
                      ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                      : 'bg-white text-black hover:bg-cyan-400 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]'
                  }`}
                >
                  {subscribed ? (
                    <>
                      Subscribed! <CheckCircle size={20} />
                    </>
                  ) : (
                    <>
                      Subscribe Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center mt-3 font-medium">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Technology;
