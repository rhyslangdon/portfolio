import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(process.env.PUBLIC_URL + '/projects/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const projects = await response.json();
        const selectedProject = projects.find((item) => String(item._id) === String(id));

        if (!selectedProject) {
          setError('Project not found');
          setProject(null);
          return;
        }

        setProject(selectedProject);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Project not found');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

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
            
            {/* <motion.p
              className="project-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {project.description}
            </motion.p> */}
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
              <h3>Project Overview</h3>
              <p className="project-long-description">
                {project.longDescription || project.description}
              </p>
            </section>

            <section className="project-section">
              <h3>Technologies Used</h3>
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
            <div className="project-actions">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary action-btn"
                >
                  <FaGithub /> View Source
                </a>
              )}
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