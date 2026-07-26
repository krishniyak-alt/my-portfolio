import React from 'react';
import Navbar from './Navbar';
import ParticleBackground from './ParticleBackground';
import Footer from './Footer';
import EditBar from './EditBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <EditBar />
      <main className="flex-grow pt-16 flex flex-col z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
