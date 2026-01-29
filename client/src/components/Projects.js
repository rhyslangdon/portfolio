import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';
import { projectsAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'desktop', label: 'Desktop Apps' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
      setFilteredProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Using sample data.');
      // Use sample data if API fails
      const sampleProjects = [
        {
          _id: '1',
          title: 'E-Commerce Platform',
          description: 'Full-stack MERN application with payment integration',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          image: 'https://via.placeholder.com/400x250',
          githubUrl: 'https://github.com',
          liveUrl: 'https://example.com',
          category: 'web',
          featured: true
        },
        {
          _id: '2',
          title: 'Task Management App',
          description: 'React Native mobile app for productivity',
          technologies: ['React Native', 'Firebase', 'Redux'],
          image: 'https://via.placeholder.com/400x250',
          githubUrl: 'https://github.com/rhyslangdon',
          category: 'mobile',
          featured: false
        },
        {
          _id: '3',
          title: 'Weather Dashboard',
          description: 'Real-time weather app with interactive maps',
          technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
          image: 'https://via.placeholder.com/400x250',
          githubUrl: 'https://github.com/rhyslangdon',
          liveUrl: 'https://rhyslangdon-projects.vercel.app',
          category: 'web',
          featured: true
        }
      ];
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    if (filterId === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filterId));
    }
  };

  if (loading) {
    return (
      <section id="projects" className="projects section">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">My Projects</h2>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="filter-container">
            <FaFilter className="filter-icon" />
            <div className="filter-buttons">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FaGithub />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/project/${project._id}`} 
                    className="btn btn-secondary project-btn"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="no-projects">
              <p>No projects found for the selected filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;