import { useState } from "react";
import * as constants from "../constants";
import "../styles/GHPTable.css";

export default function GHPTable({
  periods,
  initialInventory,
  initialLeadTime,
  itemName,
  onCalculate, // Callback to pass production to parent
}: constants.GHPTableProps & { onCalculate: (production: number[]) => void }) {
  const [inventory, setInventory] = useState(initialInventory);
  const [leadTime, setLeadTime] = useState(initialLeadTime);
  const [lotSize, setLotSize] = useState(30);
  const [demand, setDemand] = useState(Array(periods.length).fill(0));
  const [production, setProduction] = useState(Array(periods.length).fill(0));
  const [available, setAvailable] = useState(Array(periods.length).fill(0));
  const [isCalculated, setIsCalculated] = useState(false);

  const handleDemandChange = (value: number, index: number) => {
    const newDemand = [...demand];
    newDemand[index] = value;
    setDemand(newDemand);
  };

  const handleCalculate = () => {
    const newAvailable = Array(periods.length).fill(0);
    const newProduction = Array(periods.length).fill(0);

    newAvailable[0] = inventory;
    for (let i = 0; i < periods.length; i++) {
      const required = demand[i];

      if (i > 0) {
        newAvailable[i] = newAvailable[i - 1] + newProduction[i] - required;
      }

      // Jeśli zapas spada poniżej 0, produkcja jest wyzwalana
      if (newAvailable[i] < 0) {
        const orderPeriod = i - leadTime;

        if (orderPeriod >= 0 && newProduction[orderPeriod] === 0) {
          newProduction[orderPeriod] = lotSize;
          newAvailable[i] += lotSize;
        }
      }
    }

    setAvailable(newAvailable);
    setProduction(newProduction);
    setIsCalculated(true);

    // Pass production to parent
    onCalculate(newProduction);
  };

  return (
    <div className="ghp-container">
      <h3 className="ghp-title">{itemName} - GHP</h3>

      <div className="ghp-controls">
        <label>
          Czas realizacji:
          <input
            type="number"
            value={leadTime}
            onChange={(e) => setLeadTime(parseInt(e.target.value) || 0)}
            className="ghp-input"
          />
        </label>
        <label>
          Na stanie:
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(parseInt(e.target.value) || 0)}
            className="ghp-input"
          />
        </label>
        <label>
          Wielkość partii:
          <input
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(parseInt(e.target.value) || 30)}
            className="ghp-input"
          />
        </label>
        <button onClick={handleCalculate} className="ghp-button">
          Oblicz
        </button>
      </div>

      <table className="ghp-table">
        <thead>
          <tr>
            <th>Okres</th>
            {periods.map((p, index) => (
              <th key={index}>{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Popyt</td>
            {demand.map((d, index) => (
              <td key={index}>
                <input
                  type="number"
                  value={d}
                  onChange={(e) =>
                    handleDemandChange(parseInt(e.target.value) || 0, index)
                  }
                  className="ghp-input"
                />
              </td>
            ))}
          </tr>
          {isCalculated && (
            <>
              <tr>
                <td>Dostępne</td>
                {available.map((a, index) => (
                  <td key={index}>{a}</td>
                ))}
              </tr>
              <tr>
                <td>Produkcja</td>
                {production.map((p, index) => (
                  <td key={index}>{p || ""}</td>
                ))}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
