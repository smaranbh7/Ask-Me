import React from 'react';
import Header from '../dashboard/_components/Header';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-6">About Ask Me</h1>
          
          <p className="mb-4 text-gray-700">
            Ask Me is an innovative AI-powered platform designed to help job seekers prepare for interviews with confidence. Our mission is to empower individuals to showcase their skills and land their dream jobs.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Our Features</h2>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>Personalized interview simulations based on job descriptions and experience levels</li>
            <li>Real-time feedback and scoring to help you improve</li>
            <li>Progress tracking to monitor your improvement over time</li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Our Team</h2>
          <p className="mb-4 text-gray-700">
            Aske Me is developed by Smaran Bhattarai, a Computer Science student. We're passionate about bridging the gap between job seekers and their ideal positions through innovative technology.
          </p>

          <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:bhsmaran@gmail.com" className="text-blue-600 hover:underline">bhsmaran@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;