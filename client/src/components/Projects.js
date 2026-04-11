import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Projects.css';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction > 0 ? -140 : 140,
    opacity: 0
  })
};

const Projects = () => {
  const MOBILE_FADE_DURATION = 220;
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);
  const [isMobileFading, setIsMobileFading] = useState(false);
  const mobileFadeTimeoutRef = useRef(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(process.env.PUBLIC_URL + '/projects/projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0 && currentIndex >= projects.length) {
      setCurrentIndex(0);
    }
  }, [projects, currentIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (mobileFadeTimeoutRef.current) {
        window.clearTimeout(mobileFadeTimeoutRef.current);
      }
    };
  }, []);

  const runMobileFadeTransition = (getNextIndex, nextDirection) => {
    if (isMobileFading || projects.length === 0) return;

    setDirection(nextDirection);
    setIsMobileFading(true);

    mobileFadeTimeoutRef.current = window.setTimeout(() => {
      setCurrentIndex((prevIndex) => getNextIndex(prevIndex));
      window.requestAnimationFrame(() => {
        setIsMobileFading(false);
      });
    }, MOBILE_FADE_DURATION);
  };

  const goToPrevious = () => {
    if (isMobile) {
      runMobileFadeTransition((i) => (i === 0 ? projects.length - 1 : i - 1), -1);
      return;
    }

    setDirection(-1);
    setCurrentIndex((i) => (i === 0 ? projects.length - 1 : i - 1));
  };

  const goToNext = () => {
    if (isMobile) {
      runMobileFadeTransition((i) => (i === projects.length - 1 ? 0 : i + 1), 1);
      return;
    }

    setDirection(1);
    setCurrentIndex((i) => (i === projects.length - 1 ? 0 : i + 1));
  };

  const goToIndex = (index) => {
    if (index === currentIndex) return;

    if (isMobile) {
      runMobileFadeTransition(() => index, index > currentIndex ? 1 : -1);
      return;
    }

    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
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
          
          {projects.length > 0 && (
            <div className="projects-carousel">
              {isMobile ? (
                <div className={`project-card mobile-project-card ${isMobileFading ? 'is-fading' : ''}`}>
                  <div className="project-image-container">
                    <img
                      src={projects[currentIndex].image}
                      alt={projects[currentIndex].title}
                      className="project-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="project-overlay">
                      {/* <div className="project-links">
                        <a
                          href={projects[currentIndex].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <FaGithub />
                        </a>
                        {projects[currentIndex].liveUrl && (
                          <a
                            href={projects[currentIndex].liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div> */}
                    </div>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{projects[currentIndex].title}</h3>
                    <p className="project-description">{projects[currentIndex].description}</p>

                    <div className="project-technologies">
                      {projects[currentIndex].technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/project/${projects[currentIndex]._id}`}
                      className="btn btn-secondary project-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ) : (
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={projects[currentIndex]._id}
                    className="project-card"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <div className="project-image-container">
                      <img
                        src={projects[currentIndex].image}
                        alt={projects[currentIndex].title}
                        className="project-image"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="project-overlay">
                        {/* <div className="project-links">
                          <a
                            href={projects[currentIndex].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            <FaGithub />
                          </a>
                          {projects[currentIndex].liveUrl && (
                            <a
                              href={projects[currentIndex].liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-link"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          )}
                        </div> */}
                      </div>
                    </div>

                    <div className="project-content">
                      <h3 className="project-title">{projects[currentIndex].title}</h3>
                      <p className="project-description">{projects[currentIndex].description}</p>

                      <div className="project-technologies">
                        {projects[currentIndex].technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/project/${projects[currentIndex]._id}`}
                        className="btn btn-secondary project-btn"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              <button
                type="button"
                className="carousel-control carousel-control-left"
                onClick={goToPrevious}
                aria-label="Previous project"
              >
                <FaChevronLeft />
              </button>

              <button
                type="button"
                className="carousel-control carousel-control-right"
                onClick={goToNext}
                aria-label="Next project"
              >
                <FaChevronRight />
              </button>

              <div className="carousel-indicators">
                {projects.map((project, index) => (
                  <button
                    key={project._id}
                    type="button"
                    className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => goToIndex(index)}
                    aria-label={`Go to ${project.title}`}
                  />
                ))}
              </div>
            </div>
          )}

          {projects.length === 0 && (
            <div className="no-projects">
              <p>No projects found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;