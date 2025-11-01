import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import api from "../services/api";
import "./footer.css";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '', phoneVisible: false });
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await api.settings.getAll();
      if (data.length > 0) {
        const settings = data[0];
        setContactInfo({
          email: settings.email || 'contact@prozecto.com',
          phone: settings.phone || '+91-9876543210',
          phoneVisible: settings.phoneVisible || false
        });
        setSocialMedia(settings.socialMedia || []);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setContactInfo({ email: 'contact@prozecto.com', phone: '+91-9876543210', phoneVisible: false });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-10">
        {/* Company Info */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-4 font-montserrat">
            Prozecto
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Where innovation meets precision. We craft scalable, future-ready
            digital solutions — from software and websites to creative design
            and automation — helping businesses thrive in today’s digital era.
          </p>
          <div className="space-y-2 text-sm">
            <p>📧 {contactInfo.email}</p>
            {contactInfo.phoneVisible && <p>📞 {contactInfo.phone}</p>}
            <p>🌍 India</p>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="rolling-link">
                <span>Coding & Development</span>
                <span>Coding & Development</span>
              </a>
            </li>
            <li>
              <a href="#" className="rolling-link">
                <span>Website Design & Development</span>
                <span>Website Design & Development</span>
              </a>
            </li>
            <li>
              <a href="#" className="rolling-link">
                <span>App Development</span>
                <span>App Development</span>
              </a>
            </li>
            <li>
              <a href="#" className="rolling-link">
                <span>Software Development</span>
                <span>Software Development</span>
              </a>
            </li>
            <li>
              <a href="#" className="rolling-link">
                <span>Microsoft Excel Solutions</span>
                <span>Microsoft Excel Solutions</span>
              </a>
            </li>
            <li>
              <a href="#" className="rolling-link">
                <span>Graphic Design</span>
                <span>Graphic Design</span>
              </a>
            </li>
            <li>
              <a href="#" className="rolling-link">
                <span>Video Editing</span>
                <span>Video Editing</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about-us" className="rolling-link">
                <span>About Us</span>
                <span>About Us</span>
              </Link>
            </li>

            <li>
              <Link to="/mission" className="rolling-link">
                <span>Mission</span>
                <span>Mission</span>
              </Link>
            </li>
            <li>
              <Link to="/vision" className="rolling-link">
                <span>Vision</span>
                <span>Vision</span>
              </Link>
            </li>
            <li>
              <Link to="/blog" className="rolling-link">
                <span>Blog</span>
                <span>Blog</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Legal */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Support & Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/get-quote" className="rolling-link">
                <span>Get a Quote</span>
                <span>Get a Quote</span>
              </Link>
            </li>
            <li>
              <Link to="/faq" className="rolling-link">
                <span>FAQ</span>
                <span>FAQ</span>
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="rolling-link">
                <span>Terms & Conditions</span>
                <span>Terms & Conditions</span>
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="rolling-link">
                <span>Privacy Policy</span>
                <span>Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="rolling-link">
                <span>Refund Policy</span>
                <span>Refund Policy</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Prozecto. All rights reserved | Made with ❤️ by the Prozecto Team
        </p>
        <div className="flex gap-6 mt-4 md:mt-0">
          {socialMedia.map((social, index) => {
            const IconComponent = {
              facebook: FaFacebookF,
              twitter: FaTwitter,
              linkedin: FaLinkedinIn,
              instagram: FaInstagram,
              youtube: FaYoutube
            }[social.platform.toLowerCase()] || FaFacebookF;
            
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
                title={social.platform}
              >
                <IconComponent />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
