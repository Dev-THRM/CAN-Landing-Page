import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate, useAnimation } from 'framer-motion';
import { ArrowRight, LayoutGrid, Zap, Leaf, Maximize } from 'lucide-react';
import standeeExploded from '../../assets/standee_exploded.jpg';
import heroImg from '../../assets/hero.png';

// Reusable animated text component
const FadeInText = ({ children, delay = 0, className = "", direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: yOffset, x: xOffset }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated Number Counter
const AnimatedCounter = ({ from, to, decimals = 1, suffix = "", duration = 2.5 }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            // Format to requested decimals and remove .0 if not needed, but for 16.7 we keep it
            const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
            nodeRef.current.textContent = formatted + " " + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, from, to, duration, decimals, suffix]);

  return <span ref={nodeRef}>{from} {suffix}</span>;
};

// --- Sections ---

export const WhyCanSection = () => {
  return (
    <section className="section-dark why-can-section overflow-hidden position-relative">
      {/* Background Animated Orbs */}
      <div className="absolute-inset pointer-events-none">
        <motion.div 
          className="glow-orb orb-blue"
          animate={{ x: [0, 150, -50, 0], y: [0, -100, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="glow-orb orb-purple"
          animate={{ x: [0, -150, 50, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <FadeInText>
          <span className="section-subtitle glow-text">WHY CAN ?</span>
        </FadeInText>
        
        <div className="mt-8">
          <motion.h2 
            className="section-title massive-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">We're</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">Here</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">to</motion.span>
            <br />
            <motion.span 
              variants={{ hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" }, visible: { opacity: 1, scale: 1, filter: "blur(0px)" } }} 
              transition={{ type: "spring", damping: 12, stiffness: 100 }}
              className="gradient-text-blue inline-block mr-4"
            >
              Revolutionize
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">the</motion.span>
            <br />
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">World</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">of</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-4">Digital</motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="inline-block">Displays</motion.span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
};

export const DisplayTechSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  return (
    <section ref={ref} className="section-dark display-tech-section">
      <div className="tech-content-wrapper">
        <motion.div 
          className="tech-text-box"
          whileHover={{ scale: 1.02, backgroundColor: "rgba(15, 23, 42, 0.9)" }}
          transition={{ duration: 0.4 }}
        >
          <FadeInText direction="right">
          <Zap style={{ color: "#3b82f6", marginBottom: "1.5rem" }} size={40} />
            <p className="tech-description">
              <strong className="text-white">Dynamic Contrast and an IPS Panel Toughened glass</strong> with a viewing angle of 178 degrees. High Definition 768p in 32", Full HD 1080p in 43", and 4K screens in 43" and above sizes to provide a clear, crisp image.
            </p>
          </FadeInText>
        </motion.div>

        <div className="tech-image-wrapper">
           <motion.img 
             src={standeeExploded} 
             alt="Display Tech Close up" 
             style={{ y, scale }} 
             className="tech-image parallax-img"
           />
           <div className="tech-image-overlay"></div>
           {/* Scanning Line Animation */}
           <motion.div 
             className="scanning-line"
             animate={{ top: ["-10%", "110%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           />
        </div>
      </div>
    </section>
  );
};

export const AutonomousSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section ref={ref} className="section-light autonomous-section relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="animated-grid-bg"></div>

      <motion.div style={{ scale, opacity }} className="section-container">
        <span className="section-subtitle text-dark-muted flex-center gap-2 mb-6">
          <Leaf size={18} style={{ color: "#10b981" }} />
          CAN SIGNAGE DISPLAY
        </span>
        
        <h2 className="section-title massive-text text-dark leading-tight">
          Fully <span className="italic font-light">Autonomous</span>, <br/>
          Uncompromisingly <br/>
          <span className="gradient-text-green inline-block hover-float">Sustainable</span>
        </h2>
      </motion.div>
    </section>
  );
};

export const ResolutionSection = () => {
  return (
    <section className="section-light resolution-section">
      <div className="section-container split-layout">
        <div className="split-left">
          <FadeInText direction="right">
            <span className="section-subtitle text-dark-muted flex items-center gap-2">
              <Maximize size={18} style={{ color: "#3b82f6" }}/>
              RESOLUTION REDEFINED
            </span>
          </FadeInText>
          
          <div className="stats-container">
            <FadeInText delay={0.2} direction="up">
              <div className="stat-item">
                <h3 className="stat-number text-dark">
                  <AnimatedCounter from={0} to={16.7} decimals={1} suffix="M" />
                </h3>
                <span className="stat-label">Colours</span>
              </div>
            </FadeInText>
            
            <motion.div 
              className="stat-divider"
              initial={{ height: 0 }}
              whileInView={{ height: 80 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            />
            
            <FadeInText delay={0.4} direction="up">
              <div className="stat-item">
                <h3 className="stat-number text-dark">
                  <AnimatedCounter from={0} to={380} decimals={0} suffix="Nits" duration={2} />
                </h3>
                <span className="stat-label">LED Brightness</span>
              </div>
            </FadeInText>
          </div>

          <FadeInText delay={0.5}>
            <p className="description-text text-dark-muted mt-4">
              Experience the full potential of high-definition display screens with a myriad of benefits. Dive into the world of 4K, where colors come to life with unrivaled crispness. A superior contrast ratio ensures a brighter display even from a distance.
            </p>
          </FadeInText>

          <FadeInText delay={0.6}>
            <motion.button 
              className="link-button mt-6 text-dark"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              READ MORE <ArrowRight size={18} />
            </motion.button>
          </FadeInText>
        </div>
        
        <div className="split-right flex-center relative">
          {/* Main Floating Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
          >
            <motion.img 
              src={heroImg} 
              alt="Displays Group" 
              className="floating-group-img"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          {/* Decorative rotating dashed circle behind image */}
          <motion.div 
            className="decorative-circle"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
};

export const ControlCenterSection = () => {
  return (
    <section className="section-light control-center-section relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="cloud-bg-animated pointer-events-none"></div>

      <div className="section-container split-layout reverse-on-mobile">
        
        <div className="split-left flex-center position-relative z-10">
            <div className="mockup-container">
               {/* Laptop Animation */}
               <motion.div 
                 className="laptop-mockup"
                 initial={{ opacity: 0, y: 50, rotateX: 20 }}
                 whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                 transition={{ duration: 0.8, type: "spring" }}
                 viewport={{ once: true, margin: "-100px" }}
               >
                  <div className="laptop-screen">
                     <img src="/fluid_screen.jpg" alt="IQ World Dashboard" className="screen-content" />
                     
                     <motion.div 
                        className="dashboard-ui-overlay"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
                     >
                        <motion.div variants={{ hidden: {opacity:0, x:-20}, visible: {opacity:1, x:0} }} className="sidebar">
                          <LayoutGrid size={24}/>
                        </motion.div>
                        <div className="main-panel">
                           <motion.div variants={{ hidden: {opacity:0, y:20}, visible: {opacity:1, y:0} }} className="card"></motion.div>
                           <motion.div variants={{ hidden: {opacity:0, y:20}, visible: {opacity:1, y:0} }} className="card"></motion.div>
                           <motion.div variants={{ hidden: {opacity:0, scale:0.9}, visible: {opacity:1, scale:1} }} className="card wide"></motion.div>
                        </div>
                     </motion.div>

                  </div>
                  <div className="laptop-base"></div>
               </motion.div>
               
               {/* Phone Animation */}
               <motion.div 
                 className="phone-mockup"
                 initial={{ y: 100, opacity: 0, x: 50 }}
                 whileInView={{ y: 0, opacity: 1, x: 0 }}
                 transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
                 viewport={{ once: true }}
               >
                  <div className="phone-screen">
                    <div className="notch"></div>
                    <img src="/fluid_screen.jpg" alt="Mobile App" className="screen-content" />
                    
                    <motion.div 
                      className="mobile-ui-overlay"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{ visible: { transition: { staggerChildren: 0.2, delayChildren: 1 } } }}
                    >
                       <motion.div variants={{ hidden: {opacity:0, y:-10}, visible: {opacity:1, y:0} }} className="header"></motion.div>
                       <motion.div variants={{ hidden: {opacity:0, x:-20}, visible: {opacity:1, x:0} }} className="list-item"></motion.div>
                       <motion.div variants={{ hidden: {opacity:0, x:20}, visible: {opacity:1, x:0} }} className="list-item"></motion.div>
                       
                       {/* FAB pulsing */}
                       <motion.div 
                         className="fab"
                         variants={{ hidden: {scale:0}, visible: {scale:1} }}
                         animate={{ boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0.4)", "0px 0px 20px rgba(59, 130, 246, 0.8)", "0px 0px 0px rgba(59, 130, 246, 0.4)"] }}
                         transition={{ duration: 2, repeat: Infinity }}
                       ></motion.div>
                    </motion.div>
                  </div>
               </motion.div>
            </div>
        </div>

        <div className="split-right z-10">
          <FadeInText>
            <span className="section-subtitle text-dark-muted">FEATURE RICH CONTROL CENTER</span>
          </FadeInText>
          
          <FadeInText delay={0.1}>
            <h2 className="section-title text-dark mb-1">
              IQ World <span className="subtitle-inline gradient-text-blue">Display Screen Control App</span>
            </h2>
          </FadeInText>
          
          <motion.div 
            className="title-divider mb-6 mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>

          <FadeInText delay={0.4}>
            <p className="description-text text-dark-muted mb-6">
              Introducing the IQ World app, a cloud-based powerhouse that transforms your CAN Display into a centralized control hub. Monitor multiple screens effortlessly from a single point, giving you unparalleled control. Enjoy schedule management, split-screen options, text scrolling, inbuilt image and video editing, and more.
            </p>
          </FadeInText>

          <FadeInText delay={0.5}>
            <motion.a 
              href="https://play.google.com/store/apps/details?id=com.iqw.iqworld_mobile&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-download inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              DOWNLOAD APP <ArrowRight size={18} />
            </motion.a>
          </FadeInText>
        </div>

      </div>
    </section>
  );
};

export const BlogSection = () => {
  const blogs = [
    { title: "The Future of Digital Signage in Retail Environments", category: "Insights", image: "/circuit_board.jpg" },
    { title: "How 4K LED Walls Transform Corporate Boardrooms", category: "Case Study", image: "/fluid_screen.jpg" },
    { title: "Sustainable Displays: Saving Energy & Money Long Term", category: "Environment", image: standeeExploded },
  ];

  return (
    <section className="section-dark blog-section relative">
      <div className="section-container">
        <FadeInText>
          <div className="flex-between mb-10">
            <h2 className="section-title">Latest <span className="text-muted">News & Insights</span></h2>
            <motion.button 
              className="btn-explore-outline"
              whileHover={{ backgroundColor: "white", color: "black" }}
            >
              View all articles
            </motion.button>
          </div>
        </FadeInText>

        <div className="blog-grid">
          {blogs.map((blog, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full"
            >
              <motion.div 
                className="blog-card"
                whileHover={{ y: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="blog-image-container">
                  <motion.img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="blog-image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="blog-category">{blog.category}</span>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title line-clamp-2">{blog.title}</h3>
                  <motion.button 
                    className="blog-read-more"
                    whileHover={{ gap: "1rem" }}
                  >
                    Read Article <ArrowRight size={14}/>
                  </motion.button>
                </div>
                {/* Animated Gradient Border on Hover */}
                <div className="blog-card-border"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
