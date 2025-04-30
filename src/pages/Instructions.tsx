
import React from 'react';
import Layout from '@/components/layout/Layout';

const Instructions = () => {
  return (
    <Layout>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-tech-dark-purple mb-6 animate-fade-in">
              How to Use Let's Connect
            </h1>
            
            <div className="prose prose-lg max-w-none">
              {/* For Visitors Section */}
              <section className="mb-12 animate-fade-in animation-delay-100">
                <h2 className="text-2xl font-bold text-tech-purple mb-4">
                  For Visitors
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray-700">
                      <span className="font-semibold">Browse Events:</span> Scroll down on the homepage to view upcoming tech events from universities and organizations worldwide.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Use Filters:</span> Narrow down events using the filter section. You can filter by:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Event type (hackathons, workshops, etc.)</li>
                        <li>College or organization</li>
                        <li>Date range</li>
                        <li>Online vs in-person events</li>
                      </ul>
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Search:</span> Use the search bar to find specific events by keywords.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">View Details:</span> Click on any event card to see the complete information, including description, location, date, time, and link to the event.
                    </li>
                  </ol>
                </div>
              </section>
              
              {/* For Registered Users Section */}
              <section className="mb-12 animate-fade-in animation-delay-200">
                <h2 className="text-2xl font-bold text-tech-purple mb-4">
                  For Registered Users
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray-700">
                      <span className="font-semibold">Create an Account:</span> Click "Sign In" in the navigation bar and choose "Sign Up" to create a new account, and confirm the
                       mail through your mailbox just click on the confirm mail link and the Signin.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Log In:</span> After registering, use your email and password to log in.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Submit Events:</span> Once logged in, click the "Add Event" button to submit new tech events. Fill out all required information and submit for review.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Track Submissions:</span> View your submitted events in the "Your Events" section. Each event will show its current status:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><span className="font-medium text-yellow-700">Pending:</span> Awaiting admin review</li>
                        <li><span className="font-medium text-green-700">Approved:</span> Visible to all users</li>
                        <li><span className="font-medium text-red-700">Rejected:</span> Not approved by admin</li>
                      </ul>
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">View Details:</span> Click "View Details" on any of your events to see complete information.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Sign Out:</span> Use the "Sign Out" button in the navigation bar when finished.
                    </li>
                  </ol>
                </div>
              </section>
              
              {/* For Admins Section */}
              <section className="animate-fade-in animation-delay-300">
                <h2 className="text-2xl font-bold text-tech-purple mb-4">
                  For Administrators
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal pl-6 space-y-4">
                    <li className="text-gray-700">
                      <span className="font-semibold">Admin Access:</span> Administrators will see an "Admin" link in the navigation bar after logging in.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Review Events:</span> The admin dashboard organizes events into three categories:
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Pending: New submissions requiring review</li>
                        <li>Approved: Events that have been approved</li>
                        <li>Rejected: Events that have been rejected</li>
                      </ul>
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Moderate Content:</span> Review event details and either approve or reject submissions based on relevance and appropriateness.
                    </li>
                    <li className="text-gray-700">
                      <span className="font-semibold">Manage Events:</span> Update event details or permanently remove inappropriate content if necessary.
                    </li>
                  </ol>
                </div>
              </section>
            </div>
            
            {/* Help & Support Section */}
            <div className="mt-16 bg-tech-soft-purple p-8 rounded-lg text-center animate-fade-in animation-delay-400">
              <h2 className="text-2xl font-bold text-tech-dark-purple mb-4">Need More Help?</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions or need assistance using Let's Connect, feel free to reach out to our support team.
              </p>
              <div className="flex justify-center">
                <a href="/contact" className="bg-tech-purple hover:bg-tech-dark-purple text-white px-6 py-3 rounded-md transition-colors">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Instructions;
