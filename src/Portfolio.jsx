import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, ChevronDown, Sun, Moon, Code, Briefcase, Award, User, FolderGit2 } from 'lucide-react';

// Theme Hook
const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return [theme, setTheme];
};

// Intersection Observer Hook
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

// Animated Counter
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  
  return <span ref={ref}>{count}</span>;
};

// Loader Component
const Loader = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin animation-delay-150" style={{ animationDelay: '150ms' }} />
      </div>
    </div>
  );
};

// Floating Navbar
const Navbar = ({ theme, setTheme, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: User },
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
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollToSection('home')}>
            AC
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:scale-110 transition-transform"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 p-4 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-xl">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  activeSection === id
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>Toggle Theme</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const [ref, inView] = useInView();
  const roles = ['Frontend Developer', 'MERN Engineer', 'React Specialist', 'UI/UX Enthusiast'];
  const [currentRole, setCurrentRole] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Image Placeholder */}
          <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1 animate-float">
            <div className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-6xl font-bold text-slate-600 dark:text-slate-300">
              AC
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Ajay Chirme
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-6">
            Building scalable, high-performance web applications
          </p>
          
          <div className="h-8 mb-8">
            <p className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium transition-all duration-500">
              {roles[currentRole]}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="#contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Hire Me
            </a>
            <a href="#projects" className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700">
              View Work
            </a>
            <button className="px-8 py-4 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <Download size={20} />
              <span>Resume</span>
            </button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="mailto:ajaychirme@gmail.com" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <Mail className="text-slate-700 dark:text-slate-300" size={24} />
            </a>
            <a href="https://github.com/ajaychirme" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <Github className="text-slate-700 dark:text-slate-300" size={24} />
            </a>
            <a href="https://linkedin.com/in/ajaychirme" target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <Linkedin className="text-slate-700 dark:text-slate-300" size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-slate-400" size={32} />
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const [ref, inView] = useInView();
  
  const timeline = [
    { year: '2020', title: 'Started at FoodMarketHub', desc: 'Associate Frontend Developer - Singapore (Remote)' },
    { year: '2022', title: 'Promoted to Frontend Developer', desc: 'Led multiple high-impact projects' },
    { year: '2023', title: 'Senior Developer', desc: 'Architecting scalable solutions' },
    { year: '2024', title: 'Pesto Tech Certification', desc: 'Advanced Full-stack Program' }
  ];
  
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Senior Frontend Developer with <span className="text-blue-600 dark:text-blue-400 font-semibold">4.5 years of experience</span> at FoodMarketHub, Singapore, specializing in building scalable, performance-optimized web applications.
              </p>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Certified by <span className="font-semibold text-purple-600 dark:text-purple-400">Pesto Tech</span> and holding <span className="font-semibold text-purple-600 dark:text-purple-400">4 Meta Certificates</span> (Frontend, Backend, Version Control) plus advanced Udemy certifications.
              </p>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Passionate about React ecosystem, MERN stack, design systems, and performance optimization. Currently seeking <span className="font-semibold text-blue-600 dark:text-blue-400">remote opportunities in US/UK/Canada/Europe</span>.
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    <AnimatedCounter end={4.5} />+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Years Exp</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    <AnimatedCounter end={50} />+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Projects</div>
                </div>
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    <AnimatedCounter end={7} />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Certificates</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex space-x-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-150 transition-transform duration-300" />
                    {i !== timeline.length - 1 && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 mt-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{item.year}</div>
                    <div className="text-lg font-bold text-slate-800 dark:text-white mt-1">{item.title}</div>
                    <div className="text-slate-600 dark:text-slate-400 mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills = () => {
  const [ref, inView] = useInView();
  const [activeTab, setActiveTab] = useState('frontend');
  
  const skills = {
    frontend: [
      { name: 'React', level: 95 },
      { name: 'Redux', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Material-UI', level: 90 },
      { name: 'JavaScript ES6+', level: 95 },
      { name: 'HTML5/CSS3', level: 98 }
    ],
    backend: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
      { name: 'PostgreSQL', level: 70 }
    ],
    tools: [
      { name: 'Git/GitHub', level: 95 },
      { name: 'Docker', level: 70 },
      { name: 'Postman', level: 90 },
      { name: 'Webpack/Vite', level: 85 },
      { name: 'Jest/Testing', level: 80 },
      { name: 'Figma', level: 85 }
    ]
  };
  
  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Briefcase },
    { id: 'tools', label: 'Tools', icon: FolderGit2 }
  ];
  
  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />
          
          <div className="flex justify-center mb-8 space-x-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:shadow-lg'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills[activeTab].map((skill, i) => (
              <div
                key={skill.name}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-white">{skill.name}</h3>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                    style={{ width: inView ? `${skill.level}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
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
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700">
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
              
              <div className="mb-8">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                        Senior Frontend Developer
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
                        FoodMarketHub
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Singapore (Remote)
                      </p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        2020 - Present (4.5 years)
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    {achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start space-x-3 group">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mt-2 group-hover:scale-150 transition-transform" />
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['React', 'Redux', 'TypeScript', 'Node.js', 'MongoDB', 'REST APIs', 'Git'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects = () => {
  const [ref, inView] = useInView();
  
  const projects = [
    {
      title: 'E-Commerce Platform',
      desc: 'Full-stack MERN application with real-time inventory, payment integration, and admin dashboard',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      image: '🛍️',
      live: 'https://project1.vercel.app',
      github: 'https://github.com/ajaychirme/project1'
    },
    {
      title: 'Task Management SaaS',
      desc: 'Collaborative task manager with real-time updates, drag-drop, and team features',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      image: '📋',
      live: 'https://project2.vercel.app',
      github: 'https://github.com/ajaychirme/project2'
    },
    {
      title: 'Analytics Dashboard',
      desc: 'Real-time data visualization dashboard with charts, filters, and export capabilities',
      tech: ['React', 'D3.js', 'Express', 'MongoDB'],
      image: '📊',
      live: 'https://project3.vercel.app',
      github: 'https://github.com/ajaychirme/project3'
    },
    {
      title: 'Social Media App',
      desc: 'Instagram-like social platform with posts, stories, real-time chat, and notifications',
      tech: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      image: '📱',
      live: 'https://project4.vercel.app',
      github: 'https://github.com/ajaychirme/project4'
    }
  ];
  
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8">
                  <div className="text-6xl mb-4">{project.image}</div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Github size={16} />
                      <span>Code</span>
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

// Certificates Section
const Certificates = () => {
  const [ref, inView] = useInView();
  const [openIndex, setOpenIndex] = useState(null);
  
  const certificates = [
    {
      title: 'Pesto Tech - Full Stack Development',
      issuer: 'Pesto Tech',
      desc: 'Comprehensive full-stack program covering advanced React, Node.js, system design, and scalable architecture',
      skills: ['React', 'Node.js', 'System Design', 'Microservices'],
      logo: '🎓'
    },
    {
      title: 'Meta Frontend Developer Certificate',
      issuer: 'Meta',
      desc: 'Professional certificate covering React, responsive design, UI/UX principles, and modern frontend practices',
      skills: ['React', 'HTML/CSS', 'JavaScript', 'UI/UX'],
      logo: '⚛️'
    },
    {
      title: 'Meta Backend Developer Certificate',
      issuer: 'Meta',
      desc: 'Backend specialization covering APIs, databases, authentication, and server-side development',
      skills: ['Node.js', 'APIs', 'Databases', 'Authentication'],
      logo: '🔧'
    },
    {
      title: 'Meta Version Control Certificate',
      issuer: 'Meta',
      desc: 'Git and GitHub mastery including branching strategies, collaboration workflows, and best practices',
      skills: ['Git', 'GitHub', 'CI/CD', 'Collaboration'],
      logo: '📝'
    },
    {
      title: 'Modern React with Redux',
      issuer: 'Udemy',
      desc: 'Advanced React patterns, Redux state management, hooks, and performance optimization techniques',
      skills: ['React', 'Redux', 'Hooks', 'Performance'],
      logo: '⚡'
    },
    {
      title: 'Advanced Frontend Development',
      issuer: 'Udemy',
      desc: 'Deep dive into modern frontend architecture, design patterns, and best practices',
      skills: ['Architecture', 'Design Patterns', 'TypeScript'],
      logo: '🚀'
    }
  ];
  
  return (
    <section id="certificates" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certificates & Training
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />
          
          <div className="space-y-4">
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{cert.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openIndex === i ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 space-y-4">
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {cert.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      <ExternalLink size={16} />
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

// Contact Section
const Contact = () => {
  const [ref, inView] = useInView();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  Let's work together
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  I'm actively seeking remote opportunities in US, UK, Canada, and Europe. 
                  Open to full-time positions, contract work, and interesting projects.
                </p>
              </div>
              
              <div className="space-y-4">
                <a href="mailto:ajaychirme@gmail.com" className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Mail className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Email</div>
                    <div className="font-semibold text-slate-800 dark:text-white">ajaychirme@gmail.com</div>
                  </div>
                </a>
                
                <a href="https://github.com/ajaychirme" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Github className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">GitHub</div>
                    <div className="font-semibold text-slate-800 dark:text-white">github.com/ajaychirme</div>
                  </div>
                </a>
                
                <a href="https://linkedin.com/in/ajaychirme" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg group-hover:scale-110 transition-transform">
                    <Linkedin className="text-pink-600 dark:text-pink-400" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">LinkedIn</div>
                    <div className="font-semibold text-slate-800 dark:text-white">linkedin.com/in/ajaychirme</div>
                  </div>
                </a>
              </div>
              
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-lg">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Location</div>
                <div className="font-semibold text-slate-800 dark:text-white">India</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Available for Remote (Europe-first timezone)</div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-800 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-white"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-600 dark:text-slate-400">
            © 2024 Ajay Chirme. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <a href="mailto:ajaychirme@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
            <a href="https://github.com/ajaychirme" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/ajaychirme" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
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
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
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
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #1e293b;
        }
        
        *::-webkit-scrollbar {
          width: 8px;
        }
        
        *::-webkit-scrollbar-track {
          background: #1e293b;
        }
        
        *::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}