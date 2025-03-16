import React, { useState } from 'react';

const Level2Component = ({ numPeriods }) => {
  const initialArray = Array(numPeriods).fill('');

  // Tabela dla Drewna
  const [grossReqDrewno, setGrossReqDrewno] = useState(initialArray);
  const [plannedReceiptDrewno, setPlannedReceiptDrewno] = useState(initialArray);
  const [plannedOrderReceiptDrewno, setPlannedOrderReceiptDrewno] = useState(initialArray);
  const [inventoryDrewno, setInventoryDrewno] = useState(initialArray);
  const [netReqDrewno, setNetReqDrewno] = useState(initialArray);
  const [plannedOrderDrewno, setPlannedOrderDrewno] = useState(initialArray);

  // Tabela dla Zawiasów
  const [grossReqZawiasy, setGrossReqZawiasy] = useState(initialArray);
  const [plannedReceiptZawiasy, setPlannedReceiptZawiasy] = useState(initialArray);
  const [plannedOrderReceiptZawiasy, setPlannedOrderReceiptZawiasy] = useState(initialArray);
  const [inventoryZawiasy, setInventoryZawiasy] = useState(initialArray);
  const [netReqZawiasy, setNetReqZawiasy] = useState(initialArray);
  const [plannedOrderZawiasy, setPlannedOrderZawiasy] = useState(initialArray);

  const updateArray = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  return (
    <div>
      <h2>Level 2 – Drewno i Zawiasy (Zamawiane)</h2>
      <h3>DREWNO</h3>
      <table className="simulation-table">
        <thead>
          <tr>
            <th>Parametr</th>
            {Array.from({ length: numPeriods }, (_, i) => (
              <th key={i}>Okres {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wymaganie brutto</td>
            {grossReqDrewno.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setGrossReqDrewno, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcia</td>
            {plannedReceiptDrewno.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedReceiptDrewno, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcie zamówień</td>
            {plannedOrderReceiptDrewno.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderReceiptDrewno, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Przewidywany stan</td>
            {inventoryDrewno.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setInventoryDrewno, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Zapotrzebowanie netto</td>
            {netReqDrewno.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setNetReqDrewno, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane zamówienia</td>
            {plannedOrderDrewno.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderDrewno, i, e.target.value)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h3>ZAWIASY</h3>
      <table className="simulation-table">
        <thead>
          <tr>
            <th>Parametr</th>
            {Array.from({ length: numPeriods }, (_, i) => (
              <th key={i}>Okres {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Wymaganie brutto</td>
            {grossReqZawiasy.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setGrossReqZawiasy, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcia</td>
            {plannedReceiptZawiasy.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedReceiptZawiasy, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcie zamówień</td>
            {plannedOrderReceiptZawiasy.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderReceiptZawiasy, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Przewidywany stan</td>
            {inventoryZawiasy.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setInventoryZawiasy, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Zapotrzebowanie netto</td>
            {netReqZawiasy.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setNetReqZawiasy, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane zamówienia</td>
            {plannedOrderZawiasy.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderZawiasy, i, e.target.value)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Level2Component;
