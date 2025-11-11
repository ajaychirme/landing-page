import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, Sun, Moon, Code, Briefcase, Award, FolderGit2, ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, Globe, CheckCircle } from 'lucide-react';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return [theme, setTheme];
};

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return position;
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
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 border-r-blue-500 animate-spin" style={{ animationDuration: '1.5s' }} />
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-yellow-400 border-r-green-500 animate-spin" style={{ animationDuration: '2s' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="text-cyan-400 animate-pulse" size={32} />
        </div>
      </div>
    </div>
  );
};

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2
    }));
    
    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, 'rgba(34, 211, 238, 0.8)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-2' : 'py-6'}`}>
      <div className={`absolute inset-0 transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-cyan-500/20' : 'bg-transparent'}`} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="text-3xl font-black cursor-pointer relative group"
            onClick={() => scrollToSection('home')}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AC
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full" />
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative px-5 py-2.5 rounded-full transition-all duration-500 font-semibold ${
                  activeSection === id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeSection === id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full" />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 hover:scale-110 transition-all duration-300 group"
            >
              <div className="relative">
                {theme === 'dark' ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-purple-400" size={20} />}
              </div>
            </button>
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30"
          >
            {isOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} className="text-cyan-400" />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-6 p-6 rounded-3xl bg-black/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full px-6 py-4 rounded-2xl mb-2 transition-all duration-300 font-semibold text-left ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
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
  const mousePos = useMousePosition();
  const roles = ['Frontend Architect', 'MERN Engineer', 'React Specialist', 'UI/UX Developer'];
  const [currentRole, setCurrentRole] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <ParticleBackground />
      
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-30 transition-all duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
            left: `${mousePos.x / 20}px`,
            top: `${mousePos.y / 20}px`,
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-pink-500/20 rounded-full blur-3xl" />
      </div>
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{marginTop: '7rem'}}>
          
          <div className="relative w-48 h-48 mx-auto mb-12 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-1 rounded-full bg-black" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-700 group-hover:rotate-6">
              <span className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                AC
              </span>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
          </div>
          
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-400">Available for Remote Work</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl lg:text8xl font-black mb-6 tracking-tight">
              <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ajay Chirme
              </span>
            </h1>
            
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500" />
              <p className="text-xl sm:text-2xl text-gray-400 font-light">
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold">scalable</span>, 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-semibold"> high-performance</span> web applications
              </p>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-500" />
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-full" />
                <p className="relative text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-700">
                  {roles[currentRole]}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <a 
                href="#contact" 
                className="group relative px-10 py-5 rounded-full overflow-hidden font-bold text-lg transition-all duration-500 hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center space-x-2 text-white">
                  <Zap size={20} />
                  <span>Hire Me Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#projects" 
                className="group relative px-10 py-5 rounded-full overflow-hidden font-bold text-lg backdrop-blur-xl border-2 border-cyan-500/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-110"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center space-x-2 text-white">
                  <FolderGit2 size={20} />
                  <span>View Projects</span>
                </span>
              </a>
              
              <button className="group relative px-10 py-5 rounded-full overflow-hidden font-bold text-lg backdrop-blur-xl border-2 border-purple-500/50 hover:border-pink-500/50 transition-all duration-500 hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center space-x-2 text-white">
                  <Download size={20} />
                  <span>Resume</span>
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
                  className="group relative p-4 rounded-full backdrop-blur-xl border border-white/10 hover:scale-125 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <Icon className="relative text-cyan-400 group-hover:text-white transition-colors" size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-cyan-400" size={40} />
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView();
  
  const stats = [
    { value: 4.5, label: 'Years Experience', icon: TrendingUp },
    { value: 50, label: 'Projects', icon: Target },
    { value: 10, label: 'K+ Users', icon: Users },
    { value: 7, label: 'Certificates', icon: Award }
  ];
  
  const timeline = [
    { year: '2020', title: 'Started at FoodMarketHub', desc: 'Associate Frontend Developer - Singapore', icon: Code },
    { year: '2022', title: 'Promoted to Frontend Developer', desc: 'Led multiple high-impact projects', icon: TrendingUp },
    { year: '2023', title: 'Senior Developer', desc: 'Architecting scalable solutions', icon: Zap },
    { year: '2024', title: 'Pesto Tech Certification', desc: 'Advanced Full-stack Program', icon: Award }
  ];
  
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgzNCwyMTEsMjM4LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')"}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-6">
              <Sparkles className="text-cyan-400" size={18} />
              <span className="text-sm font-semibold text-cyan-400">GET TO KNOW ME</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent backdrop-blur-xl border border-cyan-500/20 hover:border-purple-500/30 transition-all duration-500 hover:scale-105">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Senior Frontend Developer with <span className="text-cyan-400 font-bold text-2xl">4.5 years</span> of elite experience at <span className="text-purple-400 font-semibold">FoodMarketHub, Singapore</span>, specializing in building scalable, performance-optimized web applications.
                </p>
              </div>
              
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent backdrop-blur-xl border border-purple-500/20 hover:border-pink-500/30 transition-all duration-500 hover:scale-105">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Certified by <span className="text-purple-400 font-bold">Pesto Tech</span> with <span className="text-pink-400 font-bold">4 Meta Certificates</span> and advanced Udemy certifications in modern web development.
                </p>
              </div>
              
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-pink-500/5 via-cyan-500/5 to-transparent backdrop-blur-xl border border-pink-500/20 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105">
                <p className="text-xl text-gray-300 leading-relaxed">
                  Seeking <span className="text-cyan-400 font-bold">remote opportunities in US/UK/Canada/Europe</span> with innovative tech companies.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  <div className="relative">
                    <stat.icon className="text-cyan-400 mb-4 group-hover:scale-125 transition-transform" size={32} />
                    <div className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}{stat.label.includes('K+') ? 'K+' : stat.value === 4.5 ? '+' : ''}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 rounded-full" />
            
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-24 pb-16 last:pb-0 group">
                <div className="absolute left-4 w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-150 transition-all duration-500 shadow-lg shadow-purple-500/50">
                  <item.icon className="text-white" size={18} />
                </div>
                
                <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-800 group-hover:border-purple-500/50 transition-all duration-500 group-hover:scale-105">
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-4">
                    <span className="text-cyan-400 font-bold">{item.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [ref, inView] = useInView();
  const [activeTab, setActiveTab] = useState('frontend');
  
  const skills = {
    frontend: [
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'Redux', level: 90, icon: '🔄' },
      { name: 'Next.js', level: 85, icon: '▲' },
      { name: 'TypeScript', level: 88, icon: '📘' },
      { name: 'Tailwind', level: 95, icon: '🎨' },
      { name: 'Material-UI', level: 90, icon: '🎭' },
      { name: 'JavaScript', level: 95, icon: '⚡' },
      { name: 'HTML/CSS', level: 98, icon: '🌐' }
    ],
    backend: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express.js', level: 88, icon: '🚀' },
      { name: 'MongoDB', level: 82, icon: '🍃' },
      { name: 'REST APIs', level: 90, icon: '🔌' },
      { name: 'GraphQL', level: 75, icon: '📊' },
      { name: 'PostgreSQL', level: 70, icon: '🐘' }
    ],
    tools: [
      { name: 'Git/GitHub', level: 95, icon: '📦' },
      { name: 'Docker', level: 70, icon: '🐳' },
      { name: 'Postman', level: 90, icon: '📮' },
      { name: 'Webpack', level: 85, icon: '📦' },
      { name: 'Jest', level: 80, icon: '🧪' },
      { name: 'Figma', level: 85, icon: '🎨' }
    ]
  };
  
  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Briefcase },
    { id: 'tools', label: 'Tools', icon: FolderGit2 }
  ];
  
  return (
    <section id="skills" className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-6">
              <Code className="text-cyan-400" size={18} />
              <span className="text-sm font-semibold text-cyan-400">TECHNICAL EXPERTISE</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Skills & Mastery
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>
          
          <div className="flex justify-center mb-12 space-x-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/50 scale-110'
                    : 'bg-gray-900/50 text-gray-400 hover:text-white hover:scale-105 border border-gray-800'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills[activeTab].map((skill, i) => (
              <div
                key={skill.name}
                className="group relative p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 hover:scale-110 hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="relative">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-4xl">{skill.icon}</span>
                    <span className="text-lg font-bold text-cyan-400">{skill.level}%</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{skill.name}</h3>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1500"
                      style={{ width: inView ? `${skill.level}%` : '0%' }}
                    />
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

const Experience = () => {
  const [ref, inView] = useInView();
  
  const achievements = [
    'Built scalable React applications serving 10,000+ B2B users across Southeast Asia',
    'Optimized application performance, achieving 40% faster load times and 95+ Lighthouse scores',
    'Architected reusable component libraries reducing development time by 30%',
    'Collaborated with cross-functional remote teams across 5+ time zones',
    'Integrated complex REST APIs and WebSocket implementations for real-time features',
    'Mentored junior developers and established coding standards for the team',
    'Led migration from legacy codebase to modern React + TypeScript stack'
  ];
  
  return (
    <section id="experience" className="py-32 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNjgsMTM4LDI0NywwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')"}} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 mb-6">
              <Briefcase className="text-purple-400" size={18} />
              <span className="text-sm font-semibold text-purple-400">PROFESSIONAL JOURNEY</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full" />
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-purple-500/30 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 shadow-2xl shadow-purple-500/20">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-50" />
              
              <div className="relative">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-2">
                      Senior Frontend Developer
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      FoodMarketHub
                    </p>
                    <p className="text-gray-400 flex items-center space-x-2">
                      <Globe size={16} />
                      <span>Singapore (Remote)</span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-3 rounded-2xl border border-purple-500/30">
                    <span className="text-purple-400 font-bold">2020 - Present (4.5 years)</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-125 transition-transform">
                        <CheckCircle className="text-white" size={16} />
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg flex-1">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['React', 'Redux', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'Agile'].map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [ref, inView] = useInView();
  
  const projects = [
    {
      title: 'E-Commerce Platform',
      desc: 'Full-stack MERN application with real-time inventory management, Stripe payment integration, and comprehensive admin dashboard with analytics',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express'],
      icon: '🛍️',
      gradient: 'from-cyan-500 to-blue-500',
      live: 'https://project1.vercel.app',
      github: 'https://github.com/ajaychirme/project1'
    },
    {
      title: 'Task Management SaaS',
      desc: 'Collaborative task manager with real-time updates via WebSockets, drag-drop functionality, and advanced team collaboration features',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Prisma'],
      icon: '📋',
      gradient: 'from-purple-500 to-pink-500',
      live: 'https://project2.vercel.app',
      github: 'https://github.com/ajaychirme/project2'
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Real-time data visualization dashboard with interactive charts, advanced filtering, and CSV/PDF export capabilities',
      tech: ['React', 'D3.js', 'Express', 'MongoDB', 'Redis'],
      icon: '📊',
      gradient: 'from-pink-500 to-orange-500',
      live: 'https://project3.vercel.app',
      github: 'https://github.com/ajaychirme/project3'
    },
    {
      title: 'Social Media App',
      desc: 'Instagram-like social platform with posts, stories, real-time chat, push notifications, and image optimization',
      tech: ['React Native', 'Firebase', 'Redux', 'Node.js', 'AWS S3'],
      icon: '📱',
      gradient: 'from-green-500 to-teal-500',
      live: 'https://project4.vercel.app',
      github: 'https://github.com/ajaychirme/project4'
    }
  ];
  
  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-cyan-500/10 backdrop-blur-xl border border-pink-500/30 mb-6">
              <FolderGit2 className="text-pink-400" size={18} />
              <span className="text-sm font-semibold text-pink-400">PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-purple-500 mx-auto rounded-full" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-700 hover:scale-105 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                
                <div className="relative p-8">
                  <div className="text-7xl mb-6 group-hover:scale-125 transition-transform duration-500">{project.icon}</div>
                  
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-gray-800/50 text-gray-300 text-sm font-medium border border-gray-700 group-hover:border-cyan-500/30 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
                    >
                      <ExternalLink size={18} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-6 py-3 rounded-xl bg-gray-800 text-white font-bold hover:bg-gray-700 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <Github size={18} />
                    </a>
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
  const [openIndex, setOpenIndex] = useState(null);
  
  const certificates = [
    {
      title: 'Pesto Tech - Full Stack Development',
      issuer: 'Pesto Tech',
      desc: 'Comprehensive full-stack program covering advanced React, Node.js, system design, and scalable architecture patterns',
      skills: ['React', 'Node.js', 'System Design', 'Microservices', 'Architecture'],
      icon: '🎓',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Meta Frontend Developer Certificate',
      issuer: 'Meta',
      desc: 'Professional certificate covering React, responsive design, UI/UX principles, and modern frontend development practices',
      skills: ['React', 'HTML/CSS', 'JavaScript', 'UI/UX', 'Responsive Design'],
      icon: '⚛️',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Meta Backend Developer Certificate',
      issuer: 'Meta',
      desc: 'Backend specialization covering APIs, databases, authentication, security, and server-side development',
      skills: ['Node.js', 'APIs', 'Databases', 'Authentication', 'Security'],
      icon: '🔧',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Meta Version Control Certificate',
      issuer: 'Meta',
      desc: 'Git and GitHub mastery including branching strategies, collaboration workflows, CI/CD, and best practices',
      skills: ['Git', 'GitHub', 'CI/CD', 'Collaboration', 'DevOps'],
      icon: '📝',
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      title: 'Modern React with Redux',
      issuer: 'Udemy',
      desc: 'Advanced React patterns, Redux state management, hooks, context API, and performance optimization techniques',
      skills: ['React', 'Redux', 'Hooks', 'Performance', 'State Management'],
      icon: '⚡',
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'Advanced Frontend Development',
      issuer: 'Udemy',
      desc: 'Deep dive into modern frontend architecture, design patterns, testing, and industry best practices',
      skills: ['Architecture', 'Design Patterns', 'TypeScript', 'Testing', 'Best Practices'],
      icon: '🚀',
      gradient: 'from-green-500 to-teal-500'
    }
  ];
  
  return (
    <section id="certificates" className="py-32 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMzYsMTI1LDQ5LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')"}} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/30 mb-6">
              <Award className="text-yellow-400" size={18} />
              <span className="text-sm font-semibold text-yellow-400">CREDENTIALS & ACHIEVEMENTS</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Certificates
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 mx-auto rounded-full" />
          </div>
          
          <div className="space-y-6">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="group rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-6">
                    <div className={`text-6xl p-4 rounded-2xl bg-gradient-to-br ${cert.gradient} bg-opacity-10`}>
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                        {cert.title}
                      </h3>
                      <p className={`text-lg font-bold bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent`}>
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180 text-cyan-400' : ''
                    }`}
                    size={28}
                  />
                </button>
                
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openIndex === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-8 space-y-6">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {cert.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <button className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300">
                      <ExternalLink size={18} />
                      <span>View Credential</span>
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

const Contact = () => {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ajaychirme@gmail.com', href: 'mailto:ajaychirme@gmail.com', gradient: 'from-cyan-500 to-blue-500' },
    { icon: Github, label: 'GitHub', value: 'github.com/ajaychirme', href: 'https://github.com/ajaychirme', gradient: 'from-purple-500 to-pink-500' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/ajaychirme', href: 'https://linkedin.com/in/ajaychirme', gradient: 'from-pink-500 to-orange-500' },
    { icon: Globe, label: 'Location', value: 'India / Remote (Europe TZ)', href: null, gradient: 'from-green-500 to-teal-500' }
  ];
  
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/30 mb-6">
              <Mail className="text-cyan-400" size={18} />
              <span className="text-sm font-semibold text-cyan-400">LET'S CONNECT</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full" />
            <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
              Ready to work on amazing projects together. Let's create something extraordinary!
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800">
                <h3 className="text-3xl font-black text-white mb-4">
                  Let's work together
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  I'm actively seeking remote opportunities in <span className="text-cyan-400 font-semibold">US, UK, Canada, and Europe</span>. 
                  Open to full-time positions, contract work, and interesting projects.
                </p>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-semibold">Available for immediate start</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  item.href ? (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105"
                    >
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                        <item.icon className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`} size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-medium">{item.label}</div>
                        <div className="text-white font-semibold">{item.value}</div>
                      </div>
                      <ArrowRight className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" size={20} />
                    </a>
                  ) : (
                    <div
                      key={i}
                      className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800"
                    >
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-10`}>
                        <item.icon className={`bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`} size={24} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">{item.label}</div>
                        <div className="text-white font-semibold">{item.value}</div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl border border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none text-white placeholder-gray-600"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-lg rounded-xl shadow-2xl shadow-purple-500/50 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitted ? (
                      <span className="flex items-center justify-center space-x-2">
                        <CheckCircle size={24} />
                        <span>Message Sent Successfully!</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Zap size={24} />
                        <span>Send Message</span>
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-gradient-to-b from-black to-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              Ajay Chirme
            </div>
            <p className="text-gray-500">Frontend Developer & MERN Engineer</p>
          </div>
          
          <div className="flex space-x-6">
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
                className="p-3 rounded-full bg-gray-900 border border-gray-800 hover:border-cyan-500/50 hover:scale-110 transition-all duration-300 group"
              >
                <Icon className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © 2024 Ajay Chirme. Crafted with <span className="text-red-500">❤️</span> and <span className="text-cyan-400">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];
    
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
    
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Loader loading={loading} />
      
      {!loading && (
        <>
          <Navbar theme={theme} setTheme={setTheme} activeSection={activeSection} />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
          <Footer />
        </>
      )}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #06b6d4 #0f172a;
        }
        
        *::-webkit-scrollbar {
          width: 10px;
        }
        
        *::-webkit-scrollbar-track {
          background: #0f172a;
        }
        
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #06b6d4, #a855f7, #ec4899);
          border-radius: 5px;
        }
        
        *::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #22d3ee, #c084fc, #f472b6);
        }
      `}</style>
    </div>
  );
}