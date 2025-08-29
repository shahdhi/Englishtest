import React from 'react';
import { Clock, GraduationCap } from 'lucide-react';

interface TestHeaderProps {
  currentSection: number;
  totalSections: number;
  timeLeft: number;
  sectionTitle: string;
}

export const TestHeader: React.FC<TestHeaderProps> = ({
  currentSection,
  totalSections,
  timeLeft,
  sectionTitle
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 300; // Last 5 minutes
  const isCritical = timeLeft <= 60; // Last minute

  return (
    <div className="bg-white border-b-2 border-blue-800 px-6 py-5 sticky top-0 z-10 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/sha-bridge-logo.png" alt="Sha Bridge College Logo" className="w-8 h-8" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <GraduationCap className="w-8 h-8 text-blue-900 hidden" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Sha Bridge College</h1>
              <p className="text-sm text-gray-600">English Proficiency Assessment</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-gray-700">
            <span className="text-lg font-medium">Section {currentSection + 1} of {totalSections}:</span>
            <span className="text-lg font-bold text-blue-800">{sectionTitle}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-gray-600 font-medium">Progress</div>
            <div className="text-lg font-bold text-gray-800">{currentSection + 1}/{totalSections}</div>
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 ${
            isCritical ? 'bg-red-50 border-red-300 text-red-800' :
            isWarning ? 'bg-amber-50 border-amber-300 text-amber-800' :
            'bg-blue-50 border-blue-300 text-blue-800'
          }`}>
            <Clock className="w-5 h-5" />
            <div className="text-right">
              <div className="text-xs font-medium opacity-75">Time Remaining</div>
              <div className="font-mono font-bold text-lg">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};