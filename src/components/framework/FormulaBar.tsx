import React from 'react';
import { Theme } from '../../types';

interface FormulaBarProps {
  selectedCell: string;
  value: string;
  isEditing: boolean;
  theme: Theme;
  onValueChange?: (value: string) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  showCursor?: boolean;
  readOnly?: boolean;
}

const FormulaBar: React.FC<FormulaBarProps> = ({
  selectedCell,
  value,
  isEditing,
  theme,
  onValueChange,
  onEnter,
  onEscape,
  showCursor = false,
  readOnly = true
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    } else if (e.key === 'Escape' && onEscape) {
      onEscape();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <div style={{ 
      background: theme.formulaBarBg,
      border: '1px solid #ddd',
      padding: '8px',
      marginBottom: '2px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'Segoe UI, Calibri, Arial, sans-serif',
      fontSize: '13px',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {/* Cell Reference */}
      <div style={{ 
        minWidth: '60px',
        padding: '4px 8px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '2px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px',
        color: '#333'
      }}>
        {selectedCell || 'A1'}
      </div>

      {/* Functions Button */}
      <button style={{
        padding: '4px 8px',
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '2px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        fx
      </button>

      {/* Formula Input */}
      <div style={{ 
        flex: 1,
        position: 'relative'
      }}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          style={{
            width: '100%',
            padding: '4px 8px',
            border: '1px solid #ccc',
            borderRadius: '2px',
            fontSize: '13px',
            fontFamily: 'Consolas, Monaco, monospace',
            background: isEditing ? '#fff' : '#f9f9f9',
            color: value.startsWith('=') ? '#0066cc' : '#000',
            outline: isEditing ? '2px solid #4285f4' : 'none',
            transition: 'all 0.2s ease'
          }}
          placeholder={isEditing ? 'Type a formula...' : ''}
        />
        
        {/* Animated cursor for demonstrations */}
        {showCursor && isEditing && (
          <div style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1px',
            height: '16px',
            background: '#000',
            animation: 'blink 1s infinite'
          }} />
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <button style={{
          padding: '4px 8px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          ✕
        </button>
        
        <button style={{
          padding: '4px 8px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          ✓
        </button>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default FormulaBar;