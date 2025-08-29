import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StudentInfoForm } from './components/StudentInfoForm';
import { TestHeader } from './components/TestHeader';
import { MultipleChoiceQuestion } from './components/MultipleChoiceQuestion';
import { ListeningSection } from './components/ListeningSection';
import { ReadingSection } from './components/ReadingSection';
import { TestResults } from './components/TestResults';
import { useTimer } from './hooks/useTimer';
import { testSections } from './data/testData';
import { StudentInfo } from './types/test';
import { ArrowRight, ArrowLeft, Send, GraduationCap } from 'lucide-react';

type TestPhase = 'welcome' | 'student-info' | 'testing' | 'complete';

function App() {
  const [phase, setPhase] = useState<TestPhase>('welcome');
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);

  // Total test time: 60 minutes (3600 seconds)
  const handleTimeUp = useCallback(() => {
    setPhase('complete');
  }, []);

  const { timeLeft, isActive, start, reset } = useTimer(3600, handleTimeUp);

  const handleStartTest = () => {
    setPhase('student-info');
  };

  const handleStudentInfoSubmit = (info: StudentInfo) => {
    setStudentInfo(info);
    setPhase('testing');
    start();
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextSection = () => {
    if (currentSection < testSections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    setPhase('complete');
  };

  const handleRestart = () => {
    setPhase('welcome');
    setCurrentSection(0);
    setAnswers({});
    setStudentInfo(null);
    reset();
  };

  if (phase === 'welcome') {
    return <WelcomeScreen onStart={handleStartTest} />;
  }

  if (phase === 'student-info') {
    return <StudentInfoForm onSubmit={handleStudentInfoSubmit} />;
  }

  if (phase === 'complete') {
    return <TestResults answers={answers} studentInfo={studentInfo} onRestart={handleRestart} />;
  }

  const currentSectionData = testSections[currentSection];
  const isLastSection = currentSection === testSections.length - 1;

  const renderSectionContent = () => {
    switch (currentSectionData.id) {
      case 'grammar-vocabulary':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <img src="/sha-bridge-logo.png" alt="Sha Bridge College Logo" className="w-6 h-6" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }} />
                <GraduationCap className="w-6 h-6 text-blue-900 hidden" />
                <h3 className="text-lg font-semibold text-blue-800">Section Instructions</h3>
              </div>
              <p className="text-blue-700 leading-relaxed">{currentSectionData.instructions}</p>
            </div>
            <div className="grid gap-4">
              {currentSectionData.questions.map((question, index) => (
                <MultipleChoiceQuestion
                  key={question.id}
                  question={question}
                  selectedAnswer={answers[question.id] || ''}
                  onAnswerChange={handleAnswerChange}
                  questionNumber={index + 1}
                />
              ))}
            </div>
          </div>
        );

      case 'listening':
        return (
          <ListeningSection
            questions={currentSectionData.questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        );

      case 'reading-writing':
        return (
          <ReadingSection
            questions={currentSectionData.questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader
        currentSection={currentSection}
        totalSections={testSections.length}
        timeLeft={timeLeft}
        sectionTitle={currentSectionData.title}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentSectionData.title}
            </h2>
            <div className="text-sm text-gray-600">
              Time Limit: {currentSectionData.timeLimit} minutes
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / testSections.length) * 100}%` }}
            />
          </div>
        </div>

        {renderSectionContent()}

        <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
          <button
            onClick={handlePreviousSection}
            disabled={currentSection === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Section
          </button>

          {isLastSection ? (
            <button
              onClick={handleSubmitTest}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Submit Test
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNextSection}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Next Section
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;