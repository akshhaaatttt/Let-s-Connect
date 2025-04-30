
import React from 'react';
import Hero from '@/components/home/Hero';
import Statistics from '@/components/home/Statistics';
import { EventProvider } from '@/context/EventContext';
import TechEventsLayout from '@/components/TechEventsLayout';

const Home = () => {
  return (
    <>
      <Hero />
      <Statistics />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-tech-dark-purple">
            Upcoming Events
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Browse through our curated list of tech events from top universities and organizations
          </p>
          <EventProvider>
            <TechEventsLayout />
          </EventProvider>
        </div>
      </div>
    </>
  );
};

export default Home;
