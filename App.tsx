
import React, { useState, useEffect } from 'react';
import { AppTab, ResumeTemplate, ProjectTemplate } from './types';
import { RESUMES, PROJECTS, RESUME_BRANCHES, RESUMES_BY_BRANCH, Branch } from './constants';
import { 
  HomeIcon, 
  ResumesIcon, 
  ProjectsIcon, 
  JobsIcon, 
  LockIcon, 
  SearchIcon, 
  UserIcon, 
  MapPinIcon,
  PlayIcon
} from './components/Icons';

// --- Shared Components ---

const Button = ({ children, onClick, variant = 'primary', className = '' }: any) => {
  const base = "px-4 py-2 rounded-lg font-bold transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2";
  const variants: any = {
    primary: "bg-orange-400 text-white hover:bg-orange-500",
    secondary: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 my-6">
    <h2 className="text-slate-800 font-bold whitespace-nowrap text-lg">{title}</h2>
    <div className="h-[2px] w-full bg-slate-300"></div>
  </div>
);

// --- Top Navigation Bar ---

const TopNavbar = ({ scrolled }: { scrolled: boolean }) => (
  <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white z-50 border-b transition-all duration-300 ${scrolled ? 'border-slate-200 shadow-2xl' : 'border-slate-200/50 shadow-md'}`}>
    <div className="flex justify-between items-center px-5 h-16">
      {/* Brand Logo */}
      <div className="flex items-center">
        <span className="text-lg font-bold text-blue-600 tracking-wide">by collegewishlist!</span>
      </div>
      
      {/* Watch Demo Button */}
      <button className="flex items-center gap-2 bg-orange-500 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95">
        <PlayIcon className="w-4 h-4 fill-white" />
        <span className="text-sm font-bold">Watch Demo</span>
      </button>
    </div>
  </div>
);

// --- Sticky Search Bar (appears on scroll) ---

const StickySearchBar = ({ scrollProgress }: { scrollProgress: number }) => {
  const isVisible = scrollProgress > 0.3;
  const opacity = Math.min(scrollProgress - 0.3) / 0.2;
  
  return (
    <div 
      className="fixed top-16 left-1/2 -translate-x-1/2 w-full max-w-md bg-gradient-to-b from-blue-50 to-blue-50/80 backdrop-blur-sm z-40 border-b border-slate-200/40 transition-all duration-300"
      style={{ 
        opacity: isVisible ? opacity : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <SearchIcon className="w-5 h-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search Your Resume Domain" 
          className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 shadow-md focus:ring-2 focus:ring-slate-900 outline-none placeholder:text-slate-400 font-medium text-slate-800 transition-none"
        />
      </div>
    </div>
  );
};

// --- Sticky Purchase CTA Button ---

const StickyPurchaseCTA = () => (
  <button className="fixed bottom-[41px] left-4 right-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-half h-14 shadow-xl transition-all active:scale-[0.97] flex items-center justify-center text-base font-bold z-30">
    Unlock All for ₹499
  </button>
);

// --- Collapsing Hero Header ---

const Header = ({ scrollProgress }: { scrollProgress: number }) => {
  const heroHeight = Math.max(120, 200 - scrollProgress * 80);
  const showUserCard = scrollProgress < 0.5;
  const userCardOpacity = Math.max(0, 1 - scrollProgress * 2);
  const marginTopValue = scrollProgress > 0.3 ? 8 : 24;
  const searchBarOpacity = Math.max(0, 1 - (scrollProgress - 0.3) / 0.2);
  
  return (
    <div className="pt-16">
      <div 
        className="bg-blue-100 p-6 rounded-b-[40px] shadow-sm relative z-10 overflow-hidden"
        style={{ 
          minHeight: `${heroHeight}px`,
          transition: 'none'
        }}
      >
        <div 
          className="flex justify-between items-start mb-4 overflow-hidden"
          style={{ 
            opacity: userCardOpacity,
            transform: `translateY(${-scrollProgress * 30}px)`,
            transition: 'none'
          }}
        >
          <div>
            <p className="text-white-700 font-medium">Resume in</p>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">1 Minute</h1>
          </div>
          {showUserCard && (
            <div className="flex items-center gap-2 bg-white/20 p-1 pr-3 rounded-full border border-white/30 cursor-pointer">
              <div className="bg-white p-1 rounded-full text-slate-900">
                <UserIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-900">Kapil Mahajan!</span>
            </div>
          )}
        </div>
        
        <div 
          className="relative"
          style={{ 
            marginTop: `${marginTopValue}px`,
            transition: 'none',
            opacity: searchBarOpacity
          }}
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search Your Resume Domain" 
            className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 shadow-lg focus:ring-2 focus:ring-slate-900 outline-none placeholder:text-slate-400 font-medium text-slate-800 transition-none"
          />
        </div>
      </div>
    </div>
  );
};

// Fix: Use React.FC to properly handle intrinsic props like 'key' when the component is used in a map.
const ResumeCard: React.FC<{ template: ResumeTemplate; onClick: () => void }> = ({ template, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center cursor-pointer group">
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white mb-2">
      <img src={template.image} alt={template.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      {template.isLocked && (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center">
          <LockIcon className="w-8 h-8 text-white opacity-80" />
        </div>
      )}
    </div>
    <p className="text-[10px] font-bold text-slate-800 text-center leading-tight line-clamp-2 uppercase">
      {template.title}
    </p>
  </div>
);

// Branch Card - Same UI as ResumeCard
const BranchCard: React.FC<{ branch: Branch; onClick: () => void }> = ({ branch, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center cursor-pointer group">
    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white mb-2">
      <img src={branch.image} alt={branch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center">
        <LockIcon className="w-8 h-8 text-white opacity-80" />
      </div>
    </div>
    <p className="text-[10px] font-bold text-slate-800 text-center leading-tight line-clamp-2 uppercase">
      {branch.name}
    </p>
  </div>
);

const ImageCarousel = () => (
  <div className="relative overflow-hidden py-4 -mt-4">
    <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar">
      {[
        { id: 1, img: 'https://picsum.photos/seed/featured1/600/300', title: 'Premium DevOps' },
        { id: 2, img: 'https://picsum.photos/seed/featured2/600/300', title: 'Web Development' },
        { id: 3, img: 'https://picsum.photos/seed/featured3/600/300', title: 'Data Science' },
      ].map((item) => (
        <div key={item.id} className="min-w-[280px] h-[160px] rounded-3xl shadow-xl flex-shrink-0 relative overflow-hidden group">
          <img 
            src={item.img} 
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white font-bold text-sm">{item.title}</div>
        </div>
      ))}
    </div>
  </div>
);

// Fix: Use React.FC to properly handle intrinsic props like 'key' when the component is used in a map.
const ProjectCard: React.FC<{ project: ProjectTemplate }> = ({ project }) => (
  <div className="flex flex-col items-center cursor-pointer group">
    <div className={`relative w-full aspect-square rounded-xl overflow-hidden shadow-md ${project.color} p-3 mb-2 flex flex-col`}>
      <div className="absolute top-1 right-1">
         <div className="bg-slate-900/40 p-1 rounded-md">
            <LockIcon className="w-3 h-3 text-white" />
         </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
         <img src={project.image} alt={project.title} className="w-16 h-16 object-contain opacity-90 group-hover:rotate-6 transition-all" />
      </div>
      <div className="bg-white/90 rounded-md py-1 px-2">
        <p className="text-[8px] font-black text-slate-800 text-center uppercase tracking-tighter truncate">{project.category} projects</p>
      </div>
    </div>
    <p className="text-[10px] font-bold text-slate-800 text-center leading-tight line-clamp-2 capitalize">
      {project.title}
    </p>
  </div>
);

const DetailsView = ({ template, onBack, showNavbar }: { template: ResumeTemplate; onBack: () => void; showNavbar: boolean }) => {
  // When navbar is hidden, reduce top padding since header is at top-0
  const contentPaddingTop = showNavbar ? 'pt-20' : 'pt-6';
  
  return (
    <div className="pb-32 animate-in fade-in slide-in-from-right duration-300">
      <PageHeader title={template.title} onBack={onBack} showNavbar={showNavbar} />

      {/* Content container with adaptive padding based on navbar visibility */}
      <div className={`${contentPaddingTop} px-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="relative border-4 border-slate-100 rounded-xl overflow-hidden shadow-2xl">
            <img src={template.image} className="w-full h-auto" />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <LockIcon className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{template.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 font-medium">
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                   ATS Score {template.atsScore}%
                </li>
                <li className="flex items-start gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mt-1.5 shrink-0"></div>
                   <span>Selected in : {template.companies.join(', ')} - 2026 tasted</span>
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                   Editable LaTeX resume editable
                </li>
                <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                   Perfect for Freshers
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
               <h3 className="font-bold text-slate-800 mb-3 text-sm">Whats include :</h3>
               <ul className="space-y-2 text-xs font-medium text-slate-600">
                 {template.includes.map((inc, i) => (
                   <li key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      {inc.includes('project') ? (
                        <span>
                          Projects : <span className="bg-yellow-400 text-slate-900 px-1 rounded">project1</span> <span className="bg-blue-500 text-white px-1 rounded">project 2</span>
                        </span>
                      ) : inc}
                   </li>
                 ))}
               </ul>
               <p className="mt-4 text-[10px] text-green-600 font-bold italic">Note : This files only related to {template.id}</p>
            </div>

            <div className="flex flex-col items-center py-4">
               <div className="text-4xl font-black text-blue-900 mb-6">
                 {template.price} INR/-
               </div>
               <div className="flex gap-2 w-full">
                 <Button className="flex-1 py-4">Unlock Single {template.price}/-</Button>
                 <Button variant="secondary" className="flex-1 py-4">unlock all 499 /-</Button>
               </div>
               <p className="mt-4 text-[9px] text-green-600 text-center font-bold px-8 leading-relaxed">
                 Note : with 499 plan you can unlock A-z domains 100+ Resumes<br/>
                 + 100+ projects + job notifications
               </p>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

// --- Reusable Page Header ---
// Shows on inner pages (branch resumes, detail pages, etc.)
// When navbar is hidden: positioned at top-0
// When navbar is visible: positioned at top-16 (below navbar)

const PageHeader = ({ title, onBack, showNavbar = false }: { title: string; onBack: () => void; showNavbar?: boolean }) => (
  <div 
    className={`sticky left-0 right-0 z-40 bg-white border-b border-slate-200/40 shadow-sm transition-all ${showNavbar ? 'top-16' : 'top-0'}`}
    style={{ 
      top: showNavbar ? '64px' : '0px'
    }}
  >
    <div className="max-w-md mx-auto flex items-center px-4 h-16">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="flex items-center justify-center w-10 h-10 -ml-2 hover:bg-slate-100/60 rounded-lg transition-all active:scale-95 flex-shrink-0"
        aria-label="Go back"
      >
        <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Page Title */}
      <div className="ml-2 flex-1">
        <h1 className="text-base font-semibold text-slate-900 tracking-tight truncate">
          {title}
        </h1>
      </div>
      
      {/* Right spacer for balance */}
      <div className="w-10"></div>
    </div>
  </div>
);

// --- Branch Resumes Page ---

const BranchResumesPage = ({ branch, resumes, onBack, showNavbar }: { branch: Branch; resumes: ResumeTemplate[]; onBack: () => void; showNavbar: boolean }) => {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter resumes based on search query
  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // When navbar is hidden, reduce top padding since header is at top-0
  const contentPaddingTop = showNavbar ? 'pt-20' : 'pt-6';
  
  return (
    <div className="pb-32 animate-in fade-in slide-in-from-right duration-300">
      <PageHeader title={`${branch.name} Resumes`} onBack={onBack} showNavbar={showNavbar} />

      {/* Content container with adaptive padding based on navbar visibility */}
      <div className={`${contentPaddingTop} px-6`}>
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search resume domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none placeholder:text-slate-400 font-medium text-slate-800 transition-all"
            />
          </div>
        </div>

        {/* Resume Grid */}
        {filteredResumes.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {filteredResumes.map((r) => (
              <ResumeCard key={r.id} template={r} onClick={() => {}} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-slate-400 text-center">
              <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-base font-medium">No resumes found for this search.</p>
              <p className="text-sm mt-2">Try different keywords</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Entry ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [selectedResume, setSelectedResume] = useState<ResumeTemplate | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Smooth scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedResume, activeTab]);

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
    };

    const updateScrollProgress = () => {
      const scrolled = lastScrollY;
      const progress = Math.min(scrolled / 150, 1);
      setScrollProgress(progress);
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderHome = () => (
    <div className="pb-32">
      <Header scrollProgress={scrollProgress} />
      
      <div className="px-6 space-y-8">
        {/* Resume Branches Section */}
        <section>
          <SectionHeader title="Top Resumes" />
          <div className="grid grid-cols-4 gap-3">
            {RESUME_BRANCHES.map((b) => (
              <BranchCard key={b.id} branch={b} onClick={() => setSelectedBranch(b)} />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="px-10 border-slate-900 border-2">Unlock all Domains</Button>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <SectionHeader title="Projects" />
          <div className="grid grid-cols-4 gap-3">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

        </section>
      </div>
    </div>
  );

  // Detect current screen
  const isHome = !selectedBranch && !selectedResume;
  const showNavbar = isHome;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-x-hidden selection:bg-yellow-200">
      
      {/* Top Navigation - Only show on home screen */}
      {showNavbar && <TopNavbar scrolled={scrollProgress > 0.2} />}
      
      {/* Sticky Search Bar - Only show on home screen */}
      {showNavbar && <StickySearchBar scrollProgress={scrollProgress} />}
      
      {/* Content Area */}
      <main>
        {selectedBranch ? (
          <BranchResumesPage 
            branch={selectedBranch} 
            resumes={RESUMES_BY_BRANCH[selectedBranch.id] || []} 
            onBack={() => setSelectedBranch(null)}
            showNavbar={showNavbar}
          />
        ) : selectedResume ? (
          <DetailsView 
            template={selectedResume} 
            onBack={() => setSelectedResume(null)}
            showNavbar={showNavbar}
          />
        ) : (
          renderHome()
        )}
      </main>

      {/* Sticky Purchase CTA */}
      <StickyPurchaseCTA />
    </div>
  );
};

export default App;
