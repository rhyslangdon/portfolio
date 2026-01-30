import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaDatabase, FaCode, FaPalette, FaMobile } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = [
    { name: 'Frontend Development', icon: FaReact, description: 'React, Vue.js, HTML5, CSS3, JavaScript' },
    { name: 'Backend Development', icon: FaNodeJs, description: 'Node.js, Express.js, RESTful APIs' },
    { name: 'Database Management', icon: FaDatabase, description: 'MongoDB, PostgreSQL, MySQL' },
    { name: 'Programming Languages', icon: FaCode, description: 'JavaScript, Java, C#, HTML, CSS' },
    { name: 'UI/UX Design', icon: FaPalette, description: 'Figma, Adobe Suite, Responsive Design' },
    { name: 'Mobile Development', icon: FaMobile, description: 'React Native, Flutter' }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer with over 3 years of experience 
                creating digital solutions that make a difference. I specialize in 
                building scalable web applications using modern technologies.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or sharing knowledge with the 
                developer community.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>100%</h3>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="skills-section">
            <h3>Skills & Expertise</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="skill-icon">
                    <skill.icon />
                  </div>
                  <h4>{skill.name}</h4>
                  <p>{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;