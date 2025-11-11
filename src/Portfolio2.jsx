import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, Sun, Moon, Code, Briefcase, Award, User, FolderGit2, ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, Globe, CheckCircle, Star, Rocket, Terminal, Database, Layers } from 'lucide-react';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return [theme, setTheme];
};

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="relative mb-8">
        <div className="w-40 h-40 relative">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: ['#06b6d4', '#a855f7', '#ec4899', '#f59e0b'][i],
                animationDuration: `${1 + i * 0.3}s`,
                animationDelay: `${i * 0.1}s`,
                transform: `scale(${1 - i * 0.15})`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-cyan-400 animate-pulse" size={48} />
        </div>
      </div>
      
      <div className="w-64 mb-4">
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        {progress}%
      </div>
      <div className="text-sm text-gray-500 mt-2">Loading Experience...</div>
    </div>
  );
};

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl opacity-20 animate-float"
          style={{
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${['#06b6d4', '#a855f7', '#ec4899', '#f59e0b'][i % 4]} 0%, transparent 70%)`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

const Navbar = ({ theme, setTheme, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Rocket },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className={`absolute inset-0 transition-all duration-700 ${scrolled ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10' : 'bg-transparent'}`} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="relative group cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500" />
            <div className="relative text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AC
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`group relative px-5 py-3 rounded-2xl transition-all duration-500 font-bold ${
                  activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeSection === id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50" />
                  </>
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <Icon size={16} />
                  <span>{label}</span>
                </span>
              </button>
            ))}
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-3 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 hover:scale-110 hover:border-cyan-500/50 transition-all duration-300"
            >
              {theme === 'dark' ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-purple-400" size={20} />}
            </button>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30"
          >
            {isOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} className="text-cyan-400" />}
          </button>
        </div>
        
        {isOpen && (
          <div className="lg:hidden mt-6 p-6 rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl mb-2 transition-all duration-300 font-semibold ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <FloatingShapes />
      
      {/* 3D Cursor Follower */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          transition: 'all 0.3s ease-out'
        }}
      />
      
      <div ref={ref} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* 3D Profile Card */}
          <div className="relative w-64 h-64 mx-auto mb-12 group perspective-1000">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="absolute inset-2 rounded-full bg-slate-950" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
              <div className="text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AC
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
            
            {/* Orbiting Icons */}
            {[Code, Terminal, Database, Layers].map((Icon, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-full animate-spin"
                style={{ 
                  animationDuration: '10s',
                  animationDelay: `${i * 2.5}s`
                }}
              >
                <Icon 
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-cyan-400"
                  size={24}
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-green-500/30">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm font-bold text-green-400">AVAILABLE FOR REMOTE OPPORTUNITIES</span>
              <Rocket className="text-green-400" size={18} />
            </div>
            
            {/* Name with 3D Effect */}
            <h1 className="relative">
              <div className="text-7xl sm:text-9xl font-black mb-2 tracking-tight">
                <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-110 transition-transform duration-500 cursor-default">
                  Ajay Chirme
                </span>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
            </h1>
            
            {/* Tagline */}
            <div className="flex items-center justify-center space-x-4 text-2xl">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <p className="text-gray-400 font-light">
                Crafting <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">scalable</span> & 
                <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> high-performance</span> web experiences
              </p>
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-pink-500 to-transparent" />
            </div>
            
            {/* Animated Role */}
            <div className="h-20 flex items-center justify-center overflow-hidden">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-2xl rounded-full" />
                <div className="relative text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-700 animate-pulse">
                  {roles[currentRole]}
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <a 
                href="#contact" 
                className="group relative px-12 py-5 rounded-full overflow-hidden font-black text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <span className="relative flex items-center space-x-3 text-white">
                  <Zap size={24} />
                  <span>HIRE ME NOW</span>
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#projects" 
                className="group relative px-12 py-5 rounded-full overflow-hidden font-black text-lg backdrop-blur-xl border-2 border-cyan-500/50 hover:border-purple-500/80 transition-all duration-500 hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center space-x-3 text-white">
                  <FolderGit2 size={24} />
                  <span>VIEW PROJECTS</span>
                </span>
              </a>
              
              <button className="group relative px-12 py-5 rounded-full overflow-hidden font-black text-lg backdrop-blur-xl border-2 border-purple-500/50 hover:border-pink-500/80 transition-all duration-500 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center space-x-3 text-white">
                  <Download size={24} />
                  <span>DOWNLOAD CV</span>
                </span>
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-12">
              {[
                { icon: Mail, href: 'mailto:ajaychirme@gmail.com', color: 'cyan' },
                { icon: Github, href: 'https://github.com/ajaychirme', color: 'purple' },
                { icon: Linkedin, href: 'https://linkedin.com/in/ajaychirme', color: 'pink' }
              ].map(({ icon: Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative p-5 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 hover:scale-125 transition-all duration-500"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500/20 to-${color}-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
                  <Icon className={`relative text-${color}-400 group-hover:text-white transition-colors group-hover:rotate-12`} size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="text-gray-500 text-sm mb-2">Scroll to explore</div>
        <ChevronDown className="text-cyan-400" size={32} />
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView();
  
  const stats = [
    { value: '4.5+', label: 'Years Experience', icon: TrendingUp, color: 'cyan', desc: 'Professional Development' },
    { value: '50+', label: 'Projects Completed', icon: Target, color: 'purple', desc: 'Successful Deliveries' },
    { value: '10K+', label: 'Users Impacted', icon: Users, color: 'pink', desc: 'Across Southeast Asia' },
    { value: '100%', label: 'Client Satisfaction', icon: Star, color: 'yellow', desc: 'Quality Guaranteed' }
  ];
  
  const journey = [
    { 
      year: '2020', 
      title: 'Started at FoodMarketHub', 
      role: 'Associate Frontend Developer',
      desc: 'Began my journey in Singapore working remotely on enterprise-level B2B applications',
      icon: Rocket,
      color: 'cyan'
    },
    { 
      year: '2022', 
      title: 'Promoted to Frontend Developer', 
      role: 'Mid-Level Engineer',
      desc: 'Led multiple high-impact projects, mentored juniors, and improved system performance by 40%',
      icon: Code,
      color: 'purple'
    },
    { 
      year: '2023', 
      title: 'Senior Developer Position', 
      role: 'Technical Lead',
      desc: 'Architected scalable solutions, established coding standards, and drove technical excellence',
      icon: Layers,
      color: 'pink'
    },
    { 
      year: '2024', 
      title: 'Pesto Tech Certification', 
      role: 'Full Stack Specialist',
      desc: 'Completed advanced full-stack program with focus on system design and architecture',
      icon: Award,
      color: 'orange'
    }
  ];
  
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <FloatingShapes />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-8">
              <User className="text-cyan-400" size={20} />
              <span className="text-sm font-bold text-cyan-400 tracking-wider">KNOW MORE ABOUT ME</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Story
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>
          
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800 hover:border-${stat.color}-500/50 transition-all duration-500 hover:scale-110 hover:-translate-y-4`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />
                <div className="relative">
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/10 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
                    <stat.icon className={`text-${stat.color}-400`} size={32} />
                  </div>
                  <div className={`text-5xl font-black mb-3 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-lg font-bold text-white mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* About Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              {[
                {
                  text: "Senior Frontend Developer with <strong>4.5 years of elite experience</strong> at <strong>FoodMarketHub, Singapore</strong>, specializing in building scalable, performance-optimized web applications that serve <strong>thousands of B2B users</strong> across Southeast Asia.",
                  gradient: 'from-cyan-500/5 via-blue-500/5',
                  border: 'cyan'
                },
                {
                  text: "Certified by <strong>Pesto Tech</strong> and holding <strong>4 Meta Professional Certificates</strong> (Frontend, Backend, Version Control, Advanced React) plus specialized Udemy certifications in modern web development.",
                  gradient: 'from-purple-500/5 via-pink-500/5',
                  border: 'purple'
                },
                {
                  text: "Passionate about <strong>React ecosystem, MERN stack, performance optimization, and design systems</strong>. Currently seeking <strong>remote opportunities in US/UK/Canada/Europe</strong> with innovative tech companies pushing boundaries.",
                  gradient: 'from-pink-500/5 via-orange-500/5',
                  border: 'pink'
                }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`group relative p-8 rounded-3xl bg-gradient-to-br ${item.gradient} to-transparent backdrop-blur-xl border border-${item.border}-500/20 hover:border-${item.border}-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${item.border}-500/20`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-${item.border}-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <p 
                    className="relative text-xl text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.text.replace(/<strong>(.*?)<\/strong>/g, '<strong class="text-' + item.border + '-400 font-bold">$1</strong>') }}
                  />
                </div>
              ))}
            </div>
            
            {/* Journey Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full" />
              
              {journey.map((item, i) => (
                <div key={i} className="relative pl-24 pb-16 last:pb-0 group">
                  <div className={`absolute left-4 w-9 h-9 rounded-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 flex items-center justify-center group-hover:scale-150 transition-all duration-500 shadow-xl shadow-${item.color}-500/50 z-10`}>
                    <item.icon className="text-white" size={18} />
                  </div>
                  
                  <div className={`p-8 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-slate-800 group-hover:border-${item.color}-500/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`text-2xl font-black bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 bg-clip-text text-transparent`}>
                        {item.year}
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-${item.color}-500/10 border border-${item.color}-500/30`}>
                        <span className={`text-xs font-bold text-${item.color}-400`}>{item.role}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tech Philosophy */}
          <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-cyan-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="relative">
              <div className="flex items-center space-x-4 mb-8">
                <Sparkles className="text-cyan-400" size={32} />
                <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  My Development Philosophy
                </h3>
              </div>
              <p className="text-2xl text-gray-300 leading-relaxed">
                I believe in <span className="text-cyan-400 font-bold">clean, maintainable code</span> that scales. 
                Every line I write is crafted with <span className="text-purple-400 font-bold">performance</span>, 
                <span className="text-pink-400 font-bold"> accessibility</span>, and 
                <span className="text-yellow-400 font-bold"> user experience</span> in mind. 
                I don't just build features—I architect <span className="text-cyan-400 font-bold">solutions</span> that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [ref, inView] = useInView();
  
  const skillCategories = [
    {
      title: 'Frontend Excellence',
      icon: Code,
      color: 'cyan',
      skills: [
        { name: 'React.js', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '▲' },
        { name: 'TypeScript', level: 90, icon: '📘' },
        { name: 'JavaScript ES6+', level: 95, icon: '🟨' },
        { name: 'Redux/Zustand', level: 90, icon: '🔄' },
        { name: 'Tailwind CSS', level: 95, icon: '🎨' }
      ]
    },
    {
      title: 'Backend & Database',
      icon: Database,
      color: 'purple',
      skills: [
        { name: 'Node.js', level: 85, icon: '🟢' },
        { name: 'Express.js', level: 85, icon: '⚡' },
        { name: 'MongoDB', level: 80, icon: '🍃' },
        { name: 'PostgreSQL', level: 75, icon: '🐘' },
        { name: 'REST APIs', level: 90, icon: '🔌' },
        { name: 'GraphQL', level: 70, icon: '◆' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Terminal,
      color: 'pink',
      skills: [
        { name: 'Git/GitHub', level: 95, icon: '🐙' },
        { name: 'Docker', level: 75, icon: '🐳' },
        { name: 'AWS/Azure', level: 70, icon: '☁️' },
        { name: 'CI/CD', level: 80, icon: '🔄' },
        { name: 'Jest/Testing', level: 85, icon: '🧪' },
        { name: 'Webpack/Vite', level: 85, icon: '📦' }
      ]
    },
    {
      title: 'Design & UX',
      icon: Layers,
      color: 'orange',
      skills: [
        { name: 'Figma', level: 85, icon: '🎨' },
        { name: 'Responsive Design', level: 95, icon: '📱' },
        { name: 'UI/UX Principles', level: 90, icon: '✨' },
        { name: 'Accessibility', level: 85, icon: '♿' },
        { name: 'Design Systems', level: 90, icon: '🎯' },
        { name: 'Animation', level: 85, icon: '🎬' }
      ]
    }
  ];
  
  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950">
      <FloatingShapes />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 mb-8">
              <Code className="text-purple-400" size={20} />
              <span className="text-sm font-bold text-purple-400 tracking-wider">TECHNICAL EXPERTISE</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Skills & Tools
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full" />
          </div>
          
          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, i) => (
              <div
                key={i}
                className={`group relative p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800 hover:border-${category.color}-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${category.color}-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${category.color}-500/20 to-${category.color}-600/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <category.icon className={`text-${category.color}-400`} size={32} />
                    </div>
                    <h3 className={`text-3xl font-black bg-gradient-to-r from-${category.color}-400 to-${category.color}-600 bg-clip-text text-transparent`}>
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill, j) => (
                      <div key={j} className="group/skill">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{skill.icon}</span>
                            <span className="text-lg font-bold text-white">{skill.name}</span>
                          </div>
                          <span className={`text-sm font-bold text-${category.color}-400`}>{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-full transition-all duration-1000 group-hover/skill:animate-pulse`}
                            style={{ 
                              width: inView ? `${skill.level}%` : '0%',
                              transition: 'width 1s ease-out'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Certifications Highlight */}
          <div className="p-12 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-purple-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />
            <div className="relative">
              <div className="flex items-center space-x-4 mb-8">
                <Award className="text-purple-400" size={32} />
                <h3 className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Professional Certifications
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Pesto Tech Full Stack', org: 'Pesto Tech', badge: '🎓' },
                  { title: 'Meta Frontend Developer', org: 'Meta', badge: '⚛️' },
                  { title: 'Meta Backend Developer', org: 'Meta', badge: '🔧' },
                  { title: 'Meta Advanced React', org: 'Meta', badge: '🚀' },
                  { title: 'Version Control', org: 'Meta', badge: '🌿' },
                  { title: 'Modern Web Development', org: 'Udemy', badge: '💻' }
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl mb-3">{cert.badge}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{cert.title}</h4>
                    <p className="text-sm text-gray-400">{cert.org}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [ref, inView] = useInView();
  
  const experiences = [
    {
      role: 'Senior Frontend Developer',
      company: 'FoodMarketHub',
      location: 'Singapore (Remote)',
      period: 'Jan 2023 - Present',
      type: 'Full-time',
      color: 'cyan',
      achievements: [
        'Architected and delivered 15+ scalable B2B web applications serving 10,000+ users across Southeast Asia',
        'Improved application performance by 40% through code optimization and lazy loading strategies',
        'Led technical initiatives and mentored 5 junior developers, improving team productivity by 30%',
        'Implemented comprehensive design system reducing development time by 25%',
        'Collaborated with cross-functional teams to deliver projects 20% ahead of schedule'
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind', 'AWS']
    },
    {
      role: 'Frontend Developer',
      company: 'FoodMarketHub',
      location: 'Singapore (Remote)',
      period: 'Mar 2022 - Dec 2022',
      type: 'Full-time',
      color: 'purple',
      achievements: [
        'Developed 10+ responsive web applications with React.js and modern JavaScript',
        'Optimized bundle sizes by 35% using code-splitting and tree-shaking techniques',
        'Implemented automated testing with Jest, achieving 85% code coverage',
        'Collaborated with UX team to enhance user experience, increasing engagement by 25%',
        'Participated in code reviews and established best practices for the frontend team'
      ],
      tech: ['React', 'JavaScript', 'Redux', 'Material-UI', 'Jest', 'Git']
    },
    {
      role: 'Associate Frontend Developer',
      company: 'FoodMarketHub',
      location: 'Singapore (Remote)',
      period: 'Oct 2020 - Feb 2022',
      type: 'Full-time',
      color: 'pink',
      achievements: [
        'Built 8+ user-facing features for enterprise B2B platform',
        'Reduced page load times by 30% through performance optimization',
        'Worked closely with backend team to integrate RESTful APIs',
        'Assisted in migration from class components to React Hooks',
        'Maintained 98%+ uptime for critical business applications'
      ],
      tech: ['React', 'JavaScript', 'CSS3', 'REST APIs', 'Bootstrap', 'GitHub']
    }
  ];
  
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <FloatingShapes />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-8">
              <Briefcase className="text-cyan-400" size={20} />
              <span className="text-sm font-bold text-cyan-400 tracking-wider">PROFESSIONAL JOURNEY</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>
          
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full transform lg:-translate-x-1/2" />
            
            {experiences.map((exp, i) => (
              <div key={i} className={`relative mb-16 last:mb-0 ${i % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'}`}>
                <div className={`absolute left-4 lg:left-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-${exp.color}-500 to-${exp.color}-600 flex items-center justify-center transform lg:-translate-x-1/2 shadow-xl shadow-${exp.color}-500/50 z-10 hover:scale-125 transition-all duration-500`}>
                  <Briefcase className="text-white" size={24} />
                </div>
                
                <div className={`ml-20 lg:ml-0 ${i % 2 === 0 ? 'lg:mr-20' : 'lg:ml-20'}`}>
                  <div className={`group p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800 hover:border-${exp.color}-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${exp.color}-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="relative">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className={`px-6 py-3 rounded-full bg-gradient-to-r from-${exp.color}-500/20 to-${exp.color}-600/10 border border-${exp.color}-500/30`}>
                          <span className={`text-sm font-bold text-${exp.color}-400`}>{exp.period}</span>
                        </div>
                        <div className="px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700">
                          <span className="text-sm font-bold text-gray-400">{exp.type}</span>
                        </div>
                      </div>
                      
                      <h3 className={`text-3xl font-black mb-3 bg-gradient-to-r from-${exp.color}-400 to-${exp.color}-600 bg-clip-text text-transparent`}>
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center space-x-3 mb-6">
                        <Globe className="text-gray-500" size={18} />
                        <span className="text-xl font-bold text-white">{exp.company}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-lg text-gray-400">{exp.location}</span>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        {exp.achievements.map((achievement, j) => (
                          <div key={j} className="flex items-start space-x-3">
                            <CheckCircle className={`text-${exp.color}-400 flex-shrink-0 mt-1`} size={18} />
                            <p className="text-gray-300 leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {exp.tech.map((tech, j) => (
                          <span
                            key={j}
                            className={`px-4 py-2 rounded-full bg-${exp.color}-500/10 border border-${exp.color}-500/30 text-sm font-bold text-${exp.color}-400 hover:bg-${exp.color}-500/20 transition-all duration-300`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [ref, inView] = useInView();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'B2B Platform', 'E-commerce', 'Enterprise', 'Personal'];
  
  const projects = [
    {
      title: 'FoodMarketHub Platform',
      category: 'B2B Platform',
      description: 'Enterprise-level B2B food marketplace connecting suppliers and buyers across Southeast Asia',
      image: '🍽️',
      tech: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind', 'AWS'],
      stats: { users: '10K+', performance: '+40%', uptime: '99.9%' },
      color: 'cyan',
      highlights: ['Real-time order tracking', 'Multi-vendor dashboard', 'Analytics engine']
    },
    {
      title: 'Supply Chain Dashboard',
      category: 'Enterprise',
      description: 'Comprehensive supply chain management system with real-time inventory tracking',
      image: '📊',
      tech: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Socket.io'],
      stats: { efficiency: '+35%', accuracy: '98%', savings: '$2M+' },
      color: 'purple',
      highlights: ['Live data visualization', 'Predictive analytics', 'Automated reporting']
    },
    {
      title: 'E-commerce Storefront',
      category: 'E-commerce',
      description: 'Modern e-commerce platform with seamless checkout and payment integration',
      image: '🛒',
      tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'Docker'],
      stats: { conversion: '+45%', speed: '2s load', revenue: '+60%' },
      color: 'pink',
      highlights: ['One-click checkout', 'AI recommendations', 'Mobile-first design']
    },
    {
      title: 'CRM System',
      category: 'Enterprise',
      description: 'Customer relationship management platform for B2B sales teams',
      image: '👥',
      tech: ['React', 'GraphQL', 'Node.js', 'PostgreSQL', 'AWS'],
      stats: { productivity: '+50%', satisfaction: '95%', leads: '+80%' },
      color: 'orange',
      highlights: ['Sales pipeline automation', 'Email integration', 'Custom workflows']
    },
    {
      title: 'Portfolio Generator',
      category: 'Personal',
      description: 'AI-powered portfolio builder for developers and designers',
      image: '🎨',
      tech: ['React', 'Claude API', 'Tailwind', 'Framer Motion'],
      stats: { users: '5K+', templates: '50+', satisfaction: '4.9/5' },
      color: 'cyan',
      highlights: ['AI content generation', 'Custom themes', 'One-click deploy']
    },
    {
      title: 'Analytics Dashboard',
      category: 'B2B Platform',
      description: 'Real-time business intelligence platform with advanced visualization',
      image: '📈',
      tech: ['React', 'Recharts', 'Python', 'FastAPI', 'Redis'],
      stats: { metrics: '100+', refresh: 'Real-time', insights: '1000+' },
      color: 'purple',
      highlights: ['Custom reports', 'Predictive modeling', 'Export to Excel/PDF']
    }
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
  
  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950">
      <FloatingShapes />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 mb-8">
              <FolderGit2 className="text-purple-400" size={20} />
              <span className="text-sm font-bold text-purple-400 tracking-wider">FEATURED WORK</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full" />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-110'
                    : 'bg-slate-900 text-gray-400 hover:text-white hover:scale-105 border border-slate-800'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800 hover:border-${project.color}-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${project.color}-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative">
                  {/* Project Image/Icon */}
                  <div className={`w-full h-48 mb-6 rounded-2xl bg-gradient-to-br from-${project.color}-500/20 to-${project.color}-600/10 flex items-center justify-center text-7xl group-hover:scale-110 transition-all duration-500`}>
                    {project.image}
                  </div>
                  
                  {/* Category Badge */}
                  <div className={`inline-block px-4 py-2 rounded-full bg-${project.color}-500/10 border border-${project.color}-500/30 mb-4`}>
                    <span className={`text-xs font-bold text-${project.color}-400`}>{project.category}</span>
                  </div>
                  
                  <h3 className={`text-2xl font-black mb-3 bg-gradient-to-r from-${project.color}-400 to-${project.color}-600 bg-clip-text text-transparent`}>
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(project.stats).map(([key, value], j) => (
                      <div key={j} className="text-center">
                        <div className={`text-xl font-black text-${project.color}-400`}>{value}</div>
                        <div className="text-xs text-gray-500 uppercase">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((highlight, j) => (
                      <div key={j} className="flex items-center space-x-2">
                        <Star className={`text-${project.color}-400 flex-shrink-0`} size={14} />
                        <span className="text-sm text-gray-400">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1 rounded-full bg-slate-800/50 text-xs font-bold text-${project.color}-400 border border-slate-700`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className={`flex-1 py-3 rounded-xl bg-gradient-to-r from-${project.color}-500 to-${project.color}-600 text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                      <ExternalLink size={16} />
                      <span>View Live</span>
                    </button>
                    <button className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                      <Github className="text-gray-400 hover:text-white" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Certificates = () => {
  const [ref, inView] = useInView();
  
  const certificates = [
    {
      title: 'Full Stack Development Program',
      issuer: 'Pesto Tech',
      date: '2024',
      icon: '🎓',
      color: 'cyan',
      description: 'Comprehensive full-stack engineering program covering system design, architecture, and advanced development practices',
      skills: ['System Design', 'DSA', 'MERN Stack', 'Architecture'],
      credential: 'PESTO-2024-FS-847'
    },
    {
      title: 'Meta Frontend Developer Professional',
      issuer: 'Meta',
      date: '2023',
      icon: '⚛️',
      color: 'purple',
      description: 'Professional certification in modern frontend development with React, focusing on best practices and performance',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'UI/UX'],
      credential: 'META-FE-2023-9274'
    },
    {
      title: 'Meta Backend Developer Professional',
      issuer: 'Meta',
      date: '2023',
      icon: '🔧',
      color: 'pink',
      description: 'Backend development certification covering Node.js, databases, APIs, and server-side architecture',
      skills: ['Node.js', 'APIs', 'Databases', 'Authentication'],
      credential: 'META-BE-2023-8462'
    },
    {
      title: 'Meta Advanced React',
      issuer: 'Meta',
      date: '2023',
      icon: '🚀',
      color: 'orange',
      description: 'Advanced React patterns, performance optimization, testing, and building production-ready applications',
      skills: ['Advanced Hooks', 'Testing', 'Performance', 'Patterns'],
      credential: 'META-AR-2023-7531'
    },
    {
      title: 'Version Control with Git',
      issuer: 'Meta',
      date: '2023',
      icon: '🌿',
      color: 'cyan',
      description: 'Comprehensive Git and GitHub training for professional development workflows and collaboration',
      skills: ['Git', 'GitHub', 'CI/CD', 'Workflows'],
      credential: 'META-VC-2023-6284'
    },
    {
      title: 'Modern Web Development',
      issuer: 'Udemy',
      date: '2022',
      icon: '💻',
      color: 'purple',
      description: 'Complete modern web development course covering latest frameworks, tools, and industry practices',
      skills: ['Modern JS', 'Frameworks', 'Tools', 'Best Practices'],
      credential: 'UC-WEB-2022-4927'
    }
  ];
  
  return (
    <section id="certificates" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <FloatingShapes />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-xl border border-orange-500/30 mb-8">
              <Award className="text-orange-400" size={20} />
              <span className="text-sm font-bold text-orange-400 tracking-wider">PROFESSIONAL CREDENTIALS</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 mx-auto rounded-full" />
          </div>
          
          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800 hover:border-${cert.color}-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${cert.color}-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative">
                  {/* Certificate Icon */}
                  <div className={`w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br from-${cert.color}-500/20 to-${cert.color}-600/10 flex items-center justify-center text-5xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mx-auto shadow-xl`}>
                    {cert.icon}
                  </div>
                  
                  {/* Date Badge */}
                  <div className={`inline-block px-4 py-2 rounded-full bg-${cert.color}-500/10 border border-${cert.color}-500/30 mb-4`}>
                    <span className={`text-xs font-bold text-${cert.color}-400`}>{cert.date}</span>
                  </div>
                  
                  <h3 className={`text-xl font-black mb-3 bg-gradient-to-r from-${cert.color}-400 to-${cert.color}-600 bg-clip-text text-transparent`}>
                    {cert.title}
                  </h3>
                  
                  <p className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Award size={16} className={`text-${cert.color}-400`} />
                    <span>{cert.issuer}</span>
                  </p>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                    {cert.description}
                  </p>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cert.skills.map((skill, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1 rounded-full bg-slate-800/50 text-xs font-bold text-${cert.color}-400 border border-slate-700`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Credential ID */}
                  <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 mb-6">
                    <div className="text-xs text-gray-500 mb-1">Credential ID</div>
                    <div className={`text-sm font-mono font-bold text-${cert.color}-400`}>{cert.credential}</div>
                  </div>
                  
                  {/* Verify Button */}
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r from-${cert.color}-500 to-${cert.color}-600 text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}>
                    <CheckCircle size={16} />
                    <span>Verify Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Achievement Stats */}
          <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 backdrop-blur-xl border border-orange-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-yellow-500/5 to-amber-500/5" />
            <div className="relative">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                  Continuous Learning Journey
                </h3>
                <p className="text-xl text-gray-400">Committed to staying at the forefront of technology</p>
              </div>
              
              <div className="grid sm:grid-cols-4 gap-8">
                {[
                  { value: '6+', label: 'Professional Certifications', icon: Award },
                  { value: '500+', label: 'Hours of Learning', icon: TrendingUp },
                  { value: '4.9/5', label: 'Average Course Rating', icon: Star },
                  { value: '100%', label: 'Completion Rate', icon: Target }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/10 flex items-center justify-center">
                      <stat.icon className="text-orange-400" size={28} />
                    </div>
                    <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1500);
  };
  
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ajaychirme@gmail.com', href: 'mailto:ajaychirme@gmail.com', color: 'cyan' },
    { icon: Linkedin, label: 'LinkedIn', value: '/ajaychirme', href: 'https://linkedin.com/in/ajaychirme', color: 'purple' },
    { icon: Github, label: 'GitHub', value: '/ajaychirme', href: 'https://github.com/ajaychirme', color: 'pink' },
    { icon: Globe, label: 'Location', value: 'Mumbai, India', href: null, color: 'orange' }
  ];
  
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950">
      <FloatingShapes />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-8">
              <Mail className="text-cyan-400" size={20} />
              <span className="text-sm font-bold text-cyan-400 tracking-wider">GET IN TOUCH</span>
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <div className="w-40 h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
            <p className="text-2xl text-gray-400 mt-8 max-w-3xl mx-auto">
              Open to exciting <span className="text-cyan-400 font-bold">remote opportunities</span> with innovative companies. Let's build something amazing together!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800">
              <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-3">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-cyan-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-3">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-purple-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-3">Your Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-pink-500/50 text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative w-full py-5 rounded-xl overflow-hidden font-black text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-x" />
                  <span className="relative flex items-center justify-center space-x-3 text-white">
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : status === 'sent' ? (
                      <>
                        <CheckCircle size={24} />
                        <span>MESSAGE SENT!</span>
                      </>
                    ) : (
                      <>
                        <Rocket size={24} />
                        <span>SEND MESSAGE</span>
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 backdrop-blur-xl border border-slate-800">
                <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, i) => (
                    <a
                      key={i}
                      href={info.href || '#'}
                      target={info.href?.startsWith('http') ? '_blank' : undefined}
                      rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`group flex items-center space-x-4 p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-${info.color}-500/50 transition-all duration-300 hover:scale-105 ${!info.href && 'cursor-default'}`}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${info.color}-500/20 to-${info.color}-600/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        <info.icon className={`text-${info.color}-400`} size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                        <div className={`text-lg font-bold text-${info.color}-400`}>{info.value}</div>
                      </div>
                      {info.href && <ExternalLink className="text-gray-600 group-hover:text-gray-400" size={18} />}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="p-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-cyan-500/30">
                <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
                  Why Work With Me?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Rocket, text: '4.5+ years of elite experience', color: 'cyan' },
                    { icon: Globe, text: 'Remote work expert (Singapore-based company)', color: 'purple' },
                    { icon: TrendingUp, text: 'Proven track record of 50+ successful projects', color: 'pink' },
                    { icon: Star, text: '100% client satisfaction rate', color: 'yellow' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <item.icon className={`text-${item.color}-400 flex-shrink-0`} size={20} />
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Availability Banner */}
          <div className="mt-16 p-12 rounded-3xl bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-green-500/30 text-center">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-4 h-4 rounded-full bg-green-400 animate-ping absolute" />
                <div className="w-4 h-4 rounded-full bg-green-400" />
              </div>
              <span className="text-2xl font-black text-green-400">AVAILABLE FOR HIRE</span>
            </div>
            <p className="text-xl text-gray-300 mb-6">
              Currently seeking remote opportunities with innovative companies in the US, UK, Canada, and Europe
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Full-time', 'Contract', 'Freelance'].map((type, i) => (
                <span
                  key={i}
                  className="px-6 py-3 rounded-full bg-slate-900/50 border border-slate-700 text-sm font-bold text-gray-300"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-slate-950 to-black border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              AC
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Senior Frontend Developer crafting exceptional web experiences with modern technologies.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/ajaychirme', color: 'cyan' },
                { icon: Linkedin, href: 'https://linkedin.com/in/ajaychirme', color: 'purple' },
                { icon: Mail, href: 'mailto:ajaychirme@gmail.com', color: 'pink' }
              ].map(({ icon: Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-${color}-500/50 transition-all duration-300 hover:scale-110`}
                >
                  <Icon className={`text-${color}-400`} size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">Quick Links</h3>
            <div className="space-y-3">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certificates', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-black text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on my latest projects and articles.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 transition-all duration-300"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 Ajay Chirme. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Built with <span className="text-pink-400">❤️</span> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    
    ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <div className="min-h-screen bg-slate-950 text-white">
          <Navbar theme={theme} setTheme={setTheme} activeSection={activeSection} />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
          <Footer />
        </div>
      )}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default App;