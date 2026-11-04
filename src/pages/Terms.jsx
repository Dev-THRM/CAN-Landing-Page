import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Check, 
  X, 
  Sparkles, 
  Clock, 
  Layers, 
  Cpu, 
  Lock, 
  RefreshCw, 
  Info, 
  ArrowRight,
  Monitor,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const Terms = ({ defaultTab = 'iq-world' }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Check URL search params (e.g. ?tab=warranty) or props
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location, defaultTab]);

  const tabs = [
    { id: 'iq-world', label: 'IQ World T&C', badge: 'Software License' },
    { id: 'can-tc', label: 'CAN T&C', badge: 'Commercial' },
    { id: 'warranty', label: 'Warranty Policy', badge: '1-Year Onsite' },
    { id: 'technical', label: 'Technical Requirements', badge: 'Specifications' }
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-hidden">
      
      {/* HERO / HEADER SECTION */}
      <section className="relative pt-32 pb-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#06070a] border-b border-white/5 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 -right-24 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 -left-24 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-6 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            POLICIES & LEGAL
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.1] mb-6">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Transparent licensing, hardware guidelines, and warranty terms for Lumocast Digital Signage Pvt. Ltd. and the IQ World cloud ecosystem.
          </p>

          {/* TAB BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                    isActive
                      ? 'bg-white !text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.3)] scale-[1.02]'
                      : 'bg-white/[0.04] text-gray-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-black/10 !text-black font-bold' : 'bg-white/10 text-gray-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#050505] relative">
        <div className="max-w-5xl mx-auto relative z-10">

          {/* TAB 1: IQ WORLD TERMS & CONDITIONS */}
          {activeTab === 'iq-world' && (
            <div className="space-y-12">
              
              {/* Highlight Card: 1 Year Complimentary Basic Software License */}
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-950/40 via-[#0b1220]/70 to-[#06080e]/95 border-2 border-cyan-500/40 p-8 sm:p-12 shadow-[0_20px_80px_rgba(6,182,212,0.15)]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-mono font-semibold tracking-wider uppercase border border-cyan-400/30 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-cyan-400" />
                      SPECIAL LICENSE CONDITION
                    </span>
                    <span className="text-xs font-mono text-gray-400">Section 3.1 • Software Grant</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4">
                    1 Year Complimentary <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">IQ World Basic Software</span>
                  </h2>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    For 1 year, you will get the software complementary but only the basic version. The Pro version is also available with more advanced features.
                  </p>

                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3.5">
                    <Info size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed m-0">
                      <strong>Pro Version Available:</strong> For 1 year, you will get the software complementary but only the basic version. The Pro version is also available with more advanced features: Device Analytics, Screen Time Report, OTP authentication while uploading the new content, Intelligent Split Screen, On Demand Screen Orientation, and IQ Editor (In-Built Editor for editing text, image & video content).
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic vs Pro Feature Comparison Matrix */}
              <div className="rounded-[28px] sm:rounded-[32px] bg-white/[0.02] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light text-white">
                      Difference in <span className="font-semibold text-white">Basic and PRO Version</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      For 1 year, you will get the software complementary but only the basic version. The Pro version is also available with more advanced features.
                    </p>
                  </div>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.iqw.iqworld_mobile&hl=en_IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all duration-300 w-fit"
                  >
                    <span>Get IQ World App</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#2b8fda]/40 bg-[#070b14] shadow-xl max-w-3xl mx-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#2b8fda] text-white">
                        <th className="py-3.5 px-5 font-semibold text-sm sm:text-base">List of Features</th>
                        <th className="py-3.5 px-4 font-semibold text-center w-28 sm:w-36 border-l border-white/20 text-sm sm:text-base">
                          Basic
                        </th>
                        <th className="py-3.5 px-4 font-bold text-center w-28 sm:w-36 border-l border-white/20 text-sm sm:text-base">
                          PRO
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-gray-200">
                      {[
                        { name: 'Customer Registration', basic: true, pro: true },
                        { name: 'Customer Detailed Report', basic: true, pro: true },
                        { name: 'Playlist Management', basic: true, pro: true },
                        { name: 'Schedule Management', basic: true, pro: true },
                        { name: 'Devices Management', basic: true, pro: true },
                        { name: 'Text Scroller / URL / PDF', basic: true, pro: true },
                        { name: 'YouTube URL Link Upload', basic: true, pro: true },
                        { name: 'PDF Upload', basic: true, pro: true },
                        { name: 'Remote Devices Power On/Off', basic: true, pro: true },
                        { name: 'Device Analytics', basic: false, pro: true },
                        { name: 'Screen Time Report', basic: false, pro: true },
                        { name: 'OTP authentication while uploading the new content', basic: false, pro: true },
                        { name: 'Intelligent Split Screen', basic: false, pro: true },
                        { name: 'On Demand Screen Orientation', basic: false, pro: true },
                        { name: 'IQ Editor (In-Built Editor for editing text, image & video content)', basic: false, pro: true },
                        { name: 'Technical Support', basic: true, pro: true },
                      ].map((feature, idx) => (
                        <tr 
                          key={idx}
                          className={`transition-colors ${!feature.basic ? 'bg-cyan-500/[0.03]' : 'hover:bg-white/[0.02]'}`}
                        >
                          <td className="py-3 px-5 font-medium text-white text-xs sm:text-sm">
                            {feature.name}
                          </td>
                          <td className="py-3 px-4 text-center border-l border-white/10">
                            {feature.basic ? (
                              <Check size={18} className="text-cyan-400 mx-auto" />
                            ) : (
                              <span className="inline-block w-4 h-4"></span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center border-l border-white/10">
                            {feature.pro && (
                              <Check size={18} className="text-cyan-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detailed Terms Articles */}
              <div className="space-y-8 text-gray-300 leading-relaxed font-light">
                
                {/* 1. Acceptance */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">1. Scope & Acceptance of Terms</h3>
                  <p className="text-sm">
                    By accessing, downloading, registering, or operating the <strong>IQ World India Ka IQ Application</strong> ("Software", "Service") across mobile, desktop, or CAN Digital Signage display hardware, you agree to comply with and be bound by these Terms & Conditions. These terms apply to all registered accounts, enterprise administrators, and authorized network operators.
                  </p>
                </div>

                {/* 2. Complimentary Period */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">2. Complimentary Software Period (1 Year)</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>
                      <strong>1 Year Complimentary Basic License:</strong> For 1 year, you will get the software complementary but only the basic version.
                    </li>
                    <li>
                      <strong>Scope of Basic Version:</strong> The complimentary basic version includes Customer Registration, Customer Detailed Report, Playlist Management, Schedule Management, Devices Management, Text Scroller / URL / PDF, YouTube URL Link Upload, PDF Upload, Remote Devices Power On/Off, and Technical Support.
                    </li>
                    <li>
                      <strong>Pro Version Available:</strong> The Pro version is also available with more advanced features.
                    </li>
                  </ul>
                </div>

                {/* 3. Pro Version Upgrade */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">3. Pro Version Availability & Advanced Features</h3>
                  <p className="text-sm mb-4">
                    For 1 year, you will get the software complementary but only the basic version. The Pro version is also available with more advanced features:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>Device Analytics</strong></li>
                    <li><strong>Screen Time Report</strong></li>
                    <li><strong>OTP authentication while uploading the new content</strong></li>
                    <li><strong>Intelligent Split Screen</strong></li>
                    <li><strong>On Demand Screen Orientation</strong></li>
                    <li><strong>IQ Editor (In-Built Editor for editing text, image & video content)</strong></li>
                  </ul>
                </div>

                {/* 4. Renewal & Post-Year Terms */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">4. Renewal Terms & Post-Year Continuity</h3>
                  <p className="text-sm">
                    Prior to the expiration of the complimentary 1-year Basic tier, account administrators will receive automated notifications detailing renewal options. Users may renew the Basic cloud hosting or elect annual/multi-year Pro subscription contracts. In the event an account is not renewed, basic hardware media playback via local USB/HDMI remains functional, but remote cloud orchestration and fleet sync services will pause.
                  </p>
                </div>

                {/* 5. User Responsibilities & Acceptable Content */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">5. User Content, Storage & Compliance</h3>
                  <p className="text-sm">
                    Customers are solely responsible for the legality, intellectual property clearance, and broadcast compliance of all multimedia uploaded to the IQ World cloud. Transmitting unlawful, defamatory, infringing, or inappropriate material through public digital displays is strictly prohibited and subject to immediate account revocation.
                  </p>
                </div>

                {/* 6. Technical Support */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">6. Over-the-Air Updates & Technical Support</h3>
                  <p className="text-sm">
                    Lumocast provides ongoing Over-The-Air (OTA) firmware and software updates to ensure optimal security and compatibility. Both Basic and Pro users are supported through our centralized support desk at <a href="mailto:support@cansignage.com" className="text-cyan-400 underline">support@cansignage.com</a> and telephone helpline <strong>+91 91523 98498</strong>.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: CAN HARDWARE T&C */}
          {activeTab === 'can-tc' && (
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/10">
                <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  CAN Hardware <span className="font-semibold text-white">Terms of Sale & Deployment</span>
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Governing all commercial transactions, delivery, and hardware installation of CAN Digital Signage units.
                </p>

                <div className="space-y-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-1">1. Commercial Hardware Orders</h4>
                    <p>All hardware purchase orders for CAN freestanding standees (CAN / CANLit), wall-mount models (CANMount / CAN H-Mount), caster units (CANVue — wheels available for 43", 50", 55", 65", 75", and 86"; wheels are not provided in 32"), and desktop series (CANDesk) are subject to written confirmation by Lumocast Digital Signage Pvt. Ltd.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">2. Delivery & Freight</h4>
                    <p>CAN displays are crated in industrial-grade, drop-tested protective packaging. Risk of loss passes to the purchaser upon dispatch or upon delivery by our authorized logistics partner. Inspection for transit damage must be noted on the receipt bill within 48 hours of delivery.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">3. Installation & Power Standards</h4>
                    <p>Installations must follow provided engineering guidelines. Freestanding kiosks must sit on stable flat flooring. Wall mounts must be anchored into reinforced studs or concrete masonry. Displays must be connected to surge-protected, grounded power points (110V - 240V AC, 50/60 Hz).</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">4. Ownership & Intellectual Property</h4>
                    <p>All CAN industrial chassis designs, thermal management systems, and proprietary hardware enclosures are the registered intellectual property of Lumocast Digital Signage Pvt. Ltd. Unauthorized reverse engineering or replication is strictly prohibited.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WARRANTY POLICY */}
          {activeTab === 'warranty' && (
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Shield size={24} />
                  </span>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">Official LUMOCAST Policy</span>
                    <h2 className="text-2xl sm:text-4xl font-light text-white">Warranty & Platform Policy</h2>
                  </div>
                </div>

                <div className="space-y-6 text-sm">
                  {/* 1. Warranty & Platform Registration */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                      <Clock size={18} className="text-cyan-400" />
                      1. Warranty & Platform Registration
                    </h3>
                    <ul className="space-y-2.5 text-xs text-gray-300">
                      <li>• <strong>Mandatory Registration Period:</strong> Mandatory registration must be completed within 7 days from the date of purchase.</li>
                      <li>• <strong>Late Fee & Restrictions:</strong> Failure to register within the stipulated 7 days will result in additional monthly late fees, and online system usage will be restricted.</li>
                      <li>• <strong>IQ World Platform Renewal:</strong> Upon expiration of the IQ World Platform subscription, clients may renew by choosing a suitable service package and paying the prescribed fee.</li>
                      <li>• <strong>Discontinuation of Service:</strong> Clients must note that online media playback on the platform will be automatically discontinued upon subscription expiry until renewed.</li>
                      <li>• <strong>Registration Process:</strong> Customers can complete registration on our official website, via QR code, or by contacting customer support with their original tax invoice and device serial number.</li>
                    </ul>
                  </div>

                  {/* 2. Warranty Coverage & Duration */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                      <Shield size={18} className="text-cyan-400" />
                      2. Warranty Coverage & Duration
                    </h3>
                    <ul className="space-y-2.5 text-xs text-gray-300">
                      <li>• <strong>Limited Warranty:</strong> LUMOCAST provides a limited warranty for Digital Signage Displays for a period of 1 Years starting from the date of original purchase.</li>
                      <li>• <strong>Proof of Eligibility:</strong> A valid Tax Invoice and successful Warranty Registration are strictly required to claim warranty benefits.</li>
                    </ul>
                  </div>

                  {/* 3. What is Covered & 4. What is Not Covered Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 3. What is Covered */}
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                      <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-400" />
                        3. What is Covered
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">This warranty covers hardware and technical failures occurring under normal operating conditions, including:</p>
                      <ul className="space-y-2 text-xs text-gray-300">
                        <li>• <strong>Manufacturing Defects:</strong> Defects arising from faulty materials or manufacturing processes.</li>
                        <li>• <strong>Core Hardware Components:</strong> Display Panel, Power Supply Unit (PSU), Motherboard, Controller Board, and Internal Wiring.</li>
                        <li>• <strong>Operational Failures:</strong> Unforeseen electronic or mechanical failures during standard operation.</li>
                        <li>• <strong>Service & Repair:</strong> Defective parts will be repaired or replaced free of charge after verification by authorized technical personnel.</li>
                      </ul>
                    </div>

                    {/* 4. What is Not Covered (Exclusions) */}
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                      <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-400" />
                        4. What is Not Covered (Exclusions)
                      </h3>
                      <p className="text-xs text-gray-400 mb-3">The following circumstances and conditions are strictly excluded from warranty coverage:</p>
                      <ul className="space-y-2 text-xs text-gray-300">
                        <li>• <strong>Physical Damage:</strong> Damage caused by physical impacts, dropping, transportation accidents, or cracked/broken screens.</li>
                        <li>• <strong>Environmental & Natural Disasters:</strong> Damage resulting from floods, earthquakes, lightning strikes, fire, extreme weather, or condensation.</li>
                        <li>• <strong>Electrical Failures:</strong> Damage caused by high/low voltage fluctuations, improper electrical grounding (earthing), or power surges.</li>
                        <li>• <strong>Improper Usage & Installation:</strong> Outdoor usage of indoor models, failure to follow user manual instructions, or improper installation by unauthorized personnel.</li>
                        <li>• <strong>Liquid Damage:</strong> Damage caused by water or any liquid entering the device casing.</li>
                        <li>• <strong>Unauthorized Modifications:</strong> Tampering, opening the outer casing, or unauthorized repair attempts by anyone other than certified LUMOCAST technicians immediately voids the warranty.</li>
                        <li>• <strong>Serial Number & Seal:</strong> Alteration, removal, or defacing of the original warranty seal or serial number sticker.</li>
                        <li>• <strong>Normal Wear & Tear:</strong> Minor brightness reduction over extended usage, natural color shifting, or static image burn-in.</li>
                      </ul>
                    </div>
                  </div>

                  {/* 5. Software & Content Disclaimer */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                      <Info size={18} className="text-cyan-400" />
                      5. Software & Content Disclaimer
                    </h3>
                    <ul className="space-y-2.5 text-xs text-gray-300">
                      <li>• This warranty is strictly limited to hardware components only.</li>
                      <li>• LUMOCAST is not responsible for third-party software, applications, operating system bugs, or media player software glitches.</li>
                      <li>• LUMOCAST assumes no liability for the protection, backup, or recovery of content, media files, or data displayed on the screen.</li>
                    </ul>
                  </div>

                  {/* 6. Warranty Claim & Service Process */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                      <RefreshCw size={18} className="text-cyan-400" />
                      6. Warranty Claim & Service Process
                    </h3>
                    <ol className="space-y-2.5 text-xs text-gray-300 list-decimal pl-5">
                      <li><strong>Ticket Logging:</strong> Upon experiencing a defect, customers must log a service ticket with customer support providing the tax invoice, serial number, and photo/video evidence of the issue.</li>
                      <li><strong>Technical Inspection:</strong> Our technical team will first conduct a remote evaluation or schedule an inspection.</li>
                      <li><strong>Service Delivery:</strong> On-site service is provided in designated regions. For carry-in/RTV service, packaging and transportation costs/risk rest with the customer.</li>
                    </ol>
                  </div>

                  {/* 7. Limitation of Liability */}
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                      <Lock size={18} className="text-cyan-400" />
                      7. Limitation of Liability
                    </h3>
                    <ul className="space-y-2.5 text-xs text-gray-300">
                      <li>• LUMOCAST shall not be legally liable for any indirect, incidental, or consequential business losses, downtime costs, or loss of profits arising from device failure or service suspension.</li>
                      <li>• The maximum financial liability of LUMOCAST under this warranty is strictly limited to the original purchase price of the product.</li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 4: TECHNICAL REQUIREMENTS */}
          {activeTab === 'technical' && (
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
              <div className="p-8 sm:p-12 rounded-[32px] bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Cpu size={24} />
                  </span>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-blue-400">Operational Specifications</span>
                    <h2 className="text-2xl sm:text-4xl font-light text-white">Technical Requirements</h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-300 mb-8">
                  Recommended network infrastructure, operating system environments, and power parameters for uninterrupted operation of CAN displays and the IQ World cloud platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Monitor size={18} className="text-cyan-400" />
                      Display Resolutions & Standards
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li>• <strong>HD Standard:</strong> 768 × 1366 pixels (32" CAN, CANLit, CANVue 3201 — without wheels)</li>
                      <li>• <strong>Full HD (FHD):</strong> 1080 × 1920 pixels (43" CAN Pro, CANLit Pro, CANVue Pro 4301 — with wheels)</li>
                      <li>• <strong>4K Ultra HD:</strong> 2160 - 3840 pixels (50", 55", 65", 75", 86", 98" CAN models; CANVue 50", 55", 65", 75", 86" with wheels)</li>
                      <li>• <strong>Aspect Ratio:</strong> 9:16 Portrait / 16:9 Landscape Native</li>
                      <li>• <strong>Panel:</strong> Commercial A+ Grade IPS, 178°/178° viewing angle, 300 - 380 Nits</li>
                      <li>• <strong>Manufacturing:</strong> Designed & Made in Bharat</li>
                      <li>• <strong>BIS Certification:</strong> Bureau of Indian Standards Certified (Reg. No. R-XXXX0860)</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Layers size={18} className="text-cyan-400" />
                      Network & Connectivity
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li>• <strong>Wi-Fi:</strong> 2.4 GHz & 5.0 GHz 802.11 b/g/n dual-band wireless</li>
                      <li>• <strong>LAN:</strong> RJ-45 Ethernet 10/100/1000 Mbps port</li>
                      <li>• <strong>Cellular (Optional):</strong> 4G / 5G SIM card slot expansion module</li>
                      <li>• <strong>Recommended Bandwidth:</strong> Minimum 5 Mbps per display for seamless 4K asset sync</li>
                      <li>• <strong>Offline Caching:</strong> Integrated local storage continues playback during dropouts</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <RefreshCw size={18} className="text-cyan-400" />
                      Supported Media Formats
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li>• <strong>Video:</strong> MP4, AVI, MKV, MOV, H.264, H.265 (HEVC) up to 4K @ 60fps</li>
                      <li>• <strong>Image:</strong> JPEG, PNG, WEBP, AVIF, GIF with alpha transparency</li>
                      <li>• <strong>Documents & Web:</strong> PDF pagination, Web URLs (HTTP/HTTPS), YouTube streams</li>
                      <li>• <strong>Audio:</strong> Dual 10W stereo built-in speakers (AAC / MP3 / WAV)</li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Lock size={18} className="text-cyan-400" />
                      Operating System & Software
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li>• <strong>Client Displays:</strong> CAN Signage OS (Android 11+ Commercial Core)</li>
                      <li>• <strong>Management Console:</strong> Modern web browsers (Chrome, Edge, Safari, Firefox)</li>
                      <li>• <strong>Mobile Companion App:</strong> Android (Google Play Store) and iOS (Apple App Store)</li>
                      <li>• <strong>Desktop Client:</strong> Available for Windows 10/11 and macOS</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* FOOTER CTA BAR */}
      <section className="py-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#08090d] border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Have questions about IQ World or CAN terms?</h3>
            <p className="text-xs text-gray-400">Our commercial enterprise team is available to help customize terms or plan your deployment.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-cyan-400 !text-black hover:bg-white hover:!text-black hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
            >
              <span>Contact Support</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Terms;

