'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  UserCircle,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  Code2
} from 'lucide-react';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30'>
      
      {/* --- ENHANCED & LARGER GLASS NAVBAR --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 
        ${
          isScrolled || isMobileMenuOpen
            ? 'bg-slate-950/60 backdrop-blur-2xl border-b border-white/10 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.9)]'
            : 'bg-transparent py-8'
        }`}
      >
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <div className='group relative'>
            <div className='absolute -inset-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-65 group-hover:opacity-30 transition duration-700'></div>
            <Link
              to='/'
              className='relative flex items-center space-x-3'
            >
              <GraduationCap className='h-8 w-8 text-cyan-400' />
              <span className='text-2xl font-black tracking-tighter text-cyan-400'>
                Admission<span className='text-slate-50'>PRO</span>
              </span>
            </Link>
          </div>

          <div className='hidden md:flex items-center space-x-10'>
            <Link
              to='/student/login'
              className='text-base font-semibold text-slate-300 hover:text-cyan-400 transition-colors tracking-wide'
            >
              Login
            </Link>
            <Button
              asChild
              className='bg-cyan-500/90 text-slate-950 font-black hover:bg-cyan-400 backdrop-blur-md border-none px-8 py-6 text-base rounded-xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105'
            >
              <Link to='/student/signup'>Sign Up Free</Link>
            </Button>
          </div>

          <button
            className='md:hidden p-2 text-slate-300 transition-transform active:scale-90'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
        >
          <div className='flex flex-col space-y-5 pb-6 px-2'>
            <Link
              to='/student/login'
              className='text-xl font-bold text-slate-300 border-b border-white/5 pb-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Button
              asChild
              className='w-full bg-cyan-500 text-slate-950 font-black h-14 text-lg'
            >
              <Link
                to='/student/signup'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up Free
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className='relative pt-44 pb-20 px-4 md:px-6 max-w-7xl mx-auto'>
        {/* BACKGROUND GLOW */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[400px] bg-cyan-500/10 blur-[80px] md:blur-[120px] rounded-full -z-10'></div>

        {/* HERO SECTION */}
        <div className='flex flex-col items-center text-center mb-20 md:mb-32'>
          {/* NEXT-GEN BADGE */}
          <div className='inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full mb-8'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-cyan-500'></span>
            </span>
            <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-cyan-400'>
              Next-Gen Admission Infrastructure
            </span>
          </div>

          <h1 className='text-4xl md:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-[1.1]'>
            Your journey to <span className='text-cyan-400'>higher education  </span>starts
            <span className='text-cyan-400'> <br className='hidden md:block' />Here.</span>.....
          </h1>
          <p className='text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed'>
            The simplest way to manage university applications, track admission
            status, and pay fees—all in one secure, high-performance dashboard.
          </p>
          <Button
            asChild
            size='lg'
            className='w-full sm:w-auto h-14 md:h-16 px-10 rounded-2xl text-lg font-bold bg-white text-slate-950 hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95'
          >
            <Link to='/student/signup'>Launch Your Future</Link>
          </Button>
        </div>

        {/* --- STUDENT EXPERIENCE --- */}
        <section className='mb-24 md:mb-40'>
          <div className='flex flex-col items-center text-center mb-10 md:mb-16'>
            <UserCircle className='w-8 h-8 text-cyan-400 mb-4' />
            <h2 className='text-3xl md:text-5xl font-bold mb-4'>
              The Student Experience
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            <div className='p-8 rounded-3xl bg-slate-900/40 border border-cyan-400 backdrop-blur-md flex flex-col justify-center lg:col-span-1 min-h-[250px]'>
              <h3 className='text-2xl font-bold mb-6 text-cyan-400'>
                Streamlined Flow
              </h3>
              <ul className='space-y-4'>
                {[
                  'personal Course feed ',
                  ' easy apply and upload documents',
                  'Merit Check',
                  'easy payment ',
                  'real time update',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-center gap-3 text-slate-300 text-sm md:text-base'
                  >
                    <CheckCircle2 className='text-cyan-400 w-5 h-5 flex-shrink-0' />{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Student Images with Persistent Descriptions */}
            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='src/assets/student1.png'
                alt='docs'
                className='w-full h-full '
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Real time course feed
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/student2.png'
                alt='Docs'
                className='w-full h-full'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Secure digital vault for all your academic transcripts and
                  IDs.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/student3.png'
                alt='Status'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Direct communication channel with university admission
                  officers.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/student4.png'
                alt='Match'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Smart course matching based on your grades and interests.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/student5.png'
                alt='Pay'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Seamless and secure tuition fee payment gateway.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ADMIN COMMAND CENTER --- */}
        <section className='mb-20'>
          <div className='flex flex-col items-center text-center mb-10 md:mb-16'>
            <ShieldCheck className='w-8 h-8 text-blue-400 mb-4' />
            <h2 className='text-3xl md:text-5xl font-bold mb-4'>
              Admin Command Center
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            {/* Admin Images with Persistent Descriptions */}
            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/admin1.png'
                alt='Panel'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Comprehensive analytics dashboard for enrollment trends.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/admin2.png'
                alt='Bulk'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Bulk processing tools for high-volume application cycles.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/admin3.png'
                alt='Audit'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Automated compliance check and document verification.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/admin4.png'
                alt='Manage'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Multi-campus management from a single administrator login.
                </p>
              </div>
            </div>

            <div className='group relative aspect-video rounded-3xl overflow-hidden border border-cyan-400 bg-slate-900'>
              <img
                src='/src/assets/admin5.png'
                alt='Finance'
                className='w-full h-full object-cover opacity-80'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-5'>
                <p className='text-xs md:text-sm text-cyan-400 font-bold'>
                  Financial auditing and revenue tracking modules.
                </p>
              </div>
            </div>

            <div className='p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md flex flex-col justify-center lg:col-span-1 min-h-[250px]'>
              <h3 className='text-2xl font-bold mb-6 text-blue-400'>
                Institutional Power
              </h3>
              <ul className='space-y-4'>
                {[
                  'Bulk Processing',
                  'Easy Audit',
                  'Real time application analysis',
                  'Multi-Campus',
                  'Role Control',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-center gap-3 text-slate-300 text-sm md:text-base'
                  >
                    <CheckCircle2 className='text-blue-400 w-5 h-5 flex-shrink-0' />{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* --- ENHANCED FOOTER WITH TEAM CREDITS --- */}
      <footer className='py-16 border-t border-white/5 bg-slate-950'>
        <div className='max-w-7xl mx-auto px-6 flex flex-col items-center'>
          <div className='flex items-center space-x-2 mb-6 group cursor-default'>
            <Code2 className='w-5 h-5 text-cyan-500 transition-transform group-hover:rotate-12' />
            <span className='text-slate-400 text-sm font-medium tracking-tight'>
              Developed with passion by <span className='text-white font-bold hover:text-cyan-400 transition-colors'>AdmissionPRO Engineering Team</span>
            </span>
          </div>



        <div>   
          



          
        <div className='text-center mb-16'>
          <h2 className='text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4'>
            <span className='block'>For more information</span>
            <span className='block text-cyan-400'>Contact Us.</span>
          </h2>
        </div>

      
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
         
          <div className='bg-gray-800 p-10 rounded-2xl shadow-2xl border border-cyan-400'>
            <h3 className='text-4xl font-extrabold text-cyan-400 mb-4 text-center'>
              Sayan Sarkar
            </h3>
            <div className='flex justify-center space-x-8'>
              {/* Email Link */}
              <a
                href='mailto:sayns2069@email.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors duration-300'>
                  Email
                </span>
              </a>

              {/* LinkedIn Link */}
              <a
                href='https://www.linkedin.com/in/sayansarkar2005/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 9h4v12H4zM6 6a2 2 0 100-4 2 2 0 000 4z'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors duration-300'>
                  LinkedIn
                </span>
              </a>

              {/* GitHub Link */}
              <a
                href='https://github.com/SAYANui'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 19c-5 1.5-9-2-9-5 0-3.5 3.5-5 5-5.5.5-2.5 2-4 2-4 1.5-1.5 4-.5 6 0 1 1 2 2 2 4 0 2 1 4 2 4.5 1.5.5 5 2 5 5 0 3-4 6.5-9 5.5'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors duration-300'>
                  GitHub
                </span>
              </a>
            </div>
          </div>

          {/* Ardish Bose Contact Card */}
          <div className='bg-gray-800 p-10 rounded-2xl shadow-2xl border border-cyan-400'>
            <h3 className='text-4xl font-extrabold text-cyan-400 mb-4 text-center'>
              Ardish Bose
            </h3>
            <div className='flex justify-center space-x-8'>
              {/* Email Link  */}
              <a
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors duration-300'>
                  Email
                </span>
              </a>

              {/* LinkedIn Link*/}
              <a
                href='/'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 9h4v12H4zM6 6a2 2 0 100-4 2 2 0 000 4z'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors duration-300'>
                  LinkedIn
                </span>
              </a>

              {/* GitHub Link */}
              <a
                href='https://github.com/Ardish4'
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center group cursor-pointer p-4 transition duration-300 hover:scale-105'
              >
                <svg
                  className='w-10 h-10 sm:w-12 sm:h-12 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9 19c-5 1.5-9-2-9-5 0-3.5 3.5-5 5-5.5.5-2.5 2-4 2-4 1.5-1.5 4-.5 6 0 1 1 2 2 2 4 0 2 1 4 2 4.5 1.5.5 5 2 5 5 0 3-4 6.5-9 5.5'
                  ></path>
                </svg>
                <span className='mt-2 text-sm font-medium text-gray-400 group-hover:text-cyan-400 transition-colors duration-300'>
                  GitHub
                </span>
              </a>
            </div>
          </div>
        </div>

          
          
          
          
          
          
          </div>


<br>
</br>


          <div className='text-slate-600 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold'>
           <p> &copy; {new Date().getFullYear()} AdmissionPRO. All Rights Reserved.</p> 
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;