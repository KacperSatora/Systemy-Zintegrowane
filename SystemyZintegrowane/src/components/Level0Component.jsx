import React, { useState } from 'react';

const Level0Component = ({ numPeriods }) => {
  const initialArray = Array(numPeriods).fill('');
  // Definiujemy pola tabeli – wszystkie są edytowalne
  const [grossReq, setGrossReq] = useState(initialArray);
  const [plannedReceipt, setPlannedReceipt] = useState(initialArray);
  const [plannedOrderReceipt, setPlannedOrderReceipt] = useState(initialArray);
  const [inventory, setInventory] = useState(initialArray);
  const [netReq, setNetReq] = useState(initialArray);
  const [plannedOrder, setPlannedOrder] = useState(initialArray);

  const updateArray = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  return (
    <div>
      <h2>Level 0 – Szkatułka (Produkt finalny)</h2>
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
            <td>Wymaganie brutto (GR)</td>
            {grossReq.map((val, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={val}
                  onChange={e => updateArray(setGrossReq, i, e.target.value)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcia</td>
            {plannedReceipt.map((val, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={val}
                  onChange={e => updateArray(setPlannedReceipt, i, e.target.value)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcie zamówień</td>
            {plannedOrderReceipt.map((val, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={val}
                  onChange={e => updateArray(setPlannedOrderReceipt, i, e.target.value)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>Przewidywany stan</td>
            {inventory.map((val, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={val}
                  onChange={e => updateArray(setInventory, i, e.target.value)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>Zapotrzebowanie netto</td>
            {netReq.map((val, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={val}
                  onChange={e => updateArray(setNetReq, i, e.target.value)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane zamówienia</td>
            {plannedOrder.map((val, i) => (
              <td key={i}>
                <input
                  type="number"
                  value={val}
                  onChange={e => updateArray(setPlannedOrder, i, e.target.value)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Level0Component;
