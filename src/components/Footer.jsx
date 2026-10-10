import React from 'react';
import logo from '../assets/can logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        
        {/* Top Section: Grid of Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-24">
          
          {/* Column 1: Logo */}
          <div className="lg:col-span-1">
            <img src={logo} alt="CAN Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-3">
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
            <a href="/technology" className="text-gray-400 hover:text-white text-sm transition-colors">Technology</a>
            <a href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>

          {/* Column 3: Terms & Policies */}
          <div className="flex flex-col gap-3">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">CAN T&C</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Warranty Policy</a>
            <div className="h-4"></div> {/* Spacer */}
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">IQ World T&C</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Technical Requirement</a>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-2">SOCIAL</h4>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors underline decoration-gray-600 underline-offset-4">YouTube</a>
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

        {/* Bottom Section: Copyright */}
        <div className="pt-8">
          <p className="text-gray-500 text-sm">
            © 2025 Lumocast Digital Signage Pvt. Ltd.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
