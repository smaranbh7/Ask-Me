import React from 'react';
import Header from '../dashboard/_components/Header';
import { Briefcase, Users, TrendingUp, Mail, BarChart } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3 text-primary">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary mb-8">About Ask Me</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Ask Me is an innovative AI-powered platform designed to help job seekers prepare for interviews with confidence. Our mission is to empower individuals to showcase their skills and land their dream jobs by providing personalized interview simulations and real-time feedback.
            </p>
          </div>

          <h2 className="text-3xl font-semibold text-primary text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FeatureCard 
              icon={<Briefcase className="w-8 h-8 text-blue-500" />}
              title="Personalized Simulations"
              description="Tailored interview simulations based on job descriptions and experience levels."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-green-500" />}
              title="Real-time Feedback"
              description="Instant feedback and scoring to help you improve your interview skills."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-purple-500" />}
              title="AI-powered Insights"
              description="Advanced AI algorithms to provide in-depth analysis of your responses."
            />
            <FeatureCard 
              icon={<BarChart className="w-8 h-8 text-orange-500" />}
              title="Interview Insights"
              description="Comprehensive analytics to identify your strengths and areas for improvement."
            />
          </div>

          <div className="bg-primary text-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Team</h2>
            <p className="text-lg leading-relaxed">
              Ask Me is developed by Smaran Bhattarai, a passionate Computer Science student dedicated to bridging the gap between job seekers and their ideal positions through innovative technology.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-semibold text-primary mb-4">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <a 
              href="mailto:bhsmaran@gmail.com" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
