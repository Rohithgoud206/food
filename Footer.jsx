import React from 'react'
import './Footer.css';
import { assets } from '../../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
          <div className="footer-content-left">
              <img src={assets.logo} />
              <p>Taste the Joy, Share the Love. Join us on a culinary journey where every dish is crafted with passion and served with care. Whether you're here for a quick bite or a gourmet experience, we promise to delight your taste buds and warm your heart. Thank you for being part of our food family.</p>
              <div className="footer-social-icons">
                 <img src={assets.facebook_icon}  alt='facebook-icon'/>
                 <img src={assets.twitter_icon}  alt='facebook-icon'/>
                 <img src={assets.linkedin_icon}  alt='facebook-icon'/>
              </div>
          </div>
          <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
              </ul>
          </div>
          <div className="footer-content-right">
               <h2>GET IN TOUCH</h2>
               <ul>
                 <li>+1-212-456-7868</li>
                 <li>contact@tomato.com</li>
               </ul>
          </div>
       </div>
       <hr />
       <p className="footer-copyright">
        © 2021 Tomato. All rights reserved.
       </p>
    </div>
  )
}

export default Footer
