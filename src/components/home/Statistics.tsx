
import React, { useState, useEffect } from 'react';
import { Calendar, Users, BarChart2 } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  duration: number;
}

const StatCounter: React.FC<StatProps> = ({ icon, value, label, duration }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const step = value / (duration / 16); // 60fps
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="bg-tech-soft-purple p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-tech-purple mb-2">{count.toLocaleString()}+</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const Statistics = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-tech-dark-purple">
          Our Growing Community
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Join thousands of students and professionals connecting through tech events worldwide
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCounter
            icon={<Calendar className="h-8 w-8 text-tech-purple" />}
            value={500}
            label="Events Hosted"
            duration={2000}
          />
          <StatCounter
            icon={<Users className="h-8 w-8 text-tech-purple" />}
            value={10000}
            label="Attendees"
            duration={2000}
          />
          <StatCounter
            icon={<BarChart2 className="h-8 w-8 text-tech-purple" />}
            value={50}
            label="Partner Universities"
            duration={2000}
          />
        </div>
      </div>
    </section>
  );
};

export default Statistics;
