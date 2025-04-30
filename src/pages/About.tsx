
import React from 'react';

const About = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-tech-dark-purple mb-6 animate-fade-in">About Let's Connect</h1>
          
          <div className="prose prose-lg max-w-none animate-fade-in animation-delay-100">
            <p className="text-gray-700 mb-6 leading-relaxed">
              Let's Connect is a platform dedicated to connecting students, professionals, and tech enthusiasts with high-quality
              educational events in the technology sector. We believe that knowledge-sharing and community-building are essential
              for fostering innovation and growth in the tech industry.
            </p>
            
            <h2 className="text-2xl font-bold text-tech-purple mt-10 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our mission is to make tech education more accessible by creating a centralized hub for discovering events from 
              top universities and organizations. We aim to build bridges between educational institutions, industry leaders, 
              and individuals passionate about technology.
            </p>
            
            <h2 className="text-2xl font-bold text-tech-purple mt-10 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>A comprehensive database of tech talks, workshops, hackathons, and conferences</li>
              <li>Filtering capabilities to find events that match your interests and schedule</li>
              <li>Information about both in-person and online events for maximum accessibility</li>
              <li>A platform for universities and organizations to promote their educational initiatives</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-tech-purple mt-10 mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Let's Connect was founded by a group of tech enthusiasts who experienced firsthand the challenge of 
              finding relevant tech events. Our team consists of professionals with backgrounds in education, 
              technology, and event management, all united by the goal of making tech education more accessible.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-16 mt-16 animate-fade-in animation-delay-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-tech-dark-purple mb-6">Join Our Community</h2>
            <p className="text-gray-700 mb-8">
              Whether you're a student looking to learn new skills, a professional seeking to stay updated with industry trends,
              or an organization wanting to share knowledge, Let's Connect is the platform for you.
            </p>
            <button className="bg-tech-purple hover:bg-tech-dark-purple text-white px-8 py-3 rounded-md transition-colors">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
