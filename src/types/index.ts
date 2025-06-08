export interface AnimationStep {
  id: string;
  description: string;
  actions: AnimationAction[];
  duration?: number;
  autoNext?: boolean;
}

export interface AnimationAction {
  type: 'selectCell' | 'typeText' | 'moveMouse' | 'click' | 'setCellValue' | 'selectRange' | 'dragFill';
  cell?: string;
  text?: string;
  value?: string;
  target?: string;
  duration?: number;
  speed?: number;
  range?: string;
  fromCell?: string;
  toCell?: string;
}

export interface Theme {
  headerBg: string;
  headerText: string;
  cellBorder: string;
  selectedBg: string;
  selectedText: string;
  formulaBarBg: string;
  buttonPrimary: string;
  buttonSecondary: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
  shadowColor: string;
}

export interface Translation {
  [key: string]: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface CellPosition {
  row: number;
  col: number;
}

export interface AnimationConfig {
  language: 'nl' | 'en' | 'fr';
  theme: 'excel2019' | 'excel365' | 'googleSheets' | 'darkMode';
  autoPlay: boolean;
  showExportButtons: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
}

export interface ExportOptions {
  format: 'gif' | 'mp4' | 'webm' | 'html';
  width?: number;
  height?: number;
  fps?: number;
  quality?: number;
  duration?: number;
}

export interface ScenarioMetadata {
  id: string;
  title: string;
  description: string;
  category: 'formulas' | 'formatting' | 'charts' | 'pivot' | 'functions';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in seconds
  prerequisites?: string[];
  learningObjectives: string[];
}

export interface Scenario {
  metadata: ScenarioMetadata;
  initialData: string[][];
  steps: AnimationStep[];
  finalData?: string[][];
}

export interface MouseTrail {
  positions: MousePosition[];
  timestamps: number[];
}

export interface AnimationEvent {
  type: 'start' | 'pause' | 'resume' | 'stop' | 'step' | 'complete';
  timestamp: number;
  stepIndex?: number;
  data?: any;
}

export interface CellStyle {
  backgroundColor?: string;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  border?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export interface GridConfig {
  rows: number;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  showRowNumbers: boolean;
  showColumnHeaders: boolean;
  enableSelection: boolean;
  enableEditing: boolean;
}

export interface AnimationTiming {
  stepDelay: number;
  actionDelay: number;
  typingSpeed: number;
  mouseSpeed: number;
  transitionDuration: number;
}

// Utility types
export type LanguageCode = 'nl' | 'en' | 'fr';
export type ThemeName = 'excel2019' | 'excel365' | 'googleSheets' | 'darkMode';
export type AnimationSpeed = 'slow' | 'normal' | 'fast';
export type ExportFormat = 'gif' | 'mp4' | 'webm' | 'html';
export type CellReference = string; // e.g., "A1", "B2", etc.
export type CellRange = string; // e.g., "A1:C3"

// Event handlers
export type AnimationEventHandler = (event: AnimationEvent) => void;
export type CellClickHandler = (row: number, col: number, cellId: string) => void;
export type StepChangeHandler = (step: AnimationStep, index: number) => void;