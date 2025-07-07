import React, { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, Code, FolderOpen, Award, Mail, Download, Phone, Github, Linkedin, Code2, Home } from 'lucide-react';
// @ts-ignore
import profilePic from './assets/pic.jpg';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showSkillPopup, setShowSkillPopup] = useState(null);
  const [showEducationDetail, setShowEducationDetail] = useState(null);
  const [showProjectsExpanded, setShowProjectsExpanded] = useState(false);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showNavbar, setShowNavbar] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [nebulaClouds, setNebulaClouds] = useState([]);
  const navbarRef = useRef(null);

  const roles = ["AI/ML Engineer", "Fullstack Developer", "DevOps Practitioner"];

  // Initialize stars for particle animation
  useEffect(() => {
    const initialStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.8 + 0.2,
      brightness: Math.random() * 0.5 + 0.5,
    }));
    setStars(initialStars);

    // Initialize nebula clouds
    const initialClouds = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 400 + 200,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      direction: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? 'purple' : 'blue',
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }));
    setNebulaClouds(initialClouds);
  }, []);

  // Mouse tracking for cursor effects and navbar
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Show/hide navbar based on cursor position (left side)
      if (e.clientX < 120) {
        setShowNavbar(true);
      } else if (e.clientX > 200) {
        setShowNavbar(false);
      }

      // Create cursor trail effect
      setCursorTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-15); // Keep last 15 trail points
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect and page load animation
  useEffect(() => {
    setIsLoaded(true);
    let i = 0;
    const currentRole = roles[currentRoleIndex];
    
    const timer = setInterval(() => {
      if (i < currentRole.length) {
        setTypewriterText(currentRole.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        // After completing current role, wait and switch to next
        setTimeout(() => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypewriterText('');
        }, 2000);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [currentRoleIndex]);

  // Enhanced star particle animation with cursor interaction
  useEffect(() => {
    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          const dx = mousePosition.x - star.x;
          const dy = mousePosition.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            return {
              ...star,
              x: star.x + (dx / distance) * star.speed * 3,
              y: star.y + (dy / distance) * star.speed * 3,
              opacity: Math.min(1, star.opacity + 0.2),
              brightness: Math.min(1, star.brightness + 0.3),
              size: Math.min(6, star.size + 1),
            };
          }
          
          return {
            ...star,
            x: star.x + (Math.random() - 0.5) * star.speed,
            y: star.y + (Math.random() - 0.5) * star.speed,
            opacity: Math.max(0.2, star.opacity - 0.005),
            brightness: Math.max(0.5, star.brightness - 0.01),
            size: Math.max(1, star.size - 0.02),
          };
        })
      );
    };

    const interval = setInterval(animateStars, 50);
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Nebula cloud animation
  useEffect(() => {
    const animateNebula = () => {
      setNebulaClouds(prevClouds => 
        prevClouds.map(cloud => {
          const newX = cloud.x + Math.cos(cloud.direction) * cloud.speed;
          const newY = cloud.y + Math.sin(cloud.direction) * cloud.speed;
          
          // Wrap around screen edges
          const wrappedX = newX < -cloud.size ? window.innerWidth + cloud.size : 
                          newX > window.innerWidth + cloud.size ? -cloud.size : newX;
          const wrappedY = newY < -cloud.size ? window.innerHeight + cloud.size : 
                          newY > window.innerHeight + cloud.size ? -cloud.size : newY;
          
          return {
            ...cloud,
            x: wrappedX,
            y: wrappedY,
            rotation: cloud.rotation + cloud.rotationSpeed,
            direction: cloud.direction + (Math.random() - 0.5) * 0.02,
            opacity: cloud.opacity + (Math.random() - 0.5) * 0.01,
          };
        })
      );
    };

    const interval = setInterval(animateNebula, 100);
    return () => clearInterval(interval);
  }, []);

  // Clean up cursor trail
  useEffect(() => {
    const cleanup = setInterval(() => {
      setCursorTrail(prev => prev.slice(-10));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About Me' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  const skills = [
    { name: 'Python', description: 'Advanced proficiency in Python for AI/ML, web development, automation, and data analysis with frameworks like TensorFlow, PyTorch, and scikit-learn.' },
    { name: 'JavaScript', description: 'Expert in modern JavaScript (ES6+), React, Node.js, and full-stack development with experience in building scalable web applications.' },
    { name: 'HTML', description: 'Master of semantic HTML5, accessibility standards, and modern web development practices for creating robust user interfaces.' },
    { name: 'CSS', description: 'Proficient in advanced CSS, Tailwind, animations, responsive design, and modern layout techniques including Grid and Flexbox.' }
  ];

  const projectCategories = {
    Python: [
      {
        name: 'Email Sender',
        techStack: 'Streamlit, smtplib, email.mime',
        description: 'Streamlit app to send emails with attachments using Gmail\'s SMTP with secure authentication.',
        thumbnail: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'WhatsApp Sender',
        techStack: 'Streamlit, PyWhatKit',
        description: 'Automates sending WhatsApp messages using a scheduled time via browser automation.',
        thumbnail: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Instagram Poster',
        techStack: 'Streamlit, Instabot',
        description: 'Upload and post photos on Instagram with caption via a web UI with automated posting.',
        thumbnail: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Menu-Based App',
        techStack: 'Streamlit, Sklearn, OpenAI API, subprocess',
        description: 'Menu-driven app integrating ML prediction, Docker/Linux commands, and GenAI capabilities.',
        thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    FullStack: [
      {
        name: 'E-Commerce Platform',
        techStack: 'React, Node.js, MongoDB, Express',
        description: 'Full-featured e-commerce platform with user authentication, payment integration, and admin dashboard.',
        thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Task Management System',
        techStack: 'Vue.js, Django, PostgreSQL, Redis',
        description: 'Collaborative task management application with real-time updates and team collaboration features.',
        thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Social Media Dashboard',
        techStack: 'Angular, Spring Boot, MySQL, WebSocket',
        description: 'Real-time social media analytics dashboard with data visualization and automated reporting.',
        thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Learning Management System',
        techStack: 'Next.js, FastAPI, PostgreSQL, AWS S3',
        description: 'Comprehensive LMS with video streaming, progress tracking, and interactive assessments.',
        thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ],
    DevOps: [
      {
        name: 'CI/CD Pipeline Automation',
        techStack: 'Jenkins, Docker, Kubernetes, AWS',
        description: 'Automated deployment pipeline with containerization and orchestration for scalable applications.',
        thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Infrastructure as Code',
        techStack: 'Terraform, Ansible, AWS CloudFormation',
        description: 'Automated infrastructure provisioning and configuration management using IaC principles.',
        thumbnail: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Monitoring & Logging System',
        techStack: 'Prometheus, Grafana, ELK Stack, Docker',
        description: 'Comprehensive monitoring solution with real-time alerts and centralized logging.',
        thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        name: 'Cloud Migration Platform',
        techStack: 'AWS, Azure, Docker, Kubernetes, Helm',
        description: 'Multi-cloud migration platform with automated scaling and disaster recovery capabilities.',
        thumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ]
  };

  const certificates = [
    'AWS Cloud Practitioner',
    'Red Hat Certified Engineer',
    'GoFr.Dev Framework Specialist',
    'Docker & Kubernetes Certified',
    'TensorFlow Developer Certificate'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setShowNavbar(false);
    setShowProjectsExpanded(false);
    setSelectedProjectCategory(null);
  };

  const handleProjectCategoryClick = (category) => {
    setSelectedProjectCategory(selectedProjectCategory === category ? null : category);
  };

  const renderHomePage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-4">
      <div className={`transform transition-all duration-2000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
        <div className="relative mb-8">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 p-2 shadow-2xl animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border-4 border-gray-800">
              <div className="w-52 h-52 md:w-68 md:h-68 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white text-7xl md:text-9xl font-bold font-mono shadow-inner">
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-300 opacity-40 blur-2xl animate-pulse"></div>
        </div>
        
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-mono tracking-wider animate-zoom-in neon-text">
            AGRIM SRIVASTAVA
          </h1>
          <div className="text-2xl md:text-3xl text-cyan-300 font-mono h-12 flex items-center justify-center">
            <span className="mr-2">{'>'}</span>
            {typewriterText}
            <span className="animate-pulse text-cyan-400 ml-1">|</span>
          </div>
        </div>
      </div>
      
      {/* Resume Download Button */}
      <button className="mt-12 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white px-10 py-5 rounded-full font-mono font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 flex items-center space-x-4 border-2 border-transparent hover:border-cyan-400 animate-float">
        <Download className="w-7 h-7" />
        <span>DOWNLOAD RESUME</span>
      </button>
    </div>
  );

  const renderAboutPage = () => (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-wider mb-20 animate-fade-in neon-text">
          ABOUT ME
        </h1>
        
        <div className="space-y-12">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-10 backdrop-blur-sm border-2 border-gradient hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 animate-slide-up enhanced-hover">
            <h2 className="text-3xl font-bold text-cyan-300 mb-6 font-mono flex items-center">
              <span className="mr-4">BRIEF INTRODUCTION</span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed">
              I am a passionate AI/ML Engineer and Fullstack Developer with expertise in DevOps practices. 
              Currently pursuing B.Tech in AI & Data Science, I specialize in creating intelligent solutions 
              that bridge the gap between cutting-edge AI research and practical applications. My experience 
              spans machine learning model development, full-stack web applications, and cloud infrastructure automation.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-2xl p-10 backdrop-blur-sm border-2 border-gradient hover:border-purple-400/50 transition-all duration-500 hover:scale-105 animate-slide-up enhanced-hover">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 font-mono flex items-center">
              <span className="mr-4">INTERESTS</span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed">
              Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, 
              Cloud Computing (AWS, Azure), DevOps & CI/CD, Microservices Architecture, Blockchain Technology, 
              and exploring emerging technologies that shape the future of software development.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-10 backdrop-blur-sm border-2 border-gradient hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 animate-slide-up enhanced-hover">
            <h2 className="text-3xl font-bold text-cyan-300 mb-6 font-mono flex items-center">
              <span className="mr-4">HOBBIES</span>
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed">
              Building AI-powered personal projects, contributing to open source communities, competitive programming, 
              reading research papers on arXiv, gaming, photography, and experimenting with new frameworks, 
              cloud services, and emerging programming paradigms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkillsPage = () => (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-wider mb-20 animate-fade-in neon-text">
          SKILLS
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skills.map((skill, index) => (
            <div key={skill.name} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <button
                onClick={() => setShowSkillPopup(showSkillPopup === index ? null : index)}
                className="w-full bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-3 border-white/40 rounded-full py-8 px-10 text-white font-mono text-2xl font-bold hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600/40 hover:via-purple-600/40 hover:to-cyan-600/40 enhanced-hover"
              >
                <span className="mr-3">{'>'}</span>{skill.name}
              </button>
              
              {showSkillPopup === index && (
                <div className="absolute top-full mt-6 left-0 right-0 bg-gradient-to-r from-blue-900/95 via-purple-900/95 to-cyan-900/95 backdrop-blur-sm rounded-2xl p-8 border-2 border-cyan-500/40 shadow-2xl z-10 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed text-lg">{skill.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectsPage = () => (
    <div className="min-h-screen py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-wider mb-20 animate-fade-in neon-text">
          PROJECTS
        </h1>
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] relative">
          {!showProjectsExpanded ? (
            <button
              onClick={() => setShowProjectsExpanded(true)}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-16 py-8 rounded-2xl font-mono text-2xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-500 hover:scale-110 border-2 border-transparent hover:border-cyan-400 animate-pulse-glow"
            >
              EXPLORE PROJECTS
            </button>
          ) : (
            <div className="w-full">
              {/* Category Selection Buttons */}
              <div className="flex justify-center space-x-8 mb-16">
                {Object.keys(projectCategories).map((category, index) => (
                  <button
                    key={category}
                    onClick={() => handleProjectCategoryClick(category)}
                    className={`px-12 py-6 rounded-2xl font-mono text-xl font-bold transition-all duration-500 hover:scale-105 border-2 ${
                      selectedProjectCategory === category
                        ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 border-cyan-400 shadow-lg shadow-cyan-500/50'
                        : 'bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-600/30 border-white/40 hover:border-cyan-400/70'
                    } text-white enhanced-hover`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              {selectedProjectCategory && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
                  {projectCategories[selectedProjectCategory].map((project, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-cyan-900/40 rounded-2xl p-6 border-2 border-gradient hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm animate-slide-up enhanced-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img 
                          src={project.thumbnail} 
                          alt={project.name}
                          className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-cyan-300 mb-3 font-mono">{project.name}</h3>
                      <div className="mb-3">
                        <span className="text-sm text-purple-300 font-mono">Tech Stack:</span>
                        <p className="text-gray-300 mt-1 text-sm">{project.techStack}</p>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm">{project.description}</p>
                      <div className="text-yellow-400 font-mono text-sm">
                        GitHub link coming soon...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderEducationPage = () => (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-wider mb-20 animate-fade-in neon-text">
          EDUCATION
        </h1>
        
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <button
              onClick={() => setShowEducationDetail(showEducationDetail === 'school' ? null : 'school')}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white px-16 py-8 rounded-2xl font-mono text-2xl font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-cyan-400 enhanced-hover"
            >
              SCHOOL
            </button>
            <button
              onClick={() => setShowEducationDetail(showEducationDetail === 'college' ? null : 'college')}
              className="bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 text-white px-16 py-8 rounded-2xl font-mono text-2xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-400 enhanced-hover"
            >
              COLLEGE
            </button>
          </div>
          
          {showEducationDetail === 'school' && (
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl p-10 backdrop-blur-sm border-2 border-cyan-500/40 animate-fade-in enhanced-hover">
              <h3 className="text-4xl font-bold text-cyan-300 mb-6 font-mono">SKD Academy</h3>
              <p className="text-gray-300 text-xl mb-4">Gomti Nagar, Lucknow</p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Completed 12th Standard with excellent academic performance, focusing on Mathematics, 
                Physics, and Computer Science. Developed strong analytical and problem-solving skills 
                that laid the foundation for my technical career.
              </p>
            </div>
          )}
          
          {showEducationDetail === 'college' && (
            <div className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 rounded-2xl p-10 backdrop-blur-sm border-2 border-purple-500/40 animate-fade-in enhanced-hover">
              <h3 className="text-4xl font-bold text-purple-300 mb-6 font-mono">Vivekananda Global University</h3>
              <p className="text-gray-300 text-xl mb-4">Jaipur, Rajasthan</p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Currently pursuing B.Tech in AI & Data Science, focusing on cutting-edge technologies 
                including Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, 
                and practical applications in real-world scenarios. Maintaining excellent academic performance 
                while working on innovative projects.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCertificatesPage = () => (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-wider mb-20 animate-fade-in neon-text">
          CERTIFICATES
        </h1>
        
        <div className="space-y-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-gradient hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm animate-slide-up enhanced-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold font-mono">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyan-300 font-mono">{cert}</h3>
                  <p className="text-gray-400 font-mono text-sm mt-2">Professional Certification</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-center text-white font-mono tracking-wider mb-20 animate-fade-in neon-text">
          CONTACT
        </h1>
        
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border-2 border-gradient backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 animate-slide-up enhanced-hover">
              <div className="flex items-center space-x-6">
                <Phone className="text-cyan-400 w-10 h-10" />
                <div>
                  <p className="text-gray-300 font-mono text-sm">Phone</p>
                  <p className="text-white font-bold text-xl">+91 78806*****</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-gradient backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 hover:scale-105 animate-slide-up enhanced-hover">
              <div className="flex items-center space-x-6">
                <Github className="text-purple-400 w-10 h-10" />
                <div>
                  <p className="text-gray-300 font-mono text-sm">GitHub</p>
                  <a href="https://github.com/agrimmm24" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-xl hover:text-cyan-400 transition-colors">
                    github.com/agrimmm24
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 border-2 border-gradient backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 animate-slide-up enhanced-hover">
              <div className="flex items-center space-x-6">
                <Linkedin className="text-cyan-400 w-10 h-10" />
                <div>
                  <p className="text-gray-300 font-mono text-sm">LinkedIn</p>
                  <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-xl hover:text-cyan-400 transition-colors">
                    linkedin.com/feed/
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border-2 border-gradient backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 hover:scale-105 animate-slide-up enhanced-hover">
              <div className="flex items-center space-x-6">
                <Code2 className="text-purple-400 w-10 h-10" />
                <div>
                  <p className="text-gray-300 font-mono text-sm">LeetCode</p>
                  <a href="https://leetcode.com/u/Agrim04/" target="_blank" rel="noopener noreferrer" className="text-white font-bold text-xl hover:text-purple-400 transition-colors">
                    leetcode.com/u/Agrim04
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-cyan-900/30 rounded-2xl p-10 backdrop-blur-sm border-2 border-gradient animate-slide-up enhanced-hover">
            <h3 className="text-3xl font-bold text-cyan-300 mb-8 font-mono flex items-center">
              <span className="mr-4">GET IN TOUCH</span>
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors font-mono text-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors font-mono text-lg"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="5"
                  className="w-full bg-gray-800/50 border-2 border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none font-mono text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-5 rounded-xl font-mono font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-cyan-400 text-xl"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return renderHomePage();
      case 'about': return renderAboutPage();
      case 'skills': return renderSkillsPage();
      case 'projects': return renderProjectsPage();
      case 'education': return renderEducationPage();
      case 'certificates': return renderCertificatesPage();
      case 'contact': return renderContactPage();
      default: return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09095a] to-[#1d1f1e] relative overflow-x-hidden">
      {/* Nebula Cloud Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {nebulaClouds.map(cloud => (
          <div
            key={cloud.id}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              left: `${cloud.x - cloud.size / 2}px`,
              top: `${cloud.y - cloud.size / 2}px`,
              width: `${cloud.size}px`,
              height: `${cloud.size}px`,
              opacity: cloud.opacity,
              transform: `rotate(${cloud.rotation}deg)`,
              background: cloud.color === 'purple' 
                ? `radial-gradient(ellipse, rgba(147, 51, 234, 0.4), rgba(168, 85, 247, 0.3), rgba(196, 181, 253, 0.2), transparent)`
                : `radial-gradient(ellipse, rgba(59, 130, 246, 0.4), rgba(96, 165, 250, 0.3), rgba(147, 197, 253, 0.2), transparent)`,
              filter: 'blur(40px)',
            }}
          />
        ))}
      </div>

      {/* Enhanced Moving Star Particles */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              background: `radial-gradient(circle, rgba(6, 182, 212, ${star.brightness}), rgba(59, 130, 246, ${star.brightness * 0.8}), transparent)`,
              boxShadow: `0 0 ${star.size * 3}px rgba(6, 182, 212, ${star.opacity}), 0 0 ${star.size * 6}px rgba(59, 130, 246, ${star.opacity * 0.5})`,
            }}
          />
        ))}
      </div>

      {/* Custom Cursor Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorTrail.map((point, index) => (
          <div
            key={point.id}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${point.x - 6}px`,
              top: `${point.y - 6}px`,
              background: `radial-gradient(circle, rgba(6, 182, 212, ${1 - index * 0.1}), transparent)`,
              transform: `scale(${1 - index * 0.05})`,
              transition: 'all 0.1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>
      
      {/* Left Side Navigation */}
      <nav 
        ref={navbarRef}
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
          showNavbar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        <div className="flex flex-col space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 border-2 backdrop-blur-md ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 border-cyan-400 shadow-lg shadow-cyan-500/50 scale-110'
                    : 'bg-gray-900/60 border-gray-600 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500/30 hover:scale-125 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:via-blue-600/20 hover:to-purple-600/20'
                }`}
                title={item.label}
              >
                <Icon className="w-7 h-7 text-white" />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 transition-all duration-500">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default App;