import React from 'react';

const ParametrComponent = ({ onChange }) => {
  return (
    <div className="parametr-container">
      <h2>Ustawienia parametrów</h2>
      <div className="parametr-fields">
        {/* Level 0 – Szkatułka */}
        <div>
          <label>
            Czas realizacji Szkatułki:
            <input type="number" defaultValue={1} onChange={(e) => onChange('czasRealizacjiSzkatułka', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Lot Szkatułki:
            <input type="number" defaultValue={10} onChange={(e) => onChange('lotSzkatułka', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Na stanie Szkatułki:
            <input type="number" defaultValue={50} onChange={(e) => onChange('naStanSzkatułka', e.target.value)} />
          </label>
        </div>
        {/* Level 1 – WIECZKO */}
        <div>
          <label>
            Czas realizacji WIECZKA:
            <input type="number" defaultValue={2} onChange={(e) => onChange('czasRealizacjiWieczko', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Lot WIECZKA:
            <input type="number" defaultValue={10} onChange={(e) => onChange('lotWieczko', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Na stanie WIECZKA:
            <input type="number" defaultValue={30} onChange={(e) => onChange('naStanWieczko', e.target.value)} />
          </label>
        </div>
        {/* Level 1 – KORPUS */}
        <div>
          <label>
            Czas realizacji KORPUS:
            <input type="number" defaultValue={2} onChange={(e) => onChange('czasRealizacjiKorpus', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Lot KORPUS:
            <input type="number" defaultValue={10} onChange={(e) => onChange('lotKorpus', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Na stanie KORPUS:
            <input type="number" defaultValue={30} onChange={(e) => onChange('naStanKorpus', e.target.value)} />
          </label>
        </div>
        {/* Level 2 – Drewno */}
        <div>
          <label>
            Czas realizacji Drewno:
            <input type="number" defaultValue={3} onChange={(e) => onChange('czasRealizacjiDrewno', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Lot Drewno:
            <input type="number" defaultValue={20} onChange={(e) => onChange('lotDrewno', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Na stanie Drewno:
            <input type="number" defaultValue={15} onChange={(e) => onChange('naStanDrewno', e.target.value)} />
          </label>
        </div>
        {/* Level 2 – Zawiasy */}
        <div>
          <label>
            Czas realizacji Zawiasy:
            <input type="number" defaultValue={3} onChange={(e) => onChange('czasRealizacjiZawiasy', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Lot Zawiasy:
            <input type="number" defaultValue={20} onChange={(e) => onChange('lotZawiasy', e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Na stanie Zawiasy:
            <input type="number" defaultValue={15} onChange={(e) => onChange('naStanZawiasy', e.target.value)} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParametrComponent;
