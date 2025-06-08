export interface AnimationStep {
  id: string;
  description: string;
  actions: AnimationAction[];
  duration?: number;
  autoNext?: boolean;
}

export interface AnimationAction {
  type: 'selectCell' | 'typeText' | 'moveMouse' | 'click' | 'setCellValue';
  cell?: string;
  text?: string;
  value?: string;
  target?: string;
  duration?: number;
  speed?: number;
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
}

export interface Translation {
  [key: string]: string;
}