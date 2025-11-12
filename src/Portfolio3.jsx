import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, Award, User, FolderGit2, ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, Globe, CheckCircle, Star, Rocket, Code, Briefcase, Terminal, Database, Layers } from 'lucide-react';

const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Loader = ({ loading }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [loading]);
  
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <div className="relative mb-8">
        <div className="w-40 h-40 relative">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: ['#d97706', '#f59e0b', '#fbbf24'][i],
                animationDuration: `${1.5 + i * 0.5}s`,
                animationDelay: `${i * 0.2}s`,
                transform: `scale(${1 - i * 0.2})`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-amber-600 animate-pulse" size={48} />
        </div>
      </div>
      
      <div className="w-64 mb-4">
        <div className="h-2 bg-amber-200 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 transition-all duration-300 shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
        {progress}%
      </div>
      <div className="text-sm text-amber-700 mt-2 font-medium">Crafting Excellence...</div>
    </div>
  );
};

const GoldenParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse opacity-30"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${['#fbbf24', '#f59e0b', '#d97706'][i % 3]} 0%, transparent 70%)`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${10 + Math.random() * 15}s`,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${['#fbbf24', '#f59e0b', '#d97706'][i % 3]}`
          }}
        />
      ))}
    </div>
  );
};

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ];
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`absolute inset-0 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-amber-500/10 border-b border-amber-200/50' : 'bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm'}`} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="relative group cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
            <div className="relative text-3xl font-black bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              AC
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`group relative px-6 py-3 rounded-full transition-all duration-500 font-semibold ${
                  activeSection === id ? 'text-white' : 'text-amber-800 hover:text-amber-600'
                }`}
              >
                {activeSection === id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/50" />
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full blur opacity-60" />
                  </>
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 shadow-lg"
          >
            {isOpen ? <X size={24} className="text-amber-700" /> : <Menu size={24} className="text-amber-700" />}
          </button>
        </div>
        
        {isOpen && (
          <div className="lg:hidden mt-4 p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200 shadow-2xl">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full px-6 py-4 rounded-2xl mb-2 transition-all duration-300 font-semibold ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                    : 'text-amber-800 hover:bg-amber-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  const [ref, inView] = useInView();
  const roles = ['Frontend Architect', 'MERN Stack Engineer', 'React Specialist', 'Full Stack Developer'];
  const [currentRole, setCurrentRole] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <GoldenParticles />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div ref={ref} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="relative w-56 h-56 mx-auto mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full animate-spin shadow-2xl" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-2 bg-white rounded-full" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 flex items-center justify-center transform group-hover:scale-110 transition-all duration-700 shadow-xl border-4 border-amber-300/50">
              <div className="text-7xl font-black bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                AC
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-700" />
          </div>
          
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 shadow-lg">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-sm font-bold text-emerald-700">AVAILABLE FOR REMOTE OPPORTUNITIES</span>
              <Rocket className="text-emerald-600" size={18} />
            </div>
            
            <h1 className="relative">
              <div className="text-7xl sm:text-9xl font-black mb-4 tracking-tight">
                <span className="inline-block bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent hover:scale-105 transition-transform duration-500 cursor-default drop-shadow-lg">
                  Ajay Chirme
                </span>
              </div>
            </h1>
            
            <div className="flex items-center justify-center space-x-4 text-2xl">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <p className="text-amber-900 font-light">
                Crafting <span className="font-bold text-amber-600">scalable</span> & 
                <span className="font-bold text-yellow-600"> high-performance</span> web experiences
              </p>
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-amber-400 to-transparent" />
            </div>
            
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 shadow-xl">
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 bg-clip-text text-transparent transition-all duration-700">
                  {roles[currentRole]}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <a 
                href="#contact" 
                className="group relative px-12 py-5 rounded-full overflow-hidden font-black text-lg transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-amber-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <span className="relative flex items-center space-x-3 text-white">
                  <Zap size={24} />
                  <span>HIRE ME NOW</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#projects" 
                className="group relative px-12 py-5 rounded-full font-black text-lg border-2 border-amber-500 hover:border-yellow-500 transition-all duration-500 hover:scale-110 bg-white shadow-xl hover:shadow-2xl"
              >
                <span className="relative flex items-center space-x-3 text-amber-700 group-hover:text-yellow-700">
                  <FolderGit2 size={24} />
                  <span>VIEW PROJECTS</span>
                </span>
              </a>
              
              <button className="group relative px-12 py-5 rounded-full font-black text-lg border-2 border-amber-400 hover:border-amber-600 transition-all duration-500 hover:scale-110 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-xl hover:shadow-2xl">
                <span className="relative flex items-center space-x-3 text-amber-700">
                  <Download size={24} />
                  <span>DOWNLOAD CV</span>
                </span>
              </button>
            </div>
            
            <div className="flex justify-center space-x-6 pt-12">
              {[
                { icon: Mail, href: 'mailto:ajaychirme@gmail.com' },
                { icon: Github, href: 'https://github.com/ajaychirme' },
                { icon: Linkedin, href: 'https://linkedin.com/in/ajaychirme' }
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative p-5 rounded-2xl bg-white border-2 border-amber-300 hover:border-amber-500 hover:scale-125 transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  <Icon className="relative text-amber-600 group-hover:text-amber-700 transition-colors" size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="text-amber-700 text-sm mb-2 font-medium">Scroll to explore</div>
        <ChevronDown className="text-amber-600" size={32} />
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView();
  
  const stats = [
    { value: '4.5+', label: 'Years Experience', icon: TrendingUp, desc: 'Professional Development' },
    { value: '50+', label: 'Projects Completed', icon: Target, desc: 'Successful Deliveries' },
    { value: '10K+', label: 'Users Impacted', icon: Users, desc: 'Across Southeast Asia' },
    { value: '100%', label: 'Client Satisfaction', icon: Star, desc: 'Quality Guaranteed' }
  ];
  
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-amber-50/30 to-white">
      <GoldenParticles />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 mb-8 shadow-lg">
              <User className="text-amber-700" size={20} />
              <span className="text-sm font-bold text-amber-700 tracking-wider">KNOW MORE ABOUT ME</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                My Story
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 mx-auto rounded-full shadow-lg" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 transition-all duration-500 hover:scale-110 hover:-translate-y-4 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-amber-200 to-yellow-200 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <stat.icon className="text-amber-700" size={32} />
                  </div>
                  <div className="text-5xl font-black mb-3 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-lg font-bold text-amber-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-amber-700">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-6 mb-20">
            {[
              "Senior Frontend Developer with <strong>4.5 years of elite experience</strong> at <strong>FoodMarketHub, Singapore</strong>, specializing in building scalable, performance-optimized web applications that serve <strong>thousands of B2B users</strong> across Southeast Asia.",
              "Certified by <strong>Pesto Tech</strong> and holding <strong>4 Meta Professional Certificates</strong> (Frontend, Backend, Version Control, Advanced React) plus specialized Udemy certifications in modern web development.",
              "Passionate about <strong>React ecosystem, MERN stack, performance optimization, and design systems</strong>. Currently seeking <strong>remote opportunities in US/UK/Canada/Europe</strong> with innovative tech companies pushing boundaries."
            ].map((text, i) => (
              <div
                key={i}
                className="group p-10 rounded-3xl bg-gradient-to-br from-white to-amber-50/50 border-2 border-amber-200 hover:border-amber-400 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <p 
                  className="text-2xl text-amber-900 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: text.replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-amber-700 font-black">$1</strong>') }}
                />
              </div>
            ))}
          </div>
          
          <div className="p-12 rounded-3xl bg-gradient-to-br from-amber-100 to-yellow-100 border-2 border-amber-300 relative overflow-hidden shadow-2xl">
            <div className="relative">
              <div className="flex items-center space-x-4 mb-8">
                <Sparkles className="text-amber-600" size={32} />
                <h3 className="text-4xl font-black bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent">
                  My Development Philosophy
                </h3>
              </div>
              <p className="text-2xl text-amber-900 leading-relaxed">
                I believe in <span className="text-amber-700 font-bold">clean, maintainable code</span> that scales. 
                Every line I write is crafted with <span className="text-yellow-700 font-bold">performance</span>, 
                <span className="text-amber-600 font-bold"> accessibility</span>, and 
                <span className="text-yellow-600 font-bold"> user experience</span> in mind. 
                I don't just build features—I architect <span className="text-amber-700 font-bold">solutions</span> that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-amber-50 to-amber-100 border-t border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-4xl font-black bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent mb-4">
          AC
        </div>
        <p className="text-amber-800 mb-4">
          © 2024 Ajay Chirme. All rights reserved.
        </p>
        <p className="text-amber-700 text-sm">
          Built with <span className="text-red-500">❤️</span> using React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    ['home', 'about'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <div className="min-h-screen bg-white text-amber-900">
          <Navbar activeSection={activeSection} />
          <Hero />
          <About />
          <Footer />
        </div>
      )}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default App;