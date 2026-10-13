import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Tv, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

import bg1 from '../assets/bg1.mp4';
import bg2 from '../assets/bg2.mp4';
import bg3 from '../assets/bg3.mp4';
import bg1Thumb from '../assets/bg1-thumb.jpg';
import bg2Thumb from '../assets/bg2-thumb.jpg';
import bg3Thumb from '../assets/bg3-thumb.jpg';

const slides = [
  {
    id: 0,
    number: '01',
    name: 'CANLit',
    badge: 'ARCHITECTURAL STANDEE',
    headlineTop: 'FUEL YOUR',
    headlineAccent: 'CREATIV',
    headlineGhost: 'ITY',
    iconType: 'tv',
    description:
      'The next generation of spatial digital signage that blends architectural hardware, perception, and cloud intelligence into one seamless experience. Experience displays engineered with 178° IPS viewing and 4K brilliance.',
    ctaPrimary: '>> Buy Now',
    ctaPrimaryLink: '/technology',
    ctaSecondary: 'Explore more',
    ctaSecondaryLink: '/technology',
    video: bg1,
    poster: bg1Thumb,
    productCode: '11 PRO',
    tag: 'STANDEE',
    specs: ['178° IPS Panel', 'FHD & 4K UHD', 'Toughened Glass']
  },
  {
    id: 1,
    number: '02',
    name: 'CANMount',
    badge: 'PRECISION WALL MOUNT',
    headlineTop: 'ELEVATE YOUR',
    headlineAccent: 'SPATIAL',
    headlineGhost: 'VISION',
    iconType: 'layers',
    description:
      'Ultra-slim architectural wall-mounted displays featuring zero-gap wall integration, 16.7M vivid colours, and high-ambient 380 Nits illumination. Engineered for high-traffic corridors and luxury retail.',
    ctaPrimary: '>> Buy Now',
    ctaPrimaryLink: '/technology',
    ctaSecondary: 'Explore more',
    ctaSecondaryLink: '/technology',
    video: bg2,
    poster: bg2Thumb,
    productCode: '11 WALL',
    tag: 'WALL MOUNT',
    specs: ['Zero-Gap Flush', '16.7M Colours', '380 Nits Brightness']
  },
  {
    id: 2,
    number: '03',
    name: 'CANVue',
    badge: 'INTERACTIVE TOUCH KIOSK',
    headlineTop: 'TRANSFORM YOUR',
    headlineAccent: 'INTERACT',
    headlineGhost: 'ION',
    iconType: 'sparkles',
    description:
      'Autonomous multi-touch commercial kiosks built with precision caster mobility, toughened front glass, and 24/7 internal thermal cooling for dynamic public engagement in commercial environments.',
    ctaPrimary: '>> Buy Now',
    ctaPrimaryLink: '/technology',
    ctaSecondary: 'Explore more',
    ctaSecondaryLink: '/technology',
    video: bg3,
    poster: bg3Thumb,
    productCode: '11 KIOSK',
    tag: 'TOUCH KIOSK',
    specs: ['Multi-Touch Tech', 'Mobile Caster Base', '24/7 Active Cooling']
  }
];

const AUTOPLAY_DURATION = 8000; // 8 seconds per slide

