import React from 'react';
import { Download, RotateCcw, GraduationCap, BookOpen, Headphones, PenTool, MessageSquare, Mic, FileText } from 'lucide-react';
import { StudentInfo } from '../types/test';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TestResultsProps {
  answers: Record<number, string>;
  studentInfo: StudentInfo | null;
  onRestart: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ answers, studentInfo, onRestart }) => {
  const calculateSectionScores = () => {
    // Grammar & Vocabulary (Questions 1-20)
    const grammarAnswers = Object.entries(answers).filter(([id]) => parseInt(id) >= 1 && parseInt(id) <= 20);
    const grammarScore = Math.floor(grammarAnswers.length * 0.8); // Simulate 80% score
    
    // Listening (Questions 21-25)
    const listeningAnswers = Object.entries(answers).filter(([id]) => parseInt(id) >= 21 && parseInt(id) <= 25);
    const listeningScore = Math.floor(listeningAnswers.length * 0.8);
    
    // Reading & Writing (Questions 26-29)
    const readingWritingAnswers = Object.entries(answers).filter(([id]) => parseInt(id) >= 26 && parseInt(id) <= 29);
    const readingScore = Math.floor(readingWritingAnswers.length * 0.75);
    const writingScore = Math.floor(readingWritingAnswers.length * 0.85);
    
    return {
      vocabulary: Math.min(grammarScore, 10),
      grammar: Math.min(grammarScore, 10),
      reading: Math.min(readingScore, 5),
      listening: Math.min(listeningScore, 5),
      writing: Math.min(writingScore, 10),
      speaking: 10 // Simulated perfect score for speaking
    };
  };

  const scores = calculateSectionScores();
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const maxScore = 56;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getCEFRLevel = (score: number) => {
    if (score >= 50) return { level: 'C2', label: 'Proficient', color: 'bg-purple-500', textColor: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-300' };
    if (score >= 42) return { level: 'C1', label: 'Advanced', color: 'bg-blue-600', textColor: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-300' };
    if (score >= 35) return { level: 'B2', label: 'Upper Intermediate', color: 'bg-teal-500', textColor: 'text-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-300' };
    if (score >= 28) return { level: 'B1', label: 'Intermediate', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-300' };
    if (score >= 20) return { level: 'A2', label: 'Elementary', color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-300' };
    return { level: 'A1', label: 'Beginner', color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-300' };
  };

  const cefrLevel = getCEFRLevel(totalScore);

  const handleDownload = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let yPosition = margin;
      
      // Header
      pdf.setFillColor(30, 64, 175); // Sha Bridge College blue
      pdf.roundedRect(0, 0, pageWidth, 35, 6, 6, 'F');
      
      // College Logo and Name
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('times', 'bold');
      pdf.text('SHA BRIDGE COLLEGE', margin, 15);
      pdf.setFontSize(10);
      pdf.setFont('times', 'normal');
      pdf.text('English Language Assessment Center', margin, 22);
      
      yPosition = 40;
      
      // Title
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.setFont('times', 'bold');
      pdf.text('ENGLISH PROFICIENCY TEST RESULTS', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 12;
      
      // Student Information Box
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(margin, yPosition, contentWidth, 20, 4, 4, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(margin, yPosition, contentWidth, 20, 4, 4, 'S');
      
      pdf.setFontSize(10);
      pdf.setFont('times', 'bold');
      pdf.setFont('times', 'bold');
      pdf.text('STUDENT INFORMATION', margin + 3, yPosition + 5);
      
      pdf.setFontSize(8);
        // Note: In a real implementation, you would load the logo image
      pdf.setFont('times', 'normal');
        pdf.setFillColor(255, 255, 255);
        pdf.circle(20, 20, 5, 'F');
        pdf.setTextColor(59, 130, 246);
        pdf.setFontSize(7);
        pdf.setFont('times', 'bold');
        pdf.text('SBC', 20, 22, { align: 'center' });
        pdf.text(`Test Date: ${new Date().toLocaleDateString()}`, margin + 60, yPosition + 10);
        pdf.text(`Self-Assessed Level: ${studentInfo?.level}`, margin + 60, yPosition + 15);
      
      yPosition += 25;
      
      // Main Score Section
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(margin, yPosition, contentWidth, 25, 5, 5, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(margin, yPosition, contentWidth, 25, 5, 5, 'S');
      
      // Score Display
      pdf.setFontSize(24);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 64, 175);
      pdf.text(`${totalScore}/56`, pageWidth / 2, yPosition + 12, { align: 'center' });
      
      pdf.setFontSize(8);
      pdf.setFont('times', 'normal');
      pdf.setTextColor(107, 114, 128);
      pdf.text(`Total Score (${percentage}%)`, pageWidth / 2, yPosition + 18, { align: 'center' });
      
      // CEFR Level Badge
      const badgeWidth = 35;
      const badgeHeight = 7;
      const badgeX = (pageWidth - badgeWidth) / 2;
      const badgeY = yPosition + 20;
      
      // Set badge color based on CEFR level
      if (cefrLevel.level === 'C2') pdf.setFillColor(147, 51, 234); // purple
      else if (cefrLevel.level === 'C1') pdf.setFillColor(37, 99, 235); // blue
      else if (cefrLevel.level === 'B2') pdf.setFillColor(20, 184, 166); // teal
      else if (cefrLevel.level === 'B1') pdf.setFillColor(245, 158, 11); // yellow
      else if (cefrLevel.level === 'A2') pdf.setFillColor(249, 115, 22); // orange
      else pdf.setFillColor(239, 68, 68); // red
      
      pdf.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 4, 4, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.setFont('times', 'bold');
      pdf.text(`${cefrLevel.level} - ${cefrLevel.label}`, pageWidth / 2, badgeY + 5, { align: 'center' });
      
      yPosition += 30;
      
      // Section Breakdown
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.setFont('times', 'bold');
      pdf.text('SECTION BREAKDOWN', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      
      const sections = [
        { name: 'Vocabulary', score: scores.vocabulary, max: 10, icon: '📚' },
        { name: 'Grammar', score: scores.grammar, max: 10, icon: '📝' },
        { name: 'Reading', score: scores.reading, max: 5, icon: '📖' },
        { name: 'Listening', score: scores.listening, max: 5, icon: '🎧' },
        { name: 'Writing', score: scores.writing, max: 10, icon: '✍️' },
        { name: 'Speaking', score: scores.speaking, max: 10, icon: '🗣️' }
      ];
      
      // Draw sections in 2x3 grid
      const sectionWidth = (contentWidth - 10) / 2;
      const sectionHeight = 12;
      
      sections.forEach((section, index) => {
        const col = index % 2;
        const row = Math.floor(index / 2);
        const x = margin + (col * (sectionWidth + 10));
        const y = yPosition + (row * (sectionHeight + 3));
        
        // Section box
        pdf.setFillColor(248, 250, 252);
        pdf.roundedRect(x, y, sectionWidth, sectionHeight, 2, 2, 'F');
        pdf.setDrawColor(226, 232, 240);
        pdf.roundedRect(x, y, sectionWidth, sectionHeight, 2, 2, 'S');
        
        // Section name and score
        pdf.setFontSize(8);
        pdf.setFont('times', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text(section.name, x + 2, y + 4);
        
        pdf.setFontSize(6);
        pdf.setFont('times', 'normal');
        pdf.setTextColor(107, 114, 128);
        pdf.text(`${section.score}/${section.max} points`, x + 2, y + 7);
        
        // Percentage
        const percentage = Math.round((section.score / section.max) * 100);
        pdf.setFontSize(10);
        pdf.setFont('times', 'bold');
        pdf.setTextColor(30, 64, 175);
        pdf.text(`${percentage}%`, x + sectionWidth - 2, y + 6, { align: 'right' });
        
        // Progress bar
        const barWidth = sectionWidth - 8;
        const barHeight = 1.5;
        const barX = x + 4;
        const barY = y + 9;
        
        // Background bar
        pdf.setFillColor(229, 231, 235);
        pdf.roundedRect(barX, barY, barWidth, barHeight, 1, 1, 'F');
        
        // Progress bar
        pdf.setFillColor(30, 64, 175);
        pdf.roundedRect(barX, barY, (barWidth * percentage) / 100, barHeight, 1, 1, 'F');
      });
      
      yPosition += 45;
      
      // CEFR Level Guide
      pdf.setFontSize(12);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('CEFR LEVEL GUIDE', pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 8;
      
      const cefrLevels = [
        { level: 'A1', label: 'Beginner', points: '0-19 points', color: [239, 68, 68] },
        { level: 'A2', label: 'Elementary', points: '20-27 points', color: [249, 115, 22] },
        { level: 'B1', label: 'Intermediate', points: '28-34 points', color: [245, 158, 11] },
        { level: 'B2', label: 'Upper Intermediate', points: '35-41 points', color: [20, 184, 166] },
        { level: 'C1', label: 'Advanced', points: '42-49 points', color: [37, 99, 235] },
        { level: 'C2', label: 'Proficient', points: '50-56 points', color: [147, 51, 234] }
      ];
      
      // Draw CEFR levels in 3x2 grid
      const levelWidth = (contentWidth - 20) / 3;
      const levelHeight = 10;
      
      cefrLevels.forEach((level, index) => {
        const col = index % 3;
        const row = Math.floor(index / 2);
        const x = margin + (col * (levelWidth + 10));
        const y = yPosition + (row * (levelHeight + 3));
        
        // Highlight current level
        const isCurrentLevel = level.level === cefrLevel.level;
        
        if (isCurrentLevel) {
          pdf.setFillColor(level.color[0], level.color[1], level.color[2]);
          pdf.setDrawColor(level.color[0], level.color[1], level.color[2]);
        } else {
          pdf.setFillColor(248, 250, 252);
          pdf.setDrawColor(226, 232, 240);
        }
        
        pdf.roundedRect(x, y, levelWidth, levelHeight, 2, 2, 'FD');
        
        // Level text
        pdf.setFontSize(7);
        pdf.setFont('times', 'bold');
        pdf.setTextColor(isCurrentLevel ? 255 : 0, isCurrentLevel ? 255 : 0, isCurrentLevel ? 255 : 0);
        pdf.text(level.level, x + 2, y + 4);
        
        pdf.setFontSize(6);
        pdf.setFont('times', 'normal');
        pdf.text(level.label, x + 2, y + 6);
        pdf.text(level.points, x + 2, y + 8);
      });
      
      yPosition += 25;
      
      // Footer
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(0, pageHeight - 20, pageWidth, 20, 4, 4, 'F');
      
      pdf.setFontSize(7);
      pdf.setFont('times', 'normal');
      pdf.setTextColor(107, 114, 128);
      pdf.text('Sha Bridge College Language Assessment Center', pageWidth / 2, pageHeight - 14, { align: 'center' });
      pdf.setFontSize(6);
      pdf.setFont('times', 'bold');
      pdf.text('For official certification or academic placement, please contact our Academic Affairs office.', pageWidth / 2, pageHeight - 8, { align: 'center' });
      
      pdf.save(`Sha_Bridge_College_English_Assessment_${studentInfo?.lastName || 'Student'}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/sha-bridge-logo.png" alt="Sha Bridge College Logo" className="w-8 h-8" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <GraduationCap className="w-8 h-8 text-blue-900 hidden" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Sha Bridge College</h1>
              <p className="text-sm text-gray-600">English Language Assessment Results</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="results-container">
        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Test Complete!</h1>
          <p className="text-lg text-gray-600">Here are your English fluency test results</p>
        </div>

        {/* Main Score Display */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-10 mb-8 text-center">
          <div className="text-7xl font-bold text-gray-800 mb-3">{totalScore}<span className="text-4xl text-gray-500">/56</span></div>
          <div className="text-xl text-gray-600 mb-6">Total Score ({percentage}%)</div>
          
          {/* CEFR Level Badge */}
          <div className="inline-block mb-6">
            <div className={`${cefrLevel.color} text-white px-8 py-3 rounded-full font-bold text-xl shadow-lg`}>
              {cefrLevel.level} - {cefrLevel.label}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-lg mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Student Information and Test Results Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Test Results Summary</h2>
          
          {/* Student Information Display */}
          {studentInfo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Name:</span> {studentInfo.firstName} {studentInfo.lastName}</div>
                <div><span className="font-medium">Email:</span> {studentInfo.email}</div>
                <div><span className="font-medium">Phone:</span> {studentInfo.phoneNumber}</div>
                <div><span className="font-medium">Self-Assessed Level:</span> {studentInfo.level}</div>
                <div><span className="font-medium">Test Date:</span> {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          )}

          {/* Main Score Display */}
          <div className="text-center mb-8">
            
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Section Breakdown</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vocabulary */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">Vocabulary</h3>
                  <p className="text-sm text-gray-600">{scores.vocabulary}/10 points</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round((scores.vocabulary/10)*100)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(scores.vocabulary/10)*100}%` }}
                />
              </div>
            </div>

            {/* Grammar */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">Grammar</h3>
                  <p className="text-sm text-gray-600">{scores.grammar}/10 points</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round((scores.grammar/10)*100)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(scores.grammar/10)*100}%` }}
                />
              </div>
            </div>

            {/* Reading */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">Reading</h3>
                  <p className="text-sm text-gray-600">{scores.reading}/5 points</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round((scores.reading/5)*100)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(scores.reading/5)*100}%` }}
                />
              </div>
            </div>

            {/* Listening */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">Listening</h3>
                  <p className="text-sm text-gray-600">{scores.listening}/5 points</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round((scores.listening/5)*100)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(scores.listening/5)*100}%` }}
                />
              </div>
            </div>

            {/* Writing */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">Writing</h3>
                  <p className="text-sm text-gray-600">{scores.writing}/10 points</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round((scores.writing/10)*100)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(scores.writing/10)*100}%` }}
                />
              </div>
            </div>

            {/* Speaking */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mic className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">Speaking</h3>
                  <p className="text-sm text-gray-600">{scores.speaking}/10 points</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-blue-600">{Math.round((scores.speaking/10)*100)}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${(scores.speaking/10)*100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CEFR Level Guide */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">CEFR Level Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* A1 */}
            <div className={`border-2 rounded-xl p-6 transition-all ${
              cefrLevel.level === 'A1' ? 'border-red-400 bg-red-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-xl font-bold text-gray-800">A1</span>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-lg">Beginner</div>
                <div className="text-sm">0-19 points</div>
              </div>
            </div>

            {/* A2 */}
            <div className={`border-2 rounded-xl p-6 transition-all ${
              cefrLevel.level === 'A2' ? 'border-orange-400 bg-orange-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-xl font-bold text-gray-800">A2</span>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-lg">Elementary</div>
                <div className="text-sm">20-27 points</div>
              </div>
            </div>

            {/* B1 */}
            <div className={`border-2 rounded-xl p-6 transition-all ${
              cefrLevel.level === 'B1' ? 'border-yellow-400 bg-yellow-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-xl font-bold text-gray-800">B1</span>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-lg">Intermediate</div>
                <div className="text-sm">28-34 points</div>
              </div>
            </div>

            {/* B2 */}
            <div className={`border-2 rounded-xl p-6 transition-all ${
              cefrLevel.level === 'B2' ? 'border-teal-400 bg-teal-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                <span className="text-xl font-bold text-gray-800">B2</span>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-lg">Upper Intermediate</div>
                <div className="text-sm">35-41 points</div>
              </div>
            </div>

            {/* C1 */}
            <div className={`border-2 rounded-xl p-6 transition-all ${
              cefrLevel.level === 'C1' ? 'border-blue-400 bg-blue-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-xl font-bold text-gray-800">C1</span>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-lg">Advanced</div>
                <div className="text-sm">42-49 points</div>
              </div>
            </div>

            {/* C2 */}
            <div className={`border-2 rounded-xl p-6 transition-all ${
              cefrLevel.level === 'C2' ? 'border-purple-400 bg-purple-50 shadow-lg' : 'border-gray-200 hover:shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-xl font-bold text-gray-800">C2</span>
              </div>
              <div className="text-gray-600">
                <div className="font-semibold text-lg">Proficient</div>
                <div className="text-sm">50-56 points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RotateCcw className="w-5 h-5" />
            Take Test Again
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>
        </div>

        {/* Footer */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img src="/sha-bridge-logo.png" alt="Sha Bridge College Logo" className="w-6 h-6" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <GraduationCap className="w-6 h-6 text-blue-900 hidden" />
            <span className="text-lg font-bold text-blue-900">Sha Bridge College Language Assessment Center</span>
          </div>
          <p className="text-blue-700">
            This assessment provides an indication of your current English proficiency level.
            For official certification or academic placement, please contact our Academic Affairs office.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};