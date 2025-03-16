import React, { useState } from 'react';

const Level1Component = ({ numPeriods }) => {
  const initialArray = Array(numPeriods).fill('');

  // Tabela dla WIECZKA
  const [grossReqWieczko, setGrossReqWieczko] = useState(initialArray);
  const [plannedReceiptWieczko, setPlannedReceiptWieczko] = useState(initialArray);
  const [plannedOrderReceiptWieczko, setPlannedOrderReceiptWieczko] = useState(initialArray);
  const [inventoryWieczko, setInventoryWieczko] = useState(initialArray);
  const [netReqWieczko, setNetReqWieczko] = useState(initialArray);
  const [plannedOrderWieczko, setPlannedOrderWieczko] = useState(initialArray);

  // Tabela dla KORPUS
  const [grossReqKorpus, setGrossReqKorpus] = useState(initialArray);
  const [plannedReceiptKorpus, setPlannedReceiptKorpus] = useState(initialArray);
  const [plannedOrderReceiptKorpus, setPlannedOrderReceiptKorpus] = useState(initialArray);
  const [inventoryKorpus, setInventoryKorpus] = useState(initialArray);
  const [netReqKorpus, setNetReqKorpus] = useState(initialArray);
  const [plannedOrderKorpus, setPlannedOrderKorpus] = useState(initialArray);

  const updateArray = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  return (
    <div>
      <h2>Level 1 – WIECZKO i KORPUS (Produkowane)</h2>
      <h3>WIECZKO</h3>
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
            {grossReqWieczko.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setGrossReqWieczko, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcia</td>
            {plannedReceiptWieczko.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedReceiptWieczko, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcie zamówień</td>
            {plannedOrderReceiptWieczko.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderReceiptWieczko, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Przewidywany stan</td>
            {inventoryWieczko.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setInventoryWieczko, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Zapotrzebowanie netto</td>
            {netReqWieczko.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setNetReqWieczko, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane zamówienia</td>
            {plannedOrderWieczko.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderWieczko, i, e.target.value)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <h3>KORPUS</h3>
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
            {grossReqKorpus.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setGrossReqKorpus, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcia</td>
            {plannedReceiptKorpus.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedReceiptKorpus, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcie zamówień</td>
            {plannedOrderReceiptKorpus.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderReceiptKorpus, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Przewidywany stan</td>
            {inventoryKorpus.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setInventoryKorpus, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Zapotrzebowanie netto</td>
            {netReqKorpus.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setNetReqKorpus, i, e.target.value)} />
              </td>
            ))}
          </tr>
          <tr>
            <td>Planowane zamówienia</td>
            {plannedOrderKorpus.map((val, i) => (
              <td key={i}>
                <input type="number" value={val} onChange={e => updateArray(setPlannedOrderKorpus, i, e.target.value)} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Level1Component;
