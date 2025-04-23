import { useState } from "react";
import * as constants from "../constants";
import "../index.css";

export default function GHPTable({
  periods,
  initialInventory,
  initialLeadTime,
  itemName,
  onCalculate,
  onReset,
}: constants.GHPTableProps & {
  onCalculate: (production: number[]) => void;
  onReset: () => void;
}) {
  const [inventory, setInventory] = useState(initialInventory);
  const [leadTime, setLeadTime] = useState(initialLeadTime);
  const [demand, setDemand] = useState(Array(periods.length).fill(0));
  const [production, setProduction] = useState(Array(periods.length).fill(0));
  const [available, setAvailable] = useState(Array(periods.length).fill(0));
  const [isCalculated, setIsCalculated] = useState(false);

  const handleDemandChange = (value: number, index: number) => {
    const newDemand = [...demand];
    newDemand[index] = value;
    setDemand(newDemand);
    onReset();
  };

  const handleCalculate = () => {
    const newAvailable = Array(periods.length).fill(0);
    const newProduction = Array(periods.length).fill(0);

    newAvailable[0] = inventory - demand[0];
    if (newAvailable[0] < 0) {
      const orderPeriod = 0 - leadTime;
      if (orderPeriod >= 0) {
        const needed = -newAvailable[0];
        newProduction[orderPeriod] = needed;
        newAvailable[0] = 0;
      }
    }

    for (let i = 1; i < periods.length; i++) {
      newAvailable[i] = newAvailable[i - 1] + newProduction[i] - demand[i];

      if (newAvailable[i] < 0) {
        const orderPeriod = i - leadTime;
        if (orderPeriod >= 0 && newProduction[orderPeriod] === 0) {
          const needed = -newAvailable[i];
          newProduction[orderPeriod] = needed;
          newAvailable[i] = 0;
        }
      }
    }

    setAvailable(newAvailable);
    setProduction(newProduction);
    setIsCalculated(true);

    onCalculate(newProduction);
  };

  return (
    <div className="table-container">
      <h3 className="table-title">{itemName} - GHP</h3>
      <div className="table-controls">
        <label>
          Czas realizacji:
          <input
            type="number"
            value={leadTime}
            onChange={(e) => {
              setLeadTime(parseInt(e.target.value) || 0);
              onReset();
            }}
          />
        </label>
        <label>
          Na stanie:
          <input
            type="number"
            value={inventory}
            onChange={(e) => {
              setInventory(parseInt(e.target.value) || 0);
              onReset();
            }}
          />
        </label>
        <button onClick={handleCalculate}>Oblicz</button>
      </div>

      <table className="table">
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
                  value={d || ""}
                  onChange={(e) =>
                    handleDemandChange(parseInt(e.target.value) || 0, index)
                  }
                />
              </td>
            ))}
          </tr>
          {isCalculated && (
            <>
              <tr>
                <td>Dostępne</td>
                {available.map((a, index) => (
                  <td key={index}>{a !== null && a !== undefined ? a : 0}</td>
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