const HeroReference = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef([]);
  const startTimeRef = useRef(Date.now());
  const pausedProgressRef = useRef(0);

  const currentSlide = slides[activeIdx];

  // Auto-play progress loop
  useEffect(() => {
    let animId;
    startTimeRef.current = Date.now() - (pausedProgressRef.current / 100) * AUTOPLAY_DURATION;

    const updateProgress = () => {
      if (!isPausedByUser) {
        const elapsed = Date.now() - startTimeRef.current;
        const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
        setProgress(pct);
        pausedProgressRef.current = pct;

        if (pct >= 100) {
          setActiveIdx((prev) => (prev + 1) % slides.length);
          startTimeRef.current = Date.now();
          pausedProgressRef.current = 0;
          setProgress(0);
        }
      }
      animId = requestAnimationFrame(updateProgress);
    };

    animId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animId);
  }, [activeIdx, isPausedByUser]);

  // Ensure active video is playing
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === activeIdx) {
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        vid.pause();
      }
    });
  }, [activeIdx]);

  const handleSelectSlide = (idx) => {
    setActiveIdx(idx);
    startTimeRef.current = Date.now();
    pausedProgressRef.current = 0;
    setProgress(0);
  };

  const toggleVideoPlayback = () => {
    const activeVid = videoRefs.current[activeIdx];
    if (activeVid) {
      if (activeVid.paused) {
        activeVid.play();
        setIsPlaying(true);
      } else {
        activeVid.pause();
        setIsPlaying(false);
      }
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'layers':
        return <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />;
      case 'tv':
      default:
        return <Tv className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />;
    }
  };

  return (
    <section 
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-10 lg:px-14 select-none"
      onMouseEnter={() => setIsPausedByUser(true)}
      onMouseLeave={() => setIsPausedByUser(false)}
    >
      {/* ── Ambient Background Glow & Gradients ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-5 w-[420px] h-[420px] bg-cyan-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[380px] h-[380px] bg-blue-600/10 blur-[160px] rounded-full"></div>
      </div>

      {/* ── Vertical Slide Counter on the Far Right (01, 02, 03) ── */}
      <div className="hidden lg:flex flex-col items-center gap-5 absolute right-6 xl:right-8 top-1/2 -translate-y-1/2 z-30">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => handleSelectSlide(idx)}
            className="group flex items-center gap-2.5 py-1 cursor-pointer transition-all duration-300"
            aria-label={`Jump to slide ${s.number}`}
          >
            <span
              className={`text-[11px] font-mono tracking-widest transition-all duration-300 ${
                activeIdx === idx
                  ? 'text-cyan-400 font-bold scale-110'
                  : 'text-white/30 group-hover:text-white/70'
              }`}
            >
              {s.number}
            </span>
            <span
              className={`h-[1.5px] rounded-full transition-all duration-300 ${
                activeIdx === idx
                  ? 'w-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                  : 'w-2 bg-white/20 group-hover:w-3.5 group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </div>

      {/* ── Top-Right Brand Subtle Accent ── */}
      <div className="absolute top-24 right-8 sm:right-14 z-20 hidden sm:flex items-center gap-2.5 opacity-80 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-cyan-400/80 font-mono font-medium">
          CAN ARCHITECTURAL
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
      </div>

      {/* ── MAIN 2-COLUMN HERO GRID (Text on Left, Contained Video on Right) ── */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6 xl:gap-8 my-auto flex-1">
        
        {/* LEFT COLUMN: Typography & Content */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start justify-center text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start"
            >
              {/* Category Pill Tag */}
              <div className="mb-3 sm:mb-4">
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                  {currentSlide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-[52px] xl:text-[60px] tracking-tight leading-[0.98] text-white uppercase mb-4 sm:mb-5">
                <span className="block">{currentSlide.headlineTop}</span>
                <span className="flex items-center mt-1 sm:mt-1.5">
                  {/* Metallic Beveled Icon Box */}
                  <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-700/80 via-zinc-800/90 to-zinc-950 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.8)] mr-2.5 sm:mr-3.5 flex-shrink-0">
                    {renderIcon(currentSlide.iconType)}
                  </span>
                  {/* Stylized Text with Faded Ghost Tail */}
                  <span className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {currentSlide.headlineAccent}
                  </span>
                  <span className="text-white/20 font-black tracking-tight select-none">
                    {currentSlide.headlineGhost}
                  </span>
                </span>
              </h1>

              {/* Paragraph with Horizontal Line Accent */}
              <div className="flex items-start gap-3.5 max-w-lg mb-6 sm:mb-7">
                <span className="w-8 sm:w-10 h-[1.5px] bg-white/40 mt-2.5 flex-shrink-0"></span>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-4">
                <a
                  href={currentSlide.ctaPrimaryLink}
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-zinc-900/90 hover:bg-cyan-500 text-white hover:text-black border border-white/20 hover:border-cyan-400 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] cursor-pointer"
                >
                  <span className="text-cyan-400 group-hover:text-black font-extrabold tracking-tighter">
                    &gt;&gt;
                  </span>
                  <span>Buy Now</span>
                </a>

                <a
                  href={currentSlide.ctaSecondaryLink}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2.5 px-2 group cursor-pointer"
                >
                  <span>Explore more</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Mini Specs Pill Bar */}
              <div className="flex flex-wrap items-center gap-2">
                {currentSlide.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="text-[9px] sm:text-[10px] font-medium text-gray-400 bg-white/[0.04] border border-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Dedicated Video Showcase (Enlarged and dynamic) */}
        <div className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-center lg:justify-end w-full h-[46vh] sm:h-[55vh] md:h-[62vh] lg:h-[74vh] xl:h-[80vh] max-h-[720px] xl:max-h-[820px]">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 flex items-center justify-center lg:justify-end transition-all duration-700 ease-in-out ${
                activeIdx === idx 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-95 pointer-events-none z-0'
              }`}
            >
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={s.video}
                poster={s.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                className="w-full h-full max-h-full object-contain scale-[1.05] sm:scale-[1.10] lg:scale-[1.14] xl:scale-[1.18] transform origin-center lg:origin-right filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              />
            </div>
          ))}
        </div>

      </div>

      {/* ── BOTTOM CONTROLS & SWITCHER BAR ── */}
      <div className="relative z-30 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/5">
        
        {/* Left cluster: Vertical Social Bar + 3 Switcher Thumbnail Boxes */}
        <div className="flex items-center sm:items-end gap-3 sm:gap-4">
          
          {/* Vertical Glass Pill Social Container */}
          <div className="flex flex-col items-center gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex-shrink-0">
            {/* WhatsApp */}
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.588-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.18-.545-1.902-.788-3.127-2.73-3.222-2.857-.095-.128-.771-1.027-.771-1.959 0-.933.489-1.391.663-1.581.174-.191.38-.239.506-.239.127 0 .253.001.364.007.118.006.275-.045.43.328.158.381.539 1.314.586 1.41.048.095.079.206.016.333-.063.127-.095.206-.19.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.056 1.315.725.645 1.336.845 1.527.94.19.095.302.079.413-.048.111-.127.476-.555.603-.745.127-.19.254-.159.429-.095.174.063 1.111.524 1.301.619.19.095.317.143.365.222.048.079.048.46-.095.865z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.957-1.399C8.423 21.503 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.17-.487-4.464-1.326l-.32-.208-2.946.832.84-2.868-.228-.337A8.17 8.17 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.522 0 8.2 3.679 8.2 8.2 0 4.522-3.678 8.2-8.2 8.2z"/>
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Switcher Boxes Row with Indicator Bars Below */}
          <div className="flex flex-col gap-2">
            <div className="flex items-end gap-2.5 sm:gap-3.5">
              {slides.map((s, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer text-left group ${
                      isActive
                        ? 'w-24 sm:w-32 md:w-36 h-16 sm:h-20 md:h-24 ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                        : 'w-14 sm:w-18 md:w-20 h-14 sm:h-18 md:h-18 opacity-60 hover:opacity-100 hover:scale-105 border border-white/20'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <img
                      src={s.poster}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                    {/* Active Card HUD Details */}
                    {isActive ? (
                      <div className="absolute inset-0 p-1.5 sm:p-2 flex flex-col justify-between z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-widest text-cyan-400 bg-black/60 px-1 py-0.5 rounded border border-cyan-400/30">
                            {s.productCode}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]"></span>
                        </div>
                        <div>
                          <p className="text-[9px] sm:text-[11px] font-bold text-white leading-tight">
                            {s.name}
                          </p>
                          <p className="text-[7px] sm:text-[8px] text-gray-300 font-mono tracking-wider">
                            {s.tag}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute bottom-1 inset-x-1 text-center z-10">
                        <span className="text-[8px] sm:text-[9px] font-semibold text-white/90 truncate block">
                          {s.name}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dash Indicators below cards */}
            <div className="flex items-center gap-1.5 pl-1">
              {slides.map((s, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSlide(idx)}
                    className="group py-1 cursor-pointer"
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div
                      className={`h-1 rounded-full transition-all duration-300 overflow-hidden relative ${
                        isActive
                          ? 'w-12 sm:w-16 bg-white/20'
                          : 'w-5 sm:w-7 bg-white/20 group-hover:bg-white/40'
                      }`}
                    >
                      {isActive && (
                        <div
                          className="h-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Controls: Play / Pause Loop button */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto pb-1">
          <button
            type="button"
            onClick={toggleVideoPlayback}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 hover:border-cyan-400/50 text-white text-xs font-medium tracking-wider backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer group"
          >
            {isPlaying ? (
              <>
                <Pause size={12} className="text-cyan-400" />
                <span className="text-[10px] sm:text-[11px] text-gray-300 group-hover:text-white">Pause Video</span>
              </>
            ) : (
              <>
                <Play size={12} className="text-cyan-400 fill-cyan-400" />
                <span className="text-[10px] sm:text-[11px] text-gray-300 group-hover:text-white">Play Loop</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 sm:p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/15 hover:border-cyan-400/50 text-gray-400 hover:text-white transition-all cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-cyan-400" />}
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroReference;
