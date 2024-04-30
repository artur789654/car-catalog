import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';
const Footer = () => {
  return (
    <footer className="py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Car Catalog</h5>
            <p>Your reliable partner in the world of cars.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div>
              <a href="https://facebook.com" className={`me-2 ${styles.footerIcon}`}>
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className={`me-2 ${styles.footerIcon}`}>
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className={`me-2 ${styles.footerIcon}`}>
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className={`${styles.footerIcon}`}>
                <FaLinkedinIn />
              </a>
            </div>
            <p>Contact us: info@car-catalog.com</p>
          </div>
        </div>
        <div className="text-center border-top pt-3 mt-3">
          <small>&copy; 2024 Car Catalog. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
