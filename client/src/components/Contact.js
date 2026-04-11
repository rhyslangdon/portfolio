import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const canUseEmailJS = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

const buildMailtoLink = ({ name, email, subject, message }) => {
  const mailSubject = subject || 'Portfolio inquiry';
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message
  ].join('\n');

  return `mailto:rhyslangdon@hotmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      if (canUseEmailJS) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message
          },
          EMAILJS_PUBLIC_KEY
        );

        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully. I\'ll get back to you soon.'
        });
      } else {
        window.location.href = buildMailtoLink(formData);
        setSubmitStatus({
          type: 'success',
          message: 'Your email app has been opened with a pre-filled message.'
        });
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus({
        type: 'error',
        message: canUseEmailJS
          ? 'Failed to send message. Please try again or email me directly.'
          : 'Unable to open your email app. Please email me directly at rhyslangdon@hotmail.com.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'rhyslangdon@hotmail.com',
      link: 'mailto:rhyslangdon@hotmail.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      value: 'Available upon request',
      link: null
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Halifax, NS, Canada',
      link: null
    }
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
          {!canUseEmailJS && (
            <p className="contact-subtitle contact-subtitle-mailto">
              This form opens your email app with a pre-filled message.
            </p>
          )}
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>
                I'm always open to discussing new opportunities, interesting projects,
                or just having a friendly conversation about technology and development.
              </p>
              
              <div className="contact-methods">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="contact-method"
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="contact-icon">
                      <info.icon />
                    </div>
                    <div className="contact-details">
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link}>{info.value}</a>
                      ) : (
                        <span>{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              
              {submitStatus.message && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button 
                type="submit" 
                className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                <FaPaperPlane className="submit-icon" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;