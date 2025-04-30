
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };
  
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-tech-dark-purple mb-6 text-center animate-fade-in">Contact Us</h1>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto animate-fade-in animation-delay-100">
            Have questions, suggestions, or want to partner with us? We'd love to hear from you!
            Fill out the form below and our team will get back to you soon.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 animate-fade-in animation-delay-200">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-tech-purple mb-6">Get in Touch</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this regarding?" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    rows={5} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-tech-purple hover:bg-tech-dark-purple">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-tech-purple mb-6">Our Information</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-700">
                    123 Tech Boulevard<br />
                    Innovation District<br />
                    San Francisco, CA 94105
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Contact Info</h3>
                  <p className="text-gray-700">
                    Email: info@Let's Connect.com<br />
                    Phone: (123) 456-7890
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Office Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday & Sunday: Closed
                  </p>
                </div>
              </div>
              
              <div className="mt-10 bg-tech-soft-purple p-6 rounded-lg">
                <h3 className="font-bold text-tech-dark-purple mb-2">Join Our Team</h3>
                <p className="text-gray-700 mb-4">
                  Interested in working with us? We're always looking for talented individuals to join our team!
                </p>
                <Button variant="outline" className="border-tech-purple text-tech-purple hover:bg-tech-purple hover:text-white">
                  View Open Positions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
