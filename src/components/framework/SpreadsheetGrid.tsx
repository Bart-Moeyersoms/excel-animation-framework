import React, { useRef, useEffect } from 'react';
import { Theme } from '../../types';
import MouseCursor from './MouseCursor';

interface SpreadsheetGridProps {
  data: string[][];
  selectedCell?: string;
  highlightedCells?: string[];
  theme: Theme;
  onCellClick?: (row: number, col: number, cellId: string) => void;
  mousePosition: { x: number; y: number };
  showMouse: boolean;
  isMouseClicking: boolean;
  cursorType?: 'default' | 'pointer' | 'text' | 'cell';
  rows?: number;
  cols?: number;
  showRowNumbers?: boolean;
  showColumnHeaders?: boolean;
  cellWidth?: number;
  cellHeight?: number;
  fontSize?: number;
}

const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({ 
  data,
  selectedCell,
  highlightedCells = [],
  theme,
  onCellClick,
  mousePosition,
  showMouse,
  isMouseClicking,
  cursorType = 'default',
  rows = 20,
  cols = 10,
  showRowNumbers = true,
  showColumnHeaders = true,
  cellWidth = 100,
  cellHeight = 30,
  fontSize = 13
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  const getColumnLabel = (index: number): string => {
    let label = '';
    while (index >= 0) {
      label = String.fromCharCode(65 + (index % 26)) + label;
      index = Math.floor(index / 26) - 1;
    }
    return label;
  };

  const getCellId = (row: number, col: number): string => {
    return `${getColumnLabel(col)}${row + 1}`;
  };

  const getCellValue = (row: number, col: number): string => {
    if (data[row] && data[row][col] !== undefined) {
      return data[row][col];
    }
    return '';
  };

  const getCellStyle = (row: number, col: number, isHeader: boolean = false) => {
    const cellId = getCellId(row, col);
    const isSelected = selectedCell === cellId;
    const isHighlighted = highlightedCells.includes(cellId);
    
    let backgroundColor = 'white';
    let color = '#000';
    
    if (isHeader) {
      backgroundColor = theme.headerBg;
      color = theme.headerText;
    } else if (isSelected) {
      backgroundColor = theme.selectedBg;
      color = theme.selectedText;
    } else if (isHighlighted) {
      backgroundColor = `${theme.selectedBg}20`; // 20% opacity
      color = theme.selectedBg;
    }

    return {
      border: `1px solid ${theme.cellBorder}`,
      padding: '4px 8px',
      width: isHeader && col === -1 ? '40px' : `${cellWidth}px`,
      height: `${cellHeight}px`,
      textAlign: (col === 1 && !isHeader) ? 'center' as const : 'left' as const,
      backgroundColor,
      color,
      fontWeight: isHeader ? 'bold' : 'normal',
      position: 'relative' as const,
      cursor: isHeader ? 'default' : 'cell',
      transition: 'all 0.2s ease',
      fontSize: `${fontSize}px`,
      fontFamily: 'Segoe UI, Calibri, Arial, sans-serif',
      userSelect: 'none' as const,
      overflow: 'hidden',
      whiteSpace: 'nowrap' as const,
      textOverflow: 'ellipsis',
      boxSizing: 'border-box' as const,
      display: 'flex',
      alignItems: 'center',
      justifyContent: isHeader ? 'center' : (col === 1 && !isHeader) ? 'center' : 'flex-start'
    };
  };

  const handleCellClick = (row: number, col: number) => {
    if (onCellClick && !showRowNumbers && !showColumnHeaders) {
      const cellId = getCellId(row, col);
      onCellClick(row, col, cellId);
    } else if (onCellClick && ((row >= 0 && showRowNumbers) || (col >= 0 && showColumnHeaders))) {
      const cellId = getCellId(row, col);
      onCellClick(row, col, cellId);
    }
  };

  const renderCell = (row: number, col: number, isHeader: boolean = false, content?: string) => {
    const cellId = `cell-${row}-${col}`;
    const displayContent = content || getCellValue(row, col);
    
    return (
      <div
        key={cellId}
        style={getCellStyle(row, col, isHeader)}
        onClick={() => !isHeader && handleCellClick(row, col)}
        title={displayContent}
      >
        {displayContent}
      </div>
    );
  };

  return (
    <div 
      ref={gridRef}
      style={{ 
        position: 'relative',
        border: `2px solid ${theme.cellBorder}`,
        borderRadius: '4px',
        overflow: 'auto',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxHeight: '600px'
      }}
    >
      <div style={{ 
        display: 'inline-block',
        minWidth: '100%'
      }}>
        {/* Column Headers */}
        {showColumnHeaders && (
          <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 10 }}>
            {showRowNumbers && renderCell(-1, -1, true, '')}
            {Array.from({ length: cols }, (_, colIndex) => 
              renderCell(-1, colIndex, true, getColumnLabel(colIndex))
            )}
          </div>
        )}

        {/* Data Rows */}
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={`row-${rowIndex}`} style={{ display: 'flex' }}>
            {/* Row Number */}
            {showRowNumbers && renderCell(rowIndex, -1, true, (rowIndex + 1).toString())}
            
            {/* Data Cells */}
            {Array.from({ length: cols }, (_, colIndex) => 
              renderCell(rowIndex, colIndex)
            )}
          </div>
        ))}
      </div>

      {/* Mouse Cursor */}
      <MouseCursor 
        x={mousePosition.x} 
        y={mousePosition.y} 
        visible={showMouse}
        isClicking={isMouseClicking}
        cursorType={cursorType}
      />
    </div>
  );
};

export default SpreadsheetGrid;