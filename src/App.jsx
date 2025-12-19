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
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
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
      id: 3,
      title: "Coordination App for Wellness Center",
      description: "Helped build a full-stack coordination application for a nonprofit wellness center. This webapp was built to streamline service and ride scheduling for older adults who are unable to drive on their own. I worked on developing the UI for the admin page, setting up admin routes, redesigning the database, and working on OAuth autherization.", 
      technologies: ["React", "Tailwind CSS", "JavaScript", "Docker", "OAuth"],
      github: "https://github.com/UTDallasEPICS/Wellness-Center-Older-Adults",
      demo: null,
      tags: ["Full Stack Development"],
      icon: Smartphone
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
      description: "A React-based application that analyzes if insurence claims are fradulant by using the OpenAI API. We built this project using a Python Flask backend which handles API requests and connects the React frontend with OpenAI predictions.",
      technologies: ["React", "Python Flask", "OpenAI API", "JavaScript", "CSS"],
      github: null,
      demo: null,
      tags: ["Full Stack Development", "Artificial Intelligence"],
      icon: Database
    },
    {
      id: 7,
      title: "Consulting - Storehouse Community Center",
      description: "This was a 180 Degrees Consulting project through which I delivered five research-backed recommendations for improving the UI of a non-profit's website. By designing Figma prototypes and conducting A/B testing through students at UT Dallas, I assesed the effectiveness of my recommendations and worked with the team to develop a report and final presentation for the non-profit.",
      technologies: ["Figma", "Data Analysis", "A/B Testing", "Research"],
      github: null,
      demo: null,
      tags: ["Consulting"],
      icon: Code
    },
    {
      id: 8,
      title: "Ransomware Attack Simulation",
      description: " Simulated a randomware attack by using a windows virtual machine. By building a python keylogeer and sending it through a phishing email, then using those credentials to reverse shell into a system, I created an educational project to get experience working with pen testing tools. ", 
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
      description: "Built an AI-based tool to detect vulnerabilities in System Verilog code using a fine-tuned BERT model with CodeBERT tokenizer. I experimented with learning rates, batch sizes, and activation functions to get the highest accuracy and created a dataset of vulnerable code with CWE's.",
      technologies: ["BERT", "CodeBERT", "Python", "NLP", "Deep Learning"],
      github: "https://github.com",
      demo: null,
      tags: ["Artificial Intelligence", "Cybersecurity"],
      icon: Code
    },
    {
      id: 1,
      title: "Federated Learning Attack - Detect and Defend",
      description: "Led a 5-person team developing ML model to attack Federated Learning systems by reconstructed training datasets using gradient reversal techniques. We analyzed differet architectures and datasets to find that the LeNet-5 architecture with MNIST dataset had the best F1 score.",
      technologies: ["Python", "PyTorch", "Machine Learning", "Federated Learning"],
      github: null,
      demo: null,
      tags: ["Machine Learning", "Cybersecurity"],
      icon: Brain
    },
    {
      id: 2,
      title: "Women Who Compute - Backend Development",
      description: "I integrated a member portal for the org website. By setting up a mongoDB backend, I implemented role-based access control with OAuth authoration and built features for member tracking such as event attendance, event rsvp's, and resume uploads." , 
      technologies: ["MongoDB", "Backend APIs", "OAuth", "Role-Based Access Control"],
      github: null,
      demo: null,
      tags: ["Full Stack Development"],
      icon: Database
    },
    {
      id: 2,
      title: "Dwell Time Predictor",
      description: " By copmaring the F1 scores, precision, accuracy, and recall of 12+ LLM models such as linear regressions, decision trees, and feature weighing method, my team and I built a model to predict how long an adhesive would remain on one's body over time. This project was in collaboration with Solventum so I was working with their research specialist and presented our work to employees at the company.", 
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      github: null,
      demo: null,
      tags: ["Machine Learning", "Artificial Intelligence"],
      icon: Brain
    }, 
    {
      id: 12,
      title: "ECHO 911",
      description: "•	Built a real-time dispatcher dashboard using React (frontend) and Python (backend) to display 911 calls transcripts, display policies to follow on scene, and support dispatcher decision-making. My team and I leveraged AWS services (Connect, Lambda, Bedrock, Strands, S3, Polly) to transcribe calls, extract key details, and evaluate incident severity and then integrated OpenStreetMap API, Open-Meteo API, Amazon Bedrock, and Claude Sonnet to enrich emergency location data and automate first responder mapping to the event.",
      technologies: ["React", "Python", "AWS Lambda", "AWS Bedrock", "OpenStreetMap API, Tailwind CSS, AWS S3"],
      github: "https://github.com/echo-911/echo-911",
      demo: null,
      tags: ["Full Stack Development", "Artificial Intelligence"],
      icon: Code
    },
    {
      id: 11,
      title: "Systems Security Lab at UT Dallas- Network Graph Generation",
      description: "I contributed to attack pathway detection techniques by generating network graphs based off of an initial BFS tracking strategy. By prioritizing rare and process events, I Implemented 6 tracking strategies in C# and automated the process of migrating information from a PostgreSQL database to a MongoDB database that stored event counts. Our team then analyzed the results of these graphs on different ML downstream tasks such as the anomaly detection.",
      technologies: ["C#", "MongoDB", "SQL", "Linux", "MAGIC Anomaly Detection, Automation"],
      github: null,
      demo: null,
      tags: ["Cybersecurity, Machine Learning"],
      icon: Shield
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
                  <img
  src="/profile.JPG"
  alt="My Photo"
  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
/>

             
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
                  From working on technical and consulting projects, I combine technical expertise with leadership to create meaningful impact in technology. Please feel free to check out some of my projects below!
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Code className="w-6 h-6 text-blue-500" />
                    <h3 className="font-bold text-gray-800 bubble-font">Full Stack Development</h3>
                  </div>
                  <p className="text-gray-600 text-sm">React, Python, Node.js, MongoDB, JavaScript, Tailwind CSS</p>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-6 h-6 text-pink-500" />
                    <h3 className="font-bold text-gray-800 bubble-font">Cybersecurity</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Penetration Testing, Malware Analysis, MITRE ATT&CK, Binary Exploitation</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Brain className="w-6 h-6 text-green-500" />
                    <h3 className="font-bold text-gray-800 bubble-font">AI & Machine Learning</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Image Classification, NLP, BERT, Federated Learning</p>
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
            <span className="text-purple-600 font-semibold bubble-font">Project Portfolio</span>
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
              Please feel free to reach out if you have any questions or want to do any projects together!
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