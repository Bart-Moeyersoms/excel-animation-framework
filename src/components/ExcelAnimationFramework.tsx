import React, { useState, useRef, useEffect } from 'react';
import { AnimationEngine } from './framework/AnimationEngine';
import SpreadsheetGrid from './framework/SpreadsheetGrid';
import FormulaBar from './framework/FormulaBar';
import Controls from './ui/Controls';
import { themes } from '../themes';
import { translations } from '../translations';
import { AnimationStep, AnimationAction, Theme, Translation } from '../types';

interface ExcelAnimationFrameworkProps {
  scenario?: AnimationStep[];
  initialData?: string[][];
  title?: string;
  description?: string;
  language?: 'nl' | 'en' | 'fr';
  theme?: 'excel2019' | 'excel365' | 'googleSheets' | 'darkMode';
  autoPlay?: boolean;
  showExportButtons?: boolean;
}

const ExcelAnimationFramework: React.FC<ExcelAnimationFrameworkProps> = ({
  scenario,
  initialData,
  title = "Excel Animation Framework",
  description = "Interactive Excel tutorial with animations",
  language = 'nl',
  theme = 'excel2019',
  autoPlay = false,
  showExportButtons = true
}) => {
  // State
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string>('');
  const [formulaBarValue, setFormulaBarValue] = useState('');
  const [showFormula, setShowFormula] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showMouse, setShowMouse] = useState(false);
  const [isMouseClicking, setIsMouseClicking] = useState(false);
  const [data, setData] = useState<string[][]>(initialData || [
    ['Student', 'Cijfer', 'Resultaat'],
    ['Anna', '85', ''],
    ['Bas', '65', ''],
    ['Chris', '72', ''],
    ['Diana', '58', '']
  ]);

  // Refs
  const animationRef = useRef<AnimationEngine | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get current translations and theme
  const t = translations[currentLanguage];
  const currentThemeObj = themes[currentTheme];

  // Default scenario if none provided
  const defaultScenario: AnimationStep[] = [
    {
      id: 'click_cell',
      description: `${t.clickCell} C2`,
      actions: [
        { type: 'selectCell', cell: 'C2' }
      ]
    },
    {
      id: 'type_formula',
      description: t.typeFormula,
      actions: [
        { type: 'typeText', text: '=ALS(B2>=70;"Geslaagd";"Gezakt")', speed: 150 }
      ]
    },
    {
      id: 'press_enter',
      description: t.pressEnter,
      actions: [
        { type: 'setCellValue', cell: 'C2', value: 'Geslaagd' }
      ]
    },
    {
      id: 'copy_formula',
      description: t.copyFormula,
      actions: [
        { type: 'setCellValue', cell: 'C3', value: 'Gezakt' },
        { type: 'setCellValue', cell: 'C4', value: 'Geslaagd' },
        { type: 'setCellValue', cell: 'C5', value: 'Gezakt' }
      ]
    }
  ];

  const animationSteps = scenario || defaultScenario;

  // Initialize animation engine
  useEffect(() => {
    animationRef.current = new AnimationEngine(
      animationSteps,
      (step: AnimationStep, index: number) => {
        setCurrentStep(index);
      },
      () => {
        setIsPlaying(false);
        setShowMouse(false);
      },
      (action: AnimationAction) => {
        executeAction(action);
      }
    );

    if (autoPlay) {
      startAnimation();
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.reset();
      }
    };
  }, [animationSteps, autoPlay]);

  // Execute animation actions
  const executeAction = (action: AnimationAction) => {
    switch (action.type) {
      case 'selectCell':
        setSelectedCell(action.cell || '');
        break;
      case 'typeText':
        setShowFormula(true);
        if (action.text && animationRef.current) {
          animationRef.current.typeText(action.text, setFormulaBarValue, action.speed);
        }
        break;
      case 'setCellValue':
        if (action.cell && action.value) {
          const newData = [...data];
          const cellRow = parseInt(action.cell.slice(1)) - 1;
          const cellCol = action.cell.charCodeAt(0) - 65;
          if (newData[cellRow]) {
            newData[cellRow][cellCol] = action.value;
            setData(newData);
          }
        }
        setShowFormula(false);
        setFormulaBarValue('');
        break;
      case 'moveMouse':
        setShowMouse(true);
        // Calculate position based on cell
        break;
      case 'click':
        setIsMouseClicking(true);
        setTimeout(() => setIsMouseClicking(false), 200);
        break;
    }
  };

  // Control handlers
  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    resetData();
    if (animationRef.current) {
      animationRef.current.start();
    }
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const resumeAnimation = () => {
    setIsPlaying(true);
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSelectedCell('');
    setFormulaBarValue('');
    setShowFormula(false);
    setShowMouse(false);
    resetData();
    if (animationRef.current) {
      animationRef.current.reset();
    }
  };

  const nextStep = () => {
    if (animationRef.current) {
      animationRef.current.next();
    }
  };

  const previousStep = () => {
    if (animationRef.current) {
      animationRef.current.previous();
    }
  };

  const goToStep = (stepIndex: number) => {
    if (animationRef.current) {
      animationRef.current.goToStep(stepIndex);
    }
  };

  const resetData = () => {
    setData(initialData || [
      [t.student, t.grade, t.result],
      ['Anna', '85', ''],
      ['Bas', '65', ''],
      ['Chris', '72', ''],
      ['Diana', '58', '']
    ]);
  };

  const exportAsGif = () => {
    // TODO: Implement GIF export
    console.log('Export as GIF');
  };

  const exportAsMp4 = () => {
    // TODO: Implement MP4 export
    console.log('Export as MP4');
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        padding: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        fontFamily: currentThemeObj.fontFamily,
        backgroundColor: currentThemeObj.backgroundColor,
        color: currentThemeObj.textColor,
        minHeight: '100vh'
      }}
    >
      {/* Header */}
      <div style={{ 
        background: `linear-gradient(135deg, ${currentThemeObj.buttonPrimary} 0%, ${currentThemeObj.buttonSecondary} 100%)`,
        color: 'white',
        padding: '24px',
        borderRadius: currentThemeObj.borderRadius,
        marginBottom: '20px',
        textAlign: 'center' as const,
        boxShadow: `0 4px 12px ${currentThemeObj.shadowColor}`
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '600' }}>
          🎬 {title}
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '16px' }}>
          {description}
        </p>
      </div>

      {/* Settings Row */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: showExportButtons ? '1fr 1fr 1fr' : '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Language & Theme */}
        <div style={{ 
          background: currentThemeObj.formulaBarBg, 
          padding: '20px', 
          borderRadius: currentThemeObj.borderRadius,
          border: `1px solid ${currentThemeObj.cellBorder}`,
          boxShadow: `0 2px 8px ${currentThemeObj.shadowColor}`
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: currentThemeObj.textColor }}>
            🌍 {t.language} & {t.theme}
          </h4>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value as any)}
              style={{ 
                flex: 1,
                padding: '8px', 
                borderRadius: currentThemeObj.borderRadius,
                border: `1px solid ${currentThemeObj.cellBorder}`,
                fontSize: '14px'
              }}
            >
              <option value="nl">Nederlands</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            
            <select 
              value={currentTheme} 
              onChange={(e) => setCurrentTheme(e.target.value as any)}
              style={{ 
                flex: 1,
                padding: '8px', 
                borderRadius: currentThemeObj.borderRadius,
                border: `1px solid ${currentThemeObj.cellBorder}`,
                fontSize: '14px'
              }}
            >
              <option value="excel2019">Excel 2019</option>
              <option value="excel365">Excel 365</option>
              <option value="googleSheets">Google Sheets</option>
              <option value="darkMode">Dark Mode</option>
            </select>
          </div>
        </div>

        {/* Animation Controls */}
        <div>
          <Controls
            isPlaying={isPlaying}
            currentStep={currentStep}
            totalSteps={animationSteps.length}
            theme={currentThemeObj}
            translations={t}
            onStart={startAnimation}
            onPause={pauseAnimation}
            onResume={resumeAnimation}
            onReset={resetAnimation}
            onNext={nextStep}
            onPrevious={previousStep}
            onStepClick={goToStep}
          />
        </div>

        {/* Export Options */}
        {showExportButtons && (
          <div style={{ 
            background: currentThemeObj.formulaBarBg, 
            padding: '20px', 
            borderRadius: currentThemeObj.borderRadius,
            border: `1px solid ${currentThemeObj.cellBorder}`,
            boxShadow: `0 2px 8px ${currentThemeObj.shadowColor}`
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: currentThemeObj.textColor }}>
              📤 Export
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              <button 
                onClick={exportAsGif}
                style={{
                  padding: '8px 16px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: currentThemeObj.borderRadius,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {t.exportGif}
              </button>
              <button 
                onClick={exportAsMp4}
                style={{
                  padding: '8px 16px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: currentThemeObj.borderRadius,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {t.exportMp4}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Step Description */}
      {isPlaying && (
        <div style={{ 
          background: '#e3f2fd',
          padding: '16px',
          borderRadius: currentThemeObj.borderRadius,
          marginBottom: '20px',
          border: '1px solid #bbdefb'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '16px' }}>
              📋 {animationSteps[currentStep]?.description}
            </strong>
            <span style={{ fontSize: '14px', color: '#666', opacity: 0.8 }}>
              {t.step} {currentStep + 1} {t.of} {animationSteps.length}
            </span>
          </div>
        </div>
      )}

      {/* Formula Bar */}
      <FormulaBar
        selectedCell={selectedCell}
        value={showFormula ? formulaBarValue : ''}
        isEditing={showFormula}
        theme={currentThemeObj}
        showCursor={showFormula}
      />

      {/* Spreadsheet */}
      <SpreadsheetGrid
        data={data}
        selectedCell={selectedCell}
        theme={currentThemeObj}
        mousePosition={mousePosition}
        showMouse={showMouse}
        isMouseClicking={isMouseClicking}
        onCellClick={(row, col, cellId) => {
          setSelectedCell(cellId);
        }}
      />

      {/* Info Panel */}
      <div style={{ 
        background: currentThemeObj.formulaBarBg,
        padding: '20px',
        borderRadius: currentThemeObj.borderRadius,
        marginTop: '20px',
        border: `1px solid ${currentThemeObj.cellBorder}`,
        boxShadow: `0 2px 8px ${currentThemeObj.shadowColor}`
      }}>
        <h4 style={{ marginTop: 0, color: currentThemeObj.textColor }}>
          💡 {t.about}:
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <strong>Framework Features:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>🌍 Multi-language support</li>
              <li>🎨 Multiple themes</li>
              <li>🖱️ Realistic mouse simulation</li>
              <li>📤 Export to GIF/MP4</li>
              <li>🔧 Modular animation system</li>
            </ul>
          </div>
          <div>
            <strong>Use Cases:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>📚 Training materials</li>
              <li>📖 Documentation</li>
              <li>🎥 Tutorial videos</li>
              <li>🌐 Interactive websites</li>
              <li>📱 Mobile learning apps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelAnimationFramework;