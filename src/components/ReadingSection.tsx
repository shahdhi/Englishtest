import React from 'react';
import { BookOpen } from 'lucide-react';
import { TextQuestion } from './TextQuestion';
import { Question } from '../types/test';
import { readingText } from '../data/testData';

interface ReadingSectionProps {
  questions: Question[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  questions,
  answers,
  onAnswerChange
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-800">Reading Passage</h3>
        </div>
        <div className="bg-white rounded-lg p-6 border border-purple-200">
          <p className="text-gray-700 leading-relaxed text-base">
            {readingText}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Part A: Reading Comprehension (10 minutes)</h3>
          <div className="space-y-6">
            {questions.slice(0, 3).map((question, index) => (
              <TextQuestion
                key={question.id}
                question={question}
                answer={answers[question.id] || ''}
                onAnswerChange={onAnswerChange}
                questionNumber={index + 1}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Part B: Writing Response (15 minutes)</h3>
          {questions.slice(3).map((question, index) => (
            <TextQuestion
              key={question.id}
              question={question}
              answer={answers[question.id] || ''}
              onAnswerChange={onAnswerChange}
              questionNumber={index + 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
};