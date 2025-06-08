import React from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { Theme, Translation } from '../../types';

interface ControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  theme: Theme;
  translations: Translation;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onStepClick?: (stepIndex: number) => void;
  disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  theme,
  translations,
  onStart,
  onPause,
  onResume,
  onReset,
  onNext,
  onPrevious,
  onStepClick,
  disabled = false
}) => {
  const buttonStyle = (isPrimary: boolean = false, isActive: boolean = false) => ({
    padding: '8px 16px',
    background: isActive 
      ? theme.selectedBg 
      : isPrimary 
        ? theme.buttonPrimary 
        : theme.buttonSecondary,
    color: 'white',
    border: 'none',
    borderRadius: theme.borderRadius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    boxShadow: `0 2px 4px ${theme.shadowColor}`
  });

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      if (currentStep === 0) {
        onStart();
      } else {
        onResume();
      }
    }
  };

  return (
    <div style={{ 
      background: theme.formulaBarBg,
      padding: '20px',
      borderRadius: theme.borderRadius,
      border: `1px solid ${theme.cellBorder}`,
      boxShadow: `0 2px 8px ${theme.shadowColor}`
    }}>
      {/* Main Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        {/* Play/Pause Button */}
        <button 
          onClick={handlePlayPause}
          disabled={disabled}
          style={buttonStyle(true)}
          title={isPlaying ? translations.pauseTooltip : translations.playTooltip}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? translations.pauseAnimation : translations.startAnimation}
        </button>

        {/* Reset Button */}
        <button 
          onClick={onReset}
          disabled={disabled}
          style={buttonStyle()}
          title={translations.resetTooltip}
        >
          <RotateCcw size={16} />
          {translations.resetAnimation}
        </button>

        {/* Previous Step */}
        <button 
          onClick={onPrevious}
          disabled={disabled || currentStep === 0}
          style={buttonStyle()}
          title={translations.previousTooltip}
        >
          <SkipBack size={16} />
          {translations.previousStep}
        </button>

        {/* Next Step */}
        <button 
          onClick={onNext}
          disabled={disabled || currentStep >= totalSteps - 1}
          style={buttonStyle()}
          title={translations.nextTooltip}
        >
          <SkipForward size={16} />
          {translations.nextStep}
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500',
            color: theme.textColor
          }}>
            {translations.step} {currentStep + 1} {translations.of} {totalSteps}
          </span>
          <span style={{ 
            fontSize: '12px', 
            color: theme.headerText,
            opacity: 0.7
          }}>
            {Math.round((currentStep / (totalSteps - 1)) * 100)}%
          </span>
        </div>
        
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: theme.cellBorder,
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(currentStep / (totalSteps - 1)) * 100}%`,
            height: '100%',
            backgroundColor: theme.selectedBg,
            transition: 'width 0.3s ease',
            borderRadius: '4px'
          }} />
        </div>
      </div>

      {/* Step Indicators */}
      {onStepClick && (
        <div style={{ 
          display: 'flex', 
          gap: '4px',
          flexWrap: 'wrap' as const
        }}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              disabled={disabled}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: `2px solid ${index === currentStep ? theme.selectedBg : theme.cellBorder}`,
                background: index <= currentStep ? theme.selectedBg : 'transparent',
                color: index <= currentStep ? theme.selectedText : theme.textColor,
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: disabled ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: disabled ? 0.5 : 1
              }}
              title={`${translations.step} ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Controls;
