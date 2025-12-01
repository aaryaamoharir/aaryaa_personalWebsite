import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Linkedin, Github, ExternalLink, Code, Shield, Brain, Database, Server, Smartphone, Menu, X } from 'lucide-react';


// Add Google Fonts for bubble fonts
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');
  
  .bubble-font {
    font-family: 'Fredoka', sans-serif;
  }
`;
document.head.appendChild(style);

// Navigation Component
const Navbar = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent bubble-font">
          Aaryaa
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-medium transition-all duration-300 relative group bubble-font ${
                activeSection === item.id
                  ? 'text-purple-600'
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300 group-hover:w-full ${
                activeSection === item.id ? 'w-full' : 'w-0'
              }`}></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-medium transition-all duration-300 bubble-font ${
                  activeSection === item.id
                    ? 'text-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Project Card Component
const ProjectCard = ({ title, description, technologies, github, demo, tags, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTagColor = (tag) => {
    switch(tag.toLowerCase()) {
      case 'artificial intelligence':
        return 'bg-emerald-100 text-emerald-700';
      case 'cybersecurity':
        return 'bg-pink-100 text-pink-700';
      case 'full stack development':
        return 'bg-blue-100 text-blue-700';
      case 'consulting':
        return 'bg-amber-100 text-amber-700';
      case 'machine learning':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-400"></div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-100">
            <Icon className="text-purple-500 transition-transform duration-300" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 bubble-font">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 pt-4 border-t border-gray-100">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const projects = [
    {
      id: 1,
      title: "ECHO 911",
      description: "Real-time dispatcher dashboard for 911 calls. Won 1st place out of 36 teams at Breaking Barriers Hackathon. Built with React frontend, Python backend, leveraging AWS services for call transcription and incident analysis.",
      technologies: ["React", "Python", "AWS Lambda", "AWS Bedrock", "OpenStreetMap API"],
      github: null,
      demo: null,
      tags: ["Full Stack Development", "Artificial Intelligence"],
      icon: Code
    },
    {
      id: 2,
      title: "Dwell Time Predictor",
      description: "Machine learning project in collaboration with Solventum. Experimenting with 12+ LLM models to optimize F1 score and accuracy using proprietary datasets. Partnering with cross-functional teams for interdisciplinary competitions.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      github: null,
      demo: null,
      tags: ["Machine Learning", "Artificial Intelligence"],
      icon: Brain
    },
    {
      id: 3,
      title: "Coordination App for Wellness Center",
      description: "Full-stack coordination application for a nonprofit wellness center. Built to streamline service and ride scheduling for older adults. Features real-time scheduling, OAuth authorization, and Docker containerization.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "Docker", "OAuth"],
      github: "https://github.com/UTDallasEPICS/Wellness-Center-Older-Adults",
      demo: null,
      tags: ["Full Stack Development"],
      icon: Smartphone
    },
    {
      id: 4,
      title: "Network Security Lab - Attack Pathway Detection",
      description: "Contributing to attack pathway detection techniques by analyzing network traffic and process activity. Implemented 6 tracking strategies in C# and built database system with MongoDB/SQL reducing query time by 30%.",
      technologies: ["C#", "MongoDB", "SQL", "Linux", "MAGIC Anomaly Detection"],
      github: null,
      demo: null,
      tags: ["Cybersecurity"],
      icon: Shield
    },
    {
      id: 5,
      title: "Malware Analysis - Lumma Stealer",
      description: "Researched and profiled Lumma Stealer malware for DNIF Hypercloud. Mapped multi-stage attack lifecycle to MITRE ATT&CK framework. Designed Detection Use Case Matrix and Threat Hunting Playbook with 8 detection use cases.",
      technologies: ["MITRE ATT&CK", "Sigma Rules", "Wireshark", "Log Analysis"],
      github: null,
      demo: null,
      tags: ["Cybersecurity"],
      icon: Server
    },
    {
      id: 6,
      title: "Insurance Chatbot",
      description: "React-based insurance claims chatbot with OpenAI integration. Analyzes claim data and generates fraud probability insights. Python Flask backend handles API requests and connects React frontend with OpenAI predictions.",
      technologies: ["React", "Python Flask", "OpenAI API", "JavaScript", "CSS"],
      github: null,
      demo: null,
      tags: ["Full Stack Development", "Artificial Intelligence"],
      icon: Database
    },
    {
      id: 7,
      title: "Consulting - Storehouse Community Center",
      description: "180 Degrees Consulting project delivering five research-backed recommendations for improving community engagement. Designed Figma prototypes and conducted A/B testing to assess solution effectiveness.",
      technologies: ["Figma", "Data Analysis", "A/B Testing", "Research"],
      github: null,
      demo: null,
      tags: ["Consulting"],
      icon: Code
    },
    {
      id: 8,
      title: "Ransomware Attack Simulation",
      description: "Educational cybersecurity project demonstrating attack techniques. Built Python keylogger bypassing Windows firewall, HTML phishing website, and Java-based ransomware. Used Metasploit for reverse shell generation.",
      technologies: ["Python", "Java", "Metasploit", "HTML", "Windows Security"],
      github: null,
      demo: null,
      tags: ["Cybersecurity"],
      icon: Shield
    },
    {
      id: 9,
      title: "LLM Hallucination Detection",
      description: "Developed and tested hallucination detection techniques (RunREF, RunCove, Sac3) for Large Language Models. Improved detection accuracy across multiple datasets from Hugging Face.",
      technologies: ["Python", "Hugging Face", "Deep Learning", "NLP"],
      github: "https://github.com/aaryaamoharir/llm_hallucination_ranking",
      demo: null,
      tags: ["Artificial Intelligence", "Machine Learning"],
      icon: Brain
    },
    {
      id: 10,
      title: "System Verilog Vulnerability Detector",
      description: "AI-based tool detecting vulnerabilities in System Verilog code using NLP. Fine-tuned BERT model with CodeBERT tokenizer. Experimented with learning rates, batch sizes, and activation functions for optimal performance.",
      technologies: ["BERT", "CodeBERT", "Python", "NLP", "Deep Learning"],
      github: "https://github.com",
      demo: null,
      tags: ["Artificial Intelligence", "Cybersecurity"],
      icon: Code
    },
    {
      id: 11,
      title: "Federated Learning Attack - Detect and Defend",
      description: "Led 5-person team developing ML model to attack Federated Learning systems. Reconstructed training datasets using gradient reversal techniques. Utilized LeNet-5 architecture with MNIST dataset for model evaluation.",
      technologies: ["Python", "PyTorch", "Machine Learning", "Federated Learning"],
      github: null,
      demo: null,
      tags: ["Machine Learning", "Cybersecurity"],
      icon: Brain
    },
    {
      id: 12,
      title: "Women Who Compute - Backend Development",
      description: "Integrated MongoDB backend for member management system. Implemented role-based access control with OAuth authorization. Built 3 features for member tracking, improving efficiency by 35%.",
      technologies: ["MongoDB", "Backend APIs", "OAuth", "Role-Based Access Control"],
      github: null,
      demo: null,
      tags: ["Full Stack Development"],
      icon: Database
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'artificial intelligence', label: 'AI' },
    { key: 'machine learning', label: 'ML' },
    { key: 'cybersecurity', label: 'Cybersecurity' },
    { key: 'full stack', label: 'Full Stack' },
    { key: 'consulting', label: 'Consulting' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Information */}
            <div className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent bubble-font">
                Aaryaa Moharir
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-gray-700 font-medium bubble-font">
                Software Engineer | Cybersecurity Researcher | ML Enthusiast
              </p>
              <p className="text-lg mb-8 text-gray-600 leading-relaxed max-w-lg">
                Passionate about building secure, intelligent systems and solving complex problems 
                through innovative technology solutions. Always eager to take on new challenges 
                and create meaningful impact.
              </p>
              
              {/* Contact Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="mailto:aaryaamoharir@gmail.com"
                  className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-gray-700"
                >
                  <Mail size={20} className="text-purple-500" />
                  <span>Email</span>
                </a>
                <a
                  href="https://linkedin.com/in/aaryaamoharir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-gray-700"
                >
                  <Linkedin size={20} className="text-blue-500" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/aaryaamoharir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-gray-700"
                >
                  <Github size={20} className="text-gray-600" />
                  <span>GitHub</span>
                </a>
              </div>

             
            </div>

            {/* Right Side - Profile Picture */}
            <div className={`flex justify-center lg:justify-end transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}>
              <div className="relative">
                {/* Decorative background elements */}
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-300 to-green-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Profile Picture Container */}
                <div className="relative w-80 h-80 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-2xl overflow-hidden border-8 border-white/50 backdrop-blur-sm">
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 flex items-center justify-center">
                  <div className="relative w-80 h-80 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-2xl overflow-hidden border-8 border-white/50 backdrop-blur-sm">
                <img
                  src="/profile.jpg" 
                  alt="My Photo"
                  className="w-full h-full object-cover"
                />
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-gray-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <span className="text-purple-600 font-semibold bubble-font">About Me</span>
              <h2 className="text-5xl font-bold text-gray-900 mt-2 mb-6 bubble-font">Who I Am & What I Do</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  I'm a passionate developer and security researcher at UT Dallas, specializing in full-stack development, cybersecurity research, and machine learning applications. I'm driven by building secure, scalable systems that solve real-world problems.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From leading research initiatives and consulting projects, I combine technical expertise with leadership to create meaningful impact in technology. Currently exploring the intersection of AI security and system defense.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Code className="w-6 h-6 text-blue-500" />
                    <h3 className="font-bold text-gray-800 bubble-font">Full Stack Development</h3>
                  </div>
                  <p className="text-gray-600 text-sm">React, Python, Node.js, MongoDB</p>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-6 h-6 text-pink-500" />
                    <h3 className="font-bold text-gray-800 bubble-font">Cybersecurity</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Penetration Testing, Malware Analysis, MITRE ATT&CK, Binary</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Brain className="w-6 h-6 text-green-500" />
                    <h3 className="font-bold text-gray-800 bubble-font">AI & Machine Learning</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Deep Learning, NLP, BERT, Federated Learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto mb-16">
            <span className="text-purple-600 font-semibold bubble-font">Portfolio</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-2 mb-6 bubble-font">Featured Projects & Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => setActiveFilter(button.key)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 bubble-font ${
                  activeFilter === button.key
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transform transition-all duration-700 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-purple-600 font-semibold bubble-font">Get In Touch</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-2 mb-6 bubble-font">Let's Work Together</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-8"></div>
            
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              I'm always interested in hearing about new projects, opportunities, and collaborations. Whether you have a question or just want to connect, feel free to reach out!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:aaryaamoharir@gmail.com"
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 bubble-font"
              >
                <Mail size={20} />
                <span>Email Me</span>
              </a>
              <a
                href="https://linkedin.com/in/aaryaamoharir"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-8 py-4 border-2 border-purple-400 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 hover:scale-105 bubble-font"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/aaryaamoharir"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-8 py-4 border-2 border-purple-400 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 hover:scale-105 bubble-font"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="bubble-font">
            © 2024 Aaryaa Moharir. Built with React, Tailwind CSS & ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}