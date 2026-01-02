import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";



const Contact = () => {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  inquiryType: "",
  subject: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(null);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.inquiryType ||
    !formData.subject ||
    !formData.message
  ) {
    setStatus("❌ Please fill all fields");
    return;
  }

  try {
    setLoading(true);
    setStatus(null);

    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("✅ Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        inquiryType: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus(`❌ ${data.message}`);
    }
  } catch {
    setStatus("❌ Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="contact-page">
        <div className="back-home">
        <Link to="/" className="back-btn">← Back to Home</Link>
         </div>

      <div className="contact-container">

        {/* LEFT SIDE — CONTACT FORM */}
        <div className="contact-form">
          <h2 className="text-blue-300 font-bold">Send us a Message</h2>
          <p className="subtitle">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required>
              <option value="">Select Inquiry Type</option>
              <option value="general">General Inquiry</option>
              <option value="feedback">Feedback</option>
              <option value="support">Support</option>
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Brief subject of your message"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Please provide details about your inquiry..."
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading} className="send-btn">
              {loading ? ("Sending..."
              ) : (
                <>
                  Send Message
                  <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
                </>
                )}
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </div>

        {/* RIGHT SIDE — INFO CARDS */}
        <div className="contact-info">

          {/* CARD 1 — GET IN TOUCH */}
          <div className="info-card">
            <h3 className="text-blue-300 font-bold">Get in Touch</h3>

            <p>Email</p>
            <span>sakshikuthe336@gmail.com</span>
            

            <p>Phone</p>
            <span>+91 9834930206</span>
            

            <p>Address</p>
            <span>123 News Street</span>
            <span>Media City, Nagpur-441108</span>
          </div>

          {/* CARD 2 — FOLLOW US */}
          <div className="info-card">
            <h3 className="text-blue-300 font-bold">Follow Us</h3>
            <div className="social-buttons icons">
  <a
    href="https://www.instagram.com/_saksheehh_"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
  >
    <FontAwesomeIcon icon={faInstagram} />
  </a>

  <a
    href="https://www.linkedin.com/in/sakshi-kuthe-49869124b"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
  >
    <FontAwesomeIcon icon={faLinkedin} />
  </a>

  <a
    href="https://github.com/sak033"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub"
  >
    <FontAwesomeIcon icon={faGithub} />
  </a>

  <a
    href="mailto:sakshikuthe336@gmail.com"
    aria-label="Email"
  >
    <FontAwesomeIcon icon={faEnvelope} />
  </a>
</div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
