"use client"
import React from 'react';
import Image from 'next/image'; 
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const path = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    // You can add more navigation items here
  ];

  return (
    <div className='flex p-4 items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-100 shadow-sm'>
      <Link href="/dashboard">
        <Image src="/logo.svg" className='cursor-pointer' width={160} height={100} alt="logo" />
      </Link>
      <ul className='hidden md:flex gap-6'>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <span className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                ${path === item.path ? 'text-primary font-bold' : 'text-gray-700'}
              `}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
