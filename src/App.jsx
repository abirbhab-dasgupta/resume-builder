import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import ResumeEditor from './components/ResumeEditor';
import ResumePreview from './components/ResumePreview';
import HelpSection from './components/HelpSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Button } from './components/ui/button';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative px-3 py-2 transition-colors duration-300 ${
        isActive ? 'text-primary' : 'text-primary-foreground hover:text-primary'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="underline"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

function App() {
  const [resumeData, setResumeData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : {
        personalInfo: { name: '', email: '', phone: '' },
        education: [],
        workExperience: [],
        skills: []
      };
    }
    return {
      personalInfo: { name: '', email: '', phone: '' },
      education: [],
      workExperience: [],
      skills: []
    };
  });

  const [activeTemplate, setActiveTemplate] = useState('modern');
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 text-foreground transition-colors duration-300 flex flex-col">
        <header className="bg-primary shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" className="text-2xl font-bold text-primary-foreground hover:text-primary-foreground/80 transition-colors duration-300">
                  Resume Builder
                </Link>
              </motion.div>
              <nav className="hidden md:flex items-center space-x-4">
                <NavLink to="/">Editor</NavLink>
                <NavLink to="/help">Help</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </motion.div>
              </nav>
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-primary-foreground hover:text-primary-foreground/80"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-primary-foreground"
              >
                <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
                  <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Editor</NavLink>
                  <NavLink to="/help" onClick={() => setIsMenuOpen(false)}>Help</NavLink>
                  <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark');
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
                    Toggle theme
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="container mx-auto p-4 flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ResumeEditor
                      resumeData={resumeData}
                      setResumeData={setResumeData}
                      activeTemplate={activeTemplate}
                      setActiveTemplate={setActiveTemplate}
                    />
                    <ResumePreview
                      resumeData={resumeData}
                      activeTemplate={activeTemplate}
                    />
                  </div>
                </motion.div>
              } />
              <Route path="/help" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <HelpSection />
                </motion.div>
              } />
              <Route path="/contact" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Contact />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;