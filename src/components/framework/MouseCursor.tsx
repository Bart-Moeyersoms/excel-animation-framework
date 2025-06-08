import React from 'react';

interface MouseCursorProps {
  x: number;
  y: number;
  visible: boolean;
  isClicking: boolean;
  cursorType?: 'default' | 'pointer' | 'text' | 'cell';
  size?: number;
}

const MouseCursor: React.FC<MouseCursorProps> = ({ 
  x, 
  y, 
  visible, 
  isClicking,
  cursorType = 'default',
  size = 20
}) => {
  const getCursorIcon = () => {
    switch (cursorType) {
      case 'pointer':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="black">
            <path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z"/>
          </svg>
        );
      case 'text':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="black">
            <path d="M13,19A1,1 0 0,1 12,20A1,1 0 0,1 11,19V7H7A1,1 0 0,1 6,6A1,1 0 0,1 7,5H17A1,1 0 0,1 18,6A1,1 0 0,1 17,7H13V19Z"/>
          </svg>
        );
      case 'cell':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="black">
            <path d="M12,2A2,2 0 0,1 14,4V8L20,6V18L14,16V20A2,2 0 0,1 12,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H12M4,4V20H12V16H10V12H12V8H10V4H4Z"/>
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="black">
            <path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z"/>
          </svg>
        );
    }
  };

  return (
    <div 
      style={{
        position: 'absolute',
        left: x - size/2,
        top: y - size/2,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `scale(${isClicking ? 0.8 : 1})`,
        filter: isClicking ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'
      }}
    >
      {getCursorIcon()}
      
      {/* Click ripple effect */}
      {isClicking && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '40px',
            height: '40px',
            marginTop: '-20px',
            marginLeft: '-20px',
            border: '2px solid rgba(66, 133, 244, 0.6)',
            borderRadius: '50%',
            animation: 'ripple 0.6s ease-out'
          }}
        />
      )}
      
      <style>
        {`
          @keyframes ripple {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MouseCursor;