import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/can logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Top Section: Grid of Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-24">
          
          {/* Column 1: Logo */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img src={logo} alt="CAN Logo" className="h-10 w-auto object-contain" />
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</Link>
            <Link to="/technology" className="text-gray-400 hover:text-white text-sm transition-colors">Technology</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link>
          </div>

          {/* Column 3: Terms & Policies */}
          <div className="flex flex-col gap-3">
            <Link to="/can-terms" className="text-gray-400 hover:text-white text-sm transition-colors">CAN T&C</Link>
            <Link to="/warranty-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Warranty Policy</Link>
            <div className="h-4"></div> {/* Spacer */}
            <Link to="/iq-world-terms" className="text-gray-400 hover:text-white text-sm transition-colors">IQ World T&C</Link>
            <Link to="/technical-requirements" className="text-gray-400 hover:text-white text-sm transition-colors">Technical Requirement</Link>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-2">SOCIAL</h4>
            <a href="https://www.facebook.com/profile.php?id=61557902141460" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">Facebook</a>
            <a href="https://www.instagram.com/cansignage/" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">Instagram</a>
            <a href="https://www.youtube.com/@cansignage" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">YouTube</a>
            <a href="https://www.linkedin.com/company/can-signage/" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">LinkedIn</a>
            <a href="https://x.com/cansignage_/status/2081997355738358122" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">X</a>
          </div>

          {/* Column 5: Contact */}
          <div className="flex flex-col gap-3 lg:col-span-1">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-2">CONTACT</h4>
            <a href="mailto:sales@cansignage.com" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4 mb-2">sales@cansignage.com</a>
            <p className="text-gray-400 text-sm">Tel: +91 91523 98498</p>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              1st Floor, Bldg No. A4, Babosa Industrial Park, Saravali<br />
              Village, Nashik-Mumbai Highway Bhiwandi,<br />
              Maharashtra - 421302
            </p>
          </div>

        </div>

        {/* Bottom Section: Copyright, BIS Certification & Made in Bharat */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Lumocast Digital Signage Pvt. Ltd.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-gray-400 bg-white/[0.04] border border-white/10 px-3.5 py-1 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              BIS: R-XXXX0860
            </span>
            <span className="text-xs font-medium text-gray-400 bg-white/[0.04] border border-white/10 px-3.5 py-1 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Made in Bharat
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
