import { Translation } from '../types';

export const nl: Translation = {
  // General
  student: 'Student',
  grade: 'Cijfer',
  result: 'Resultaat',
  passed: 'Geslaagd',
  failed: 'Gezakt',
  
  // Controls
  startAnimation: 'Start Animatie',
  nextStep: 'Volgende Stap',
  previousStep: 'Vorige Stap',
  resetAnimation: 'Reset',
  pauseAnimation: 'Pauzeer',
  resumeAnimation: 'Hervat',
  
  // Export
  exportGif: 'Export als GIF',
  exportMp4: 'Export als MP4',
  exportHtml: 'Export als HTML',
  
  // Steps
  step: 'Stap',
  of: 'van',
  
  // Actions
  clickCell: 'Klik op cel',
  typeFormula: 'Type de formule',
  pressEnter: 'Druk Enter',
  copyFormula: 'Kopieer formule',
  selectRange: 'Selecteer bereik',
  dragFill: 'Sleep om te vullen',
  
  // UI
  tips: 'Tips',
  about: 'Over deze animatie',
  language: 'Taal',
  theme: 'Thema',
  settings: 'Instellingen',
  
  // Formulas
  ifFormula: 'ALS formule',
  sumFormula: 'SOM formule',
  averageFormula: 'GEMIDDELDE formule',
  vlookupFormula: 'VERT.ZOEKEN formule',
  countFormula: 'AANTAL formule',
  
  // Descriptions
  ifFormulaDescription: 'Leer hoe je voorwaardelijke logica gebruikt',
  sumFormulaDescription: 'Bereken de som van een bereik cellen',
  averageFormulaDescription: 'Bereken het gemiddelde van getallen',
  vlookupFormulaDescription: 'Zoek waarden in een tabel',
  
  // Messages
  animationComplete: 'Animatie voltooid!',
  exportSuccess: 'Export succesvol!',
  exportError: 'Fout bij exporteren',
  
  // Tooltips
  playTooltip: 'Start de animatie',
  pauseTooltip: 'Pauzeer de animatie',
  resetTooltip: 'Reset naar het begin',
  nextTooltip: 'Ga naar volgende stap',
  previousTooltip: 'Ga naar vorige stap'
};

export const en: Translation = {
  // General
  student: 'Student',
  grade: 'Grade',
  result: 'Result',
  passed: 'Passed',
  failed: 'Failed',
  
  // Controls
  startAnimation: 'Start Animation',
  nextStep: 'Next Step',
  previousStep: 'Previous Step',
  resetAnimation: 'Reset',
  pauseAnimation: 'Pause',
  resumeAnimation: 'Resume',
  
  // Export
  exportGif: 'Export as GIF',
  exportMp4: 'Export as MP4',
  exportHtml: 'Export as HTML',
  
  // Steps
  step: 'Step',
  of: 'of',
  
  // Actions
  clickCell: 'Click on cell',
  typeFormula: 'Type the formula',
  pressEnter: 'Press Enter',
  copyFormula: 'Copy formula',
  selectRange: 'Select range',
  dragFill: 'Drag to fill',
  
  // UI
  tips: 'Tips',
  about: 'About this animation',
  language: 'Language',
  theme: 'Theme',
  settings: 'Settings',
  
  // Formulas
  ifFormula: 'IF formula',
  sumFormula: 'SUM formula',
  averageFormula: 'AVERAGE formula',
  vlookupFormula: 'VLOOKUP formula',
  countFormula: 'COUNT formula',
  
  // Descriptions
  ifFormulaDescription: 'Learn how to use conditional logic',
  sumFormulaDescription: 'Calculate the sum of a range of cells',
  averageFormulaDescription: 'Calculate the average of numbers',
  vlookupFormulaDescription: 'Look up values in a table',
  
  // Messages
  animationComplete: 'Animation completed!',
  exportSuccess: 'Export successful!',
  exportError: 'Export error',
  
  // Tooltips
  playTooltip: 'Start the animation',
  pauseTooltip: 'Pause the animation',
  resetTooltip: 'Reset to beginning',
  nextTooltip: 'Go to next step',
  previousTooltip: 'Go to previous step'
};

export const fr: Translation = {
  // General
  student: 'Étudiant',
  grade: 'Note',
  result: 'Résultat',
  passed: 'Réussi',
  failed: 'Échoué',
  
  // Controls
  startAnimation: 'Démarrer Animation',
  nextStep: 'Étape Suivante',
  previousStep: 'Étape Précédente',
  resetAnimation: 'Reset',
  pauseAnimation: 'Pause',
  resumeAnimation: 'Reprendre',
  
  // Export
  exportGif: 'Exporter en GIF',
  exportMp4: 'Exporter en MP4',
  exportHtml: 'Exporter en HTML',
  
  // Steps
  step: 'Étape',
  of: 'de',
  
  // Actions
  clickCell: 'Cliquer sur cellule',
  typeFormula: 'Taper la formule',
  pressEnter: 'Appuyer Entrée',
  copyFormula: 'Copier formule',
  selectRange: 'Sélectionner plage',
  dragFill: 'Glisser pour remplir',
  
  // UI
  tips: 'Conseils',
  about: 'À propos de cette animation',
  language: 'Langue',
  theme: 'Thème',
  settings: 'Paramètres',
  
  // Formulas
  ifFormula: 'Formule SI',
  sumFormula: 'Formule SOMME',
  averageFormula: 'Formule MOYENNE',
  vlookupFormula: 'Formule RECHERCHEV',
  countFormula: 'Formule NB',
  
  // Descriptions
  ifFormulaDescription: 'Apprendre la logique conditionnelle',
  sumFormulaDescription: 'Calculer la somme d\'une plage de cellules',
  averageFormulaDescription: 'Calculer la moyenne des nombres',
  vlookupFormulaDescription: 'Rechercher des valeurs dans un tableau',
  
  // Messages
  animationComplete: 'Animation terminée!',
  exportSuccess: 'Export réussi!',
  exportError: 'Erreur d\'export',
  
  // Tooltips
  playTooltip: 'Démarrer l\'animation',
  pauseTooltip: 'Mettre en pause l\'animation',
  resetTooltip: 'Remettre au début',
  nextTooltip: 'Aller à l\'étape suivante',
  previousTooltip: 'Aller à l\'étape précédente'
};

export const translations = {
  nl,
  en,
  fr
};

export type LanguageCode = keyof typeof translations;