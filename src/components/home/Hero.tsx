
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-tech-soft-purple to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tech-dark-purple mb-6 leading-tight">
              Discover Amazing<br /> 
              <span className="text-tech-purple">Tech Events</span> Near You
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
              Connect with tech talks, hackathons, and workshops from top universities and organizations worldwide. <br />
              First Check "How to Use" Section in Navbar
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-tech-purple hover:bg-tech-dark-purple text-lg px-8 py-6" size="lg">
                <Link to="/">Explore Events</Link>
              </Button>
              <Button variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-soft-purple text-lg px-8 py-6" size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fade-in animation-delay-300">
            <div className="relative">
              <div className="bg-tech-light-purple rounded-lg p-6 shadow-xl transform rotate-3 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Tech Conference" 
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="bg-tech-purple rounded-lg p-6 shadow-xl transform -rotate-3 absolute -bottom-4 -left-4 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Hackathon" 
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
