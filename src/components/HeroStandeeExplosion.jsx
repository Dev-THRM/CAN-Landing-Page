import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroStandeeExplosion = () => {
  const [exploded, setExploded] = useState(false);

  // Auto-explode after a short delay on mount to demonstrate the effect, 
  // then collapse, allowing the user to hover to interact.
  useEffect(() => {
    const timer1 = setTimeout(() => setExploded(true), 1200);
    const timer2 = setTimeout(() => setExploded(false), 3800);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-crosshair"
      onMouseEnter={() => setExploded(true)}
      onMouseLeave={() => setExploded(false)}
      style={{ perspective: '1200px' }}
    >
      {/* 3D Container */}
      <motion.div 
        className="relative w-[240px] h-[400px] sm:w-[280px] sm:h-[480px] md:w-[300px] md:h-[520px] mt-[-80px] md:mt-0"
        initial={{ rotateX: 5, rotateY: -20 }}
        animate={{ 
          rotateX: exploded ? 15 : 5, 
          rotateY: exploded ? -35 : -20,
          scale: exploded ? 0.85 : 1
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Layer 1: Back Casing & Stand */}
        <motion.div 
          className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#1a1a1c] to-[#0a0a0c] border-2 border-[#2a2a2c] shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
          animate={{ z: exploded ? -140 : -10 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
            {/* A-Frame Stand Legs */}
            <div className="absolute -bottom-32 left-8 w-4 h-36 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-b-xl transform origin-top rotate-[15deg] shadow-2xl"></div>
            <div className="absolute -bottom-32 right-8 w-4 h-36 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-b-xl transform origin-top -rotate-[15deg] shadow-2xl"></div>
            {/* Crossbar */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[120%] h-3 bg-zinc-800 rounded-full shadow-lg"></div>
            <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[140%] h-3 bg-zinc-900 rounded-full shadow-lg opacity-60"></div>
        </motion.div>

        {/* Layer 2: Internal Hardware Chassis */}
        <motion.div 
          className="absolute inset-3 rounded-[18px] bg-[#1a1c23] border border-white/5 overflow-hidden shadow-inner"
          animate={{ z: exploded ? -70 : -5 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Faux Hardware Grid/Vents */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          <div className="absolute top-10 left-10 w-20 h-32 bg-black/40 border border-white/10 rounded-md"></div>
          <div className="absolute bottom-10 right-10 w-32 h-20 bg-black/40 border border-white/10 rounded-md"></div>
        </motion.div>

        {/* Layer 3: The OLED Display (The colorful part) */}
        <motion.div 
          className="absolute inset-[8px] rounded-[18px] bg-black overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.2)]"
          animate={{ z: exploded ? 0 : 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Swirling color gradient mimicking the reference image screen (vibrant pink/orange/blue) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 via-purple-600 to-orange-400 opacity-100 blur-[2px] mix-blend-normal scale-110"></div>
          {/* Animated swirl overlay */}
          <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
             className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.3),transparent,rgba(236,72,153,0.5),transparent)] mix-blend-overlay"
          ></motion.div>
        </motion.div>

        {/* Layer 4: Front Glass Panel & Frame */}
        <motion.div 
          className="absolute inset-0 rounded-[24px] bg-white/[0.02] backdrop-blur-[4px] border-[12px] border-[#0c0c0e] shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] flex items-end justify-center pb-3"
          animate={{ z: exploded ? 100 : 5 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* CAN Logo on Glass */}
          <div className="text-white/60 font-bold tracking-[0.4em] text-[10px]">CAN</div>
          {/* Glass reflection */}
          <div className="absolute top-0 left-0 w-[200%] h-[200%] bg-gradient-to-bl from-white/10 via-transparent to-transparent transform -translate-y-[40%] -translate-x-[20%] pointer-events-none"></div>
        </motion.div>

        {/* Floating Screws / Components (Only visible when exploded) */}
        <AnimatePresence>
            {exploded && (
              <>
                {[
                  { top: '5%', left: '-8%', z: 80, delay: 0.1 },
                  { top: '5%', right: '-8%', z: 80, delay: 0.2 },
                  { bottom: '8%', left: '-8%', z: 80, delay: 0.15 },
                  { bottom: '8%', right: '-8%', z: 80, delay: 0.25 },
                  { top: '20%', left: '-12%', z: -30, delay: 0.3 },
                  { bottom: '20%', right: '-12%', z: -30, delay: 0.35 },
                  { top: '50%', left: '-15%', z: -80, delay: 0.4 },
                  { bottom: '60%', right: '-15%', z: -80, delay: 0.45 },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 0, y: 0, z: 0 }}
                    animate={{ opacity: 1, x: pos.left ? -30 : 30, y: pos.top ? -20 : 20, z: pos.z }}
                    exit={{ opacity: 0, x: 0, y: 0, z: 0 }}
                    transition={{ duration: 1, delay: pos.delay, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute w-2 h-2 rounded-full bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{ 
                      top: pos.top || 'auto', 
                      bottom: pos.bottom || 'auto', 
                      left: pos.left || 'auto', 
                      right: pos.right || 'auto' 
                    }}
                  />
                ))}
              </>
            )}
        </AnimatePresence>

      </motion.div>
      
      {/* Interaction Hint */}
      <motion.div 
        animate={{ opacity: exploded ? 0 : 0.8 }}
        className="absolute bottom-4 md:bottom-10 text-[10px] font-semibold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-900/30 px-5 py-2.5 rounded-full border border-cyan-500/30 backdrop-blur-md pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      >
        Hover to Explode
      </motion.div>
    </div>
  );
};

export default HeroStandeeExplosion;
