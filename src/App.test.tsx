import React from 'react';
import ExcelAnimationFramework from './components/ExcelAnimationFramework';
import { AnimationStep } from './types';
import './App.css';

// Example: IF Formula Scenario
const ifFormulaScenario: AnimationStep[] = [
  {
    id: 'intro',
    description: 'We gaan leren hoe we een ALS/IF formule gebruiken om te bepalen of studenten geslaagd zijn',
    actions: [],
    duration: 2000,
    autoNext: true
  },
  {
    id: 'click_cell',
    description: 'Klik op cel C2 waar we het resultaat willen tonen',
    actions: [
      { type: 'selectCell', cell: 'C2' }
    ]
  },
  {
    id: 'type_formula',
    description: 'Type de ALS formule om te controleren of het cijfer >= 70',
    actions: [
      { type: 'typeText', text: '=ALS(B2>=70;"Geslaagd";"Gezakt")', speed: 100 }
    ]
  },
  {
    id: 'press_enter',
    description: 'Druk Enter om de formule toe te passen',
    actions: [
      { type: 'setCellValue', cell: 'C2', value: 'Geslaagd' }
    ]
  },
  {
    id: 'copy_formula',
    description: 'Kopieer de formule naar de andere cellen om alle resultaten te berekenen',
    actions: [
      { type: 'selectCell', cell: 'C3', duration: 500 },
      { type: 'setCellValue', cell: 'C3', value: 'Gezakt' },
      { type: 'selectCell', cell: 'C4', duration: 500 },
      { type: 'setCellValue', cell: 'C4', value: 'Geslaagd' },
      { type: 'selectCell', cell: 'C5', duration: 500 },
      { type: 'setCellValue', cell: 'C5', value: 'Gezakt' }
    ]
  }
];

// Example: SUM Formula Scenario
const sumFormulaScenario: AnimationStep[] = [
  {
    id: 'intro',
    description: 'Leer hoe je de SOM functie gebruikt om cijfers op te tellen',
    actions: [],
    duration: 2000,
    autoNext: true
  },
  {
    id: 'click_total_cell',
    description: 'Klik op cel B6 waar we het totaal willen berekenen',
    actions: [
      { type: 'selectCell', cell: 'B6' }
    ]
  },
  {
    id: 'type_sum',
    description: 'Type de SOM formule om alle cijfers op te tellen',
    actions: [
      { type: 'typeText', text: '=SOM(B2:B5)', speed: 120 }
    ]
  },
  {
    id: 'show_result',
    description: 'Het totaal wordt berekend en getoond',
    actions: [
      { type: 'setCellValue', cell: 'B6', value: '275' }
    ]
  }
];

function App() {
  const [currentScenario, setCurrentScenario] = React.useState<'if' | 'sum'>('if');

  const scenarios = {
    if: {
      steps: ifFormulaScenario,
      title: "ALS/IF Formule Tutorial",
      description: "Leer hoe je voorwaardelijke logica gebruikt in Excel",
      data: [
        ['Student', 'Cijfer', 'Resultaat'],
        ['Anna', '85', ''],
        ['Bas', '65', ''],
        ['Chris', '72', ''],
        ['Diana', '58', '']
      ]
    },
    sum: {
      steps: sumFormulaScenario,
      title: "SOM Formule Tutorial", 
      description: "Leer hoe je getallen optelt met de SOM functie",
      data: [
        ['Student', 'Cijfer', 'Gemiddelde'],
        ['Anna', '85', ''],
        ['Bas', '65', ''],
        ['Chris', '72', ''],
        ['Diana', '58', ''],
        ['Totaal', '', '']
      ]
    }
  };

  const currentScenarioData = scenarios[currentScenario];

  return (
    <div className="App">
      {/* Scenario Selector */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #ddd'
      }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
          📚 Selecteer Scenario:
        </div>
        <select 
          value={currentScenario}
          onChange={(e) => setCurrentScenario(e.target.value as 'if' | 'sum')}
          style={{
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
            width: '200px'
          }}
        >
          <option value="if">🧮 ALS/IF Formule</option>
          <option value="sum">➕ SOM Formule</option>
        </select>
      </div>

      <ExcelAnimationFramework
        scenario={currentScenarioData.steps}
        initialData={currentScenarioData.data}
        title={currentScenarioData.title}
        description={currentScenarioData.description}
        language="nl"
        theme="excel2019"
        autoPlay={false}
        showExportButtons={true}
      />
    </div>
  );
}

export default App;