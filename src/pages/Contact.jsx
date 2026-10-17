import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import malaysiaImg from '../assets/CANCANMalasiaDistributor.avif';
import singaporeImg from '../assets/CANSingaporeDistributor.avif';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const modelParam = searchParams.get('model');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    models: modelParam ? [modelParam] : []
  });

  const modelsList = [
    'CAN', 'CANLit', 'CANVue',
    'CANWid', 'CANMount', 'CANNX',
    'CANDesk', 'CANDeskTent', 'CANDeskWid',
    'CANDiskTab', 'CANDiskMount'
  ];

  useEffect(() => {
    if (modelParam && modelsList.includes(modelParam)) {
      setFormData(prev => ({
        ...prev,
        models: prev.models.includes(modelParam) ? prev.models : [...prev.models, modelParam]
      }));
    }
  }, [modelParam]);

  const handleCheckboxChange = (model) => {
    setFormData(prev => {
      const isSelected = prev.models.includes(model);
      if (isSelected) {
        return { ...prev, models: prev.models.filter(m => m !== model) };
      } else {
        return { ...prev, models: [...prev.models, model] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.target;
    const data = new FormData(form);
    
    // Replace this URL with your actual Formspree endpoint URL
    const FORMSPREE_URL = 'https://formspree.io/f/xnpjvdnz';

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        setFormData({ models: [] }); // Reset checkboxes
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#06070a] border-b border-white/5 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 -right-24 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-10 -left-24 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white leading-[1.08] mb-8">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base text-gray-400 font-semibold uppercase tracking-widest leading-relaxed max-w-lg">
              REACH OUT, SHARE A QUESTION OR PROVIDE FEEDBACK ON OUR PRODUCTS. FILL OUT THE FORM AND WE'LL RESPOND AS SOON AS POSSIBLE.
            </p>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL DISTRIBUTORS */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#050505] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              International Distributors
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed max-w-xl">
              "We are thrilled to welcome you as a distributor! Your commitment and dedication to our products are invaluable, and we're excited to achieve even greater success together"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Malaysia */}
            <div className="group flex flex-col gap-6">
              <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-black border border-white/10 relative">
                <img src={malaysiaImg} alt="Malaysia Distributor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-cyan-400 transition-colors">
                Sorab Enterprise Sdn Bhd, Malaysia
              </h3>
            </div>

            {/* Singapore */}
            <div className="group flex flex-col gap-6">
              <div className="w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-black border border-white/10 relative">
                <img src={singaporeImg} alt="Singapore Distributor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-cyan-400 transition-colors">
                Sorab Enterprise Pte Ltd, Singapore
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-24 bg-[#06070a] relative">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-[32px] p-8 sm:p-12 md:p-16 backdrop-blur-xl shadow-2xl">
          
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            
            {/* Name Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">First name <span className="text-cyan-400">*</span></label>
                <input type="text" name="firstName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Last name <span className="text-cyan-400">*</span></label>
                <input type="text" name="lastName" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Email <span className="text-cyan-400">*</span></label>
              <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600" />
            </div>

            {/* Company & Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Company Name</label>
                <input type="text" name="company" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600" />
              </div>
              <div className="flex flex-col gap-2.5">
                <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Designation</label>
                <input type="text" name="designation" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600" />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Phone <span className="text-cyan-400">*</span></label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Globe size={18} />
                </div>
                <input type="tel" name="phone" required className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600" />
              </div>
            </div>

            {/* Type of Inquiry */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Type of inquiry</label>
              <select name="inquiryType" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all appearance-none cursor-pointer">
                <option value="" className="bg-gray-900">Select inquiry type</option>
                <option value="sales" className="bg-gray-900">Sales</option>
                <option value="support" className="bg-gray-900">Support</option>
                <option value="partnership" className="bg-gray-900">Partnership</option>
                <option value="other" className="bg-gray-900">Other</option>
              </select>
            </div>

            {/* CAN Models Checkboxes */}
            <div className="flex flex-col gap-4 mt-4">
              <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Select CAN Model <span className="text-cyan-400">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {modelsList.map(model => (
                  <label key={model} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-black group-hover:border-cyan-400 transition-colors">
                      <input 
                        type="checkbox" 
                        name="models[]"
                        value={model}
                        className="peer appearance-none w-full h-full cursor-pointer absolute inset-0 z-10" 
                        onChange={() => handleCheckboxChange(model)}
                        checked={formData.models.includes(model)}
                      />
                      <div className="w-3 h-3 bg-cyan-400 rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{model}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2.5 mt-4">
              <label className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-400">Message</label>
              <textarea 
                name="message"
                rows="5" 
                placeholder="Write your message here"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none"
              ></textarea>
            </div>

            {/* Submit Button & Status */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-medium">
                {status === 'success' && <span className="text-green-400">Message sent successfully! We'll get back to you soon.</span>}
                {status === 'error' && <span className="text-red-400">Something went wrong. Please try again.</span>}
              </div>
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-semibold tracking-widest uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span>{status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>

        </div>
      </section>

    </div>
  );
};

export default Contact;
