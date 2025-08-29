import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { Question } from '../types/test';

interface ListeningSectionProps {
  questions: Question[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, answer: string) => void;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  questions,
  answers,
  onAnswerChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio file path - update this to match your actual file
  const audioFile = '/audio/listening-section.mp3';

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error('Error playing audio:', error));
        
        if (!hasPlayed) {
          setHasPlayed(true);
        }
      }
    }
  };

  const handleResetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
      setHasPlayed(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      // Check if audio has finished playing
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        setIsPlaying(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioFile}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Listening Instructions</h3>
        <p className="text-blue-700 mb-4">
          You will hear a workplace conversation between two colleagues discussing a quarterly sales report. 
          Listen carefully and answer the questions that follow. The audio will play only once.
        </p>
        
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handlePlayAudio}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isPlaying
                ? 'bg-blue-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                Pause Audio
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Play Audio
              </>
            )}
          </button>
          
          <button
            onClick={handleResetAudio}
            className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          
          {isPlaying && (
            <div className="flex items-center gap-2 text-blue-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm">Audio is playing...</span>
            </div>
          )}
        </div>

        {/* Audio progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {hasPlayed && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-800 mb-2">Audio Transcript (For Reference)</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Anna:</strong> "Hi Mark, have you had a chance to look at the quarterly sales report yet?"</p>
              <p><strong>Mark:</strong> "Hi Anna, yes, I went through it this morning. The figures are generally positive, especially in the Asian market. However, I'm a bit concerned about the dip in sales last month in Europe."</p>
              <p><strong>Anna:</strong> "I saw that too. I think it might be related to the delayed marketing campaign. Let's schedule a brief meeting with the European team to discuss it. How about tomorrow at 10 am?"</p>
              <p><strong>Mark:</strong> "That works for me. I'll send out the calendar invites. Should we ask them to prepare some initial thoughts on the decline?"</p>
              <p><strong>Anna:</strong> "That's a good idea. Let's ask them to bring any data they have on customer feedback from that period as well."</p>
            </div>
          </div>
        )}
      </div>

      {hasPlayed && (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <MultipleChoiceQuestion
              key={question.id}
              question={question}
              selectedAnswer={answers[question.id] || ''}
              onAnswerChange={onAnswerChange}
              questionNumber={index + 1}
            />
          ))}
        </div>
      )}

      {!hasPlayed && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please play the audio first to access the questions</p>
        </div>
      )}
    </div>
  );
};
