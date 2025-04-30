
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-tech-purple flex items-center justify-center">
                <span className="text-white font-bold">TG</span>
              </div>
              <span className="font-bold text-xl text-tech-purple">Let's Connect</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Connecting students with tech events from top universities and organizations around the world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Event Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Tech Talks
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/" className="text-muted-foreground hover:text-tech-purple transition-colors">
                  Conferences
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Connected</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on the latest tech events.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="bg-tech-purple text-white px-4 py-2 rounded-md hover:bg-tech-dark-purple transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Let's Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-tech-purple transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-tech-purple transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-tech-purple transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
