import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingSection from './components/LandingSection';
import UploadSection from './components/UploadSection';
import AnalysisSection from './components/AnalysisSection';
import ResultsDashboard from './components/ResultsDashboard';
import ComparisonSection from './components/ComparisonSection';
import ChatAssistant from './components/ChatAssistant';
import Navigation from './components/Navigation';
import './index.css';

function App() {
  const [currentSection, setCurrentSection] = useState('landing');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [redesignedImage, setRedesignedImage] = useState(null);

  const handleImageUpload = (image) => {
    setUploadedImage(image);
    setCurrentSection('analysis');
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = {
        colorImprovements: [
          { issue: 'Low contrast between text and background', suggestion: 'Increase text brightness to #ffffff' },
          { issue: 'Inconsistent color palette', suggestion: 'Use a consistent primary color: #667eea' }
        ],
        spacingIssues: [
          { issue: 'Insufficient padding between elements', suggestion: 'Add 16px padding between components' },
          { issue: 'Uneven margins', suggestion: 'Standardize margins to 24px' }
        ],
        typographyFixes: [
          { issue: 'Inconsistent font sizes', suggestion: 'Use 16px for body text, 24px for headings' },
          { issue: 'Poor line height', suggestion: 'Set line-height to 1.6 for better readability' }
        ],
        uxSuggestions: [
          { issue: 'Missing hover states', suggestion: 'Add hover effects to interactive elements' },
          { issue: 'Unclear call-to-action', suggestion: 'Make primary buttons more prominent' }
        ]
      };
      setAnalysisResults(mockResults);
      setCurrentSection('results');
    }, 3000);
  };

  const handleRedesign = () => {
    setCurrentSection('comparison');
    // Simulate redesigned image
    setTimeout(() => {
      setRedesignedImage(uploadedImage); // In real app, this would be the AI-redesigned image
    }, 1000);
  };

  const handleReset = () => {
    setCurrentSection('landing');
    setUploadedImage(null);
    setAnalysisResults(null);
    setRedesignedImage(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg bg-grid text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Navigation */}
      <Navigation currentSection={currentSection} onReset={handleReset} />
      
      {/* Main content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentSection === 'landing' && (
              <LandingSection onGetStarted={() => setCurrentSection('upload')} />
            )}
            
            {currentSection === 'upload' && (
              <UploadSection onImageUpload={handleImageUpload} />
            )}
            
            {currentSection === 'analysis' && (
              <AnalysisSection />
            )}
            
            {currentSection === 'results' && (
              <ResultsDashboard
                originalImage={uploadedImage}
                results={analysisResults}
                onRedesign={handleRedesign}
              />
            )}
            
            {currentSection === 'comparison' && (
              <ComparisonSection
                originalImage={uploadedImage}
                redesignedImage={redesignedImage}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Chat Assistant - always visible */}
      <ChatAssistant />
    </div>
  );
}

export default App;
