import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendarAlt, FaCode, FaEye } from 'react-icons/fa';
import { projectsAPI } from '../services/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getById(id);
      setProject(data);
    } catch (err) {
      console.error('Error fetching project:', err);
      setError('Project not found');
      // Use sample project if API fails
      setProject({
        _id: id,
        title: 'Sample Project',
        description: 'This is a sample project description',
        longDescription: 'This is a detailed description of the project. It includes information about the challenges faced, solutions implemented, and technologies used. The project demonstrates various skills including frontend development, backend integration, database design, and user experience optimization.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        image: 'https://via.placeholder.com/800x400',
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        category: 'web',
        status: 'completed',
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="project-detail-container">
        <div className="loading-detail">
          <div className="loading-spinner"></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail-container">
        <div className="error-detail">
          <h2>Project Not Found</h2>
          <p>Sorry, the project you're looking for doesn't exist.</p>
          <button onClick={handleGoBack} className="btn btn-primary">
            <FaArrowLeft /> Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <motion.div
        className="project-detail"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="project-header">
          <button onClick={handleGoBack} className="back-button">
            <FaArrowLeft /> Back to Projects
          </button>
          
          <div className="project-title-section">
            <motion.h1
              className="project-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.p
              className="project-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>

        {/* Project Image */}
        <motion.div
          className="project-image-section"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <img src={project.image} alt={project.title} className="project-main-image" />
          <div className="project-overlay-actions">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-link github"
            >
              <FaGithub /> <span>View Code</span>
            </a>
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-link live"
              >
                <FaExternalLinkAlt /> <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Details */}
        <div className="project-details-grid">
          {/* Main Content */}
          <motion.div
            className="project-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <section className="project-section">
              <h3><FaEye /> Project Overview</h3>
              <p className="project-long-description">
                {project.longDescription || project.description}
              </p>
            </section>

            <section className="project-section">
              <h3><FaCode /> Technologies Used</h3>
              <div className="tech-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag-detail">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="project-sidebar"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="project-info-card">
              <h4>Project Info</h4>
              
              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <div>
                  <span className="info-label">Date</span>
                  <span className="info-value">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <FaCode className="info-icon" />
                <div>
                  <span className="info-label">Category</span>
                  <span className="info-value">
                    {project.category?.charAt(0).toUpperCase() + project.category?.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="info-item">
                <FaEye className="info-icon" />
                <div>
                  <span className="info-label">Status</span>
                  <span className={`status-badge ${project.status}`}>
                    {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="project-actions">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary action-btn"
              >
                <FaGithub /> View Source
              </a>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary action-btn"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;