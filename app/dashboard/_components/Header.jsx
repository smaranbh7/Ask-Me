"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
   
  ];

  return (
    <header className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <Link href="/dashboard" className="flex items-center">
            <Image src="/logo.svg" className='cursor-pointer' width={160} height={100} alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span className={`text-base font-medium transition-colors duration-200 ease-in-out
                  ${path === item.path 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-gray-600 hover:text-primary'
                  }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='text-gray-600 hover:text-primary'>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <div className='hidden md:block'>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className='md:hidden bg-white py-4'>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <span className={`block px-4 py-2 text-base font-medium transition-colors duration-200 ease-in-out
                ${path === item.path 
                  ? 'text-primary bg-gray-100' 
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}>
                {item.name}
              </span>
            </Link>
          ))}
          <div className='px-4 py-2'>
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
