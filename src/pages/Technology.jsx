import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Smartphone, MonitorSmartphone, Airplay } from 'lucide-react';
import cantechno from '../assets/cantechno.jpg';
import canfashion from '../assets/canfashion.jpg';
import canpizzamenu from '../assets/canpizzamenu.jpg';
import remote from '../assets/remote.jpg';
import iqscreens from '../assets/iqscreens.jpg';

gsap.registerPlugin(ScrollTrigger);

const Technology = () => {
  const containerRef = useRef(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

      // 5. Versatility Image Clash (Elastic collision from sides)
      gsap.fromTo('.parallax-img-1',
        { x: -300, rotation: -25, opacity: 0, scale: 0.5 },
        { x: 0, rotation: 0, opacity: 1, scale: 1, duration: 2.5, ease: 'elastic.out(1, 0.6)', scrollTrigger: { trigger: '.versatility-section', start: 'top 75%' } }
      );
      gsap.fromTo('.parallax-img-2',
        { x: 300, rotation: 25, opacity: 0, scale: 0.5 },
        { x: 0, rotation: 0, opacity: 1, scale: 1, duration: 2.5, delay: 0.2, ease: 'elastic.out(1, 0.6)', scrollTrigger: { trigger: '.versatility-section', start: 'top 75%' } }
      );
      
      // Massive Background Text Scrubbing
      gsap.to('.bg-text-scroll', {
        x: '-40%',
        ease: 'none',
        scrollTrigger: { trigger: '.versatility-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      // 6. Remote Control Massive Shrink Reveal
      gsap.fromTo('.remote-float',
        { scale: 4, rotationZ: 45, opacity: 0, filter: 'blur(30px)', y: -300 },
        { 
          scale: 1, rotationZ: -3, opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.5, ease: 'expo.out',
          scrollTrigger: { trigger: '.remote-float', start: 'top 80%' }
        }
      );
      
      // Continuous float after reveal
      gsap.to('.remote-float', {
        y: -15, rotationZ: -1, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5
      });

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
                Elevate your viewing experience with IPS Panel's HD brilliance or dive into the future with 4K resolution support, exclusively available in our 50", 55" and above screen sizes. CAN Display ensures every detail is brought to life on your screen.
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

      {/* VERSATILITY IN ORIENTATION */}
      <section className="versatility-section py-24 md:py-40 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#06070a] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none -translate-y-1/2"></div>
        <div className="bg-text-scroll absolute text-[25vw] font-black text-white/[0.02] whitespace-nowrap top-1/4 left-0 pointer-events-none select-none tracking-tighter">VERSATILITY IN EVERY ANGLE</div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Overlapping Images Layout */}
          <div className="w-full lg:w-1/2 relative h-[500px] sm:h-[700px] lg:h-[800px]">
            <div className="absolute top-0 left-0 w-[65%] h-[65%] rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 parallax-img-1 group">
              <img src={canfashion} alt="Vertical Display in Store" className="w-full h-full object-cover mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                 <span className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-widest shadow-xl">Portrait</span>
                 <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 backdrop-blur-md">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="2" width="12" height="20" rx="2"/></svg>
                 </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-[70%] h-[55%] rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-20 parallax-img-2 group">
              <img src={canpizzamenu} alt="Horizontal Menu Display" className="w-full h-full object-cover mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-80"></div>
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                 <span className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-xs font-bold text-white border border-white/10 uppercase tracking-widest shadow-xl">Landscape</span>
                 <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 backdrop-blur-md">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
                 </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl" style={{ perspective: '1000px' }}>
            <div className="anim-text w-fit">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full backdrop-blur-sm mb-6 shadow-[0_0_8px_#60a5fa]">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                 ADAPTABILITY
              </span>
            </div>
            <h3 className="anim-text text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-8">
              Versatility in <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Orientation</span>
            </h3>
            <p className="anim-text text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
              Choose your style with CAN Display - available in both vertical and horizontal orientations. Tailor your visual setup to match your unique space and preferences seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* SLEEK REMOTE CONTROL */}
      <section className="py-24 md:py-40 px-6 sm:px-12 md:px-20 lg:px-32 bg-[#0c0d12] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative h-[500px] sm:h-[600px] lg:h-[700px] w-full flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-[#161a29]/50 via-[#0e121d]/50 to-[#06080e]/50 border border-white/10 rounded-[48px] shadow-[0_25px_80px_rgba(0,0,0,0.85)]"></div>
             <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent blur-3xl pointer-events-none rounded-[48px]"></div>
             
             {/* Floating Remote Card */}
             <div className="remote-float w-[95%] sm:w-[85%] lg:w-[90%] h-auto relative z-10 rounded-[24px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] border-2 border-white/10">
                <img src={remote} alt="Sleek Remote with TV" className="w-full h-auto object-cover block" />
             </div>
             
             {/* Decorative circles */}
             <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-cyan-500/20 opacity-50"></div>
             <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-white/5 opacity-50"></div>
          </div>
          
          <div className="order-1 lg:order-2 text-left lg:pl-10" style={{ perspective: '1000px' }}>
            <div className="anim-text flex items-center gap-4 mb-8">
               <div className="w-16 h-[1px] bg-cyan-500/50"></div>
               <span className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-400">CONTROL</span>
            </div>
            <h2 className="anim-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight mb-8">
              Sleek Remote <br/><span className="font-bold">Control</span>
            </h2>
            <p className="anim-text text-lg sm:text-xl text-gray-400 leading-relaxed font-light mb-10">
              Take command with our sleek remote control, designed for convenience. Operate basic functions effortlessly, ensuring your CAN Display experience is as smooth as the visuals it delivers.
            </p>
            <div className="anim-text flex items-center gap-6">
               <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md hover:bg-cyan-500/20 transition-colors cursor-pointer hover:scale-110 shadow-lg">
                 <Smartphone className="text-cyan-400" size={24} />
               </div>
               <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md hover:bg-cyan-500/20 transition-colors cursor-pointer hover:scale-110 shadow-lg">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
              <p className="anim-text text-lg sm:text-xl text-gray-400 leading-relaxed font-light flex-1 text-left border-l-2 border-fuchsia-500/30 pl-6">
                Empower yourself with the IQ World app's robust features. Manage screens efficiently with admin control, while clients enjoy a seamless viewing experience. It's control at your fingertips.
              </p>
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
