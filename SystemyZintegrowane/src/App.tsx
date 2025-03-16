import React, { useState } from 'react';
import ParametrComponent from './components/ParametrComponent';
import Level0Component from './components/Level0Component';
import Level1Component from './components/Level1Component';
import Level2Component from './components/Level2Component';

const NUM_PERIODS = 10;

function App() {
  // Ustawienia indywidualne dla każdego komponentu
  const [parametry, setParametry] = useState({
    // Level 0 – Szkatułka
    czasRealizacjiSzkatułka: 1,
    lotSzkatułka: 10,
    naStanSzkatułka: 50,
    // Level 1 – WIECZKO
    czasRealizacjiWieczko: 2,
    lotWieczko: 10,
    naStanWieczko: 30,
    // Level 1 – KORPUS
    czasRealizacjiKorpus: 2,
    lotKorpus: 10,
    naStanKorpus: 30,
    // Level 2 – Drewno
    czasRealizacjiDrewno: 3,
    lotDrewno: 20,
    naStanDrewno: 15,
    // Level 2 – Zawiasy
    czasRealizacjiZawiasy: 3,
    lotZawiasy: 20,
    naStanZawiasy: 15,
  });

  interface Parametry {
    czasRealizacjiSzkatułka: number;
    lotSzkatułka: number;
    naStanSzkatułka: number;
    czasRealizacjiWieczko: number;
    lotWieczko: number;
    naStanWieczko: number;
    czasRealizacjiKorpus: number;
    lotKorpus: number;
    naStanKorpus: number;
    czasRealizacjiDrewno: number;
    lotDrewno: number;
    naStanDrewno: number;
    czasRealizacjiZawiasy: number;
    lotZawiasy: number;
    naStanZawiasy: number;
  }

  const handleParamChange = (param: keyof Parametry, value: string) => {
    setParametry(prev => ({ ...prev, [param]: Number(value) }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Symulacja MRP/GHP dla Szkatułki</h1>
      <ParametrComponent onChange={handleParamChange} />
      <hr />
      <Level0Component parametry={parametry} numPeriods={NUM_PERIODS} />
      <hr />
      <Level1Component numPeriods={NUM_PERIODS} />
      <hr />
      <Level2Component numPeriods={NUM_PERIODS} />
    </div>
  );
}

export default App;
