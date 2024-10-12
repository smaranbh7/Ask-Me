import Link from 'next/link';
import { Button } from '../components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl mx-auto">
        <Image src="/logo.svg" alt="Ask Me Logo" width={200} height={50} className="mx-auto mb-8" />
        <h1 className="text-5xl font-bold text-primary mb-6">Welcome to Ask Me</h1>
        <p className="text-xl text-gray-700 mb-8">
          Your AI-powered mock interview assistant. Practice, improve, and ace your next job interview!
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-primary mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="AI-Powered Interviews"
            description="Experience realistic interview scenarios with our advanced AI technology."
          />
          <FeatureCard
            title="Personalized Feedback"
            description="Receive detailed feedback and suggestions to improve your interview skills."
          />
          <FeatureCard
            title="Track Your Progress"
            description="Monitor your improvement over time with comprehensive performance analytics."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
