import { Theme } from '../types';

export const excel2019: Theme = {
  headerBg: '#f5f5f5',
  headerText: '#333',
  cellBorder: '#c7c7c7',
  selectedBg: '#4285f4',
  selectedText: 'white',
  formulaBarBg: '#f5f5f5',
  buttonPrimary: '#28a745',
  buttonSecondary: '#007bff',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  borderRadius: '4px',
  fontFamily: 'Segoe UI, Calibri, Arial, sans-serif',
  shadowColor: 'rgba(0,0,0,0.1)'
};

export const excel365: Theme = {
  headerBg: '#e8e8e8',
  headerText: '#333',
  cellBorder: '#d1d1d1',
  selectedBg: '#0078d4',
  selectedText: 'white',
  formulaBarBg: '#f3f2f1',
  buttonPrimary: '#0078d4',
  buttonSecondary: '#605e5c',
  backgroundColor: '#faf9f8',
  textColor: '#323130',
  borderRadius: '2px',
  fontFamily: 'Segoe UI, Calibri, Arial, sans-serif',
  shadowColor: 'rgba(0,0,0,0.08)'
};

export const googleSheets: Theme = {
  headerBg: '#f8f9fa',
  headerText: '#5f6368',
  cellBorder: '#dadce0',
  selectedBg: '#1a73e8',
  selectedText: 'white',
  formulaBarBg: '#fff',
  buttonPrimary: '#1a73e8',
  buttonSecondary: '#5f6368',
  backgroundColor: '#ffffff',
  textColor: '#202124',
  borderRadius: '8px',
  fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
  shadowColor: 'rgba(60,64,67,0.15)'
};

export const darkMode: Theme = {
  headerBg: '#2d2d2d',
  headerText: '#ffffff',
  cellBorder: '#404040',
  selectedBg: '#0078d4',
  selectedText: 'white',
  formulaBarBg: '#2d2d2d',
  buttonPrimary: '#0078d4',
  buttonSecondary: '#6264a7',
  backgroundColor: '#1e1e1e',
  textColor: '#ffffff',
  borderRadius: '4px',
  fontFamily: 'Segoe UI, Calibri, Arial, sans-serif',
  shadowColor: 'rgba(0,0,0,0.3)'
};

export const themes = {
  excel2019,
  excel365,
  googleSheets,
  darkMode
};

export type ThemeName = keyof typeof themes;