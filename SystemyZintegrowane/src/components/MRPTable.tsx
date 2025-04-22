import { useEffect, useState } from "react";
import "../index.css";
import calculateMRP from "./MRPLogic";
import { MRPTableProps } from "../constants";

export default function MRPTable({
  periods,
  initialInventory,
  initialLeadTime,
  initialLotSize,
  itemName,
  bomLevel,
  demand,
  onCalculate,
}: MRPTableProps & { onCalculate?: (plannedOrders: number[]) => void }) {
  const [projectedOnHand, setProjectedOnHand] = useState<number[]>([]);
  const [netRequirements, setNetRequirements] = useState<number[]>([]);
  const [plannedOrders, setPlannedOrders] = useState<number[]>([]);
  const [plannedReceipts, setPlannedReceipts] = useState<number[]>([]);
  const [manualPlannedReceipts, setManualPlannedReceipts] = useState<number[]>(
    Array(periods.length).fill(0)
  );
  const [isCalculated, setIsCalculated] = useState(false);
  const [leadTime, setLeadTime] = useState(initialLeadTime);
  const [lotSize, setLotSize] = useState(initialLotSize);
  const [inventory, setInventory] = useState(initialInventory);

  useEffect(() => {
    const result = calculateMRP({
      periods: periods.map(Number),
      initialInventory: inventory,
      initialLeadTime: leadTime,
      initialLotSize: lotSize,
      demand,
      manualPlannedReceipts: manualPlannedReceipts.map((value) =>
        value !== 0 ? value : 0 // Replace undefined with 0
      ),
    });

    setProjectedOnHand(result.projectedOnHand);
    setNetRequirements(result.netRequirements);
    setPlannedOrders(result.plannedOrders);

    // Inicjalizujemy drugi wiersz wartościami z algorytmu
    setPlannedReceipts(result.plannedReceipts);

    setIsCalculated(true);

    if (onCalculate) onCalculate(result.plannedOrders);
  }, [demand, periods, inventory, leadTime, lotSize]);

  const handlePlannedReceiptsChange = (value: number, index: number) => {
    const newManualPlannedReceipts = [...manualPlannedReceipts];
    newManualPlannedReceipts[index] = value >= 0 ? value : 0; // Zapobiegamy wartościom ujemnym
    setManualPlannedReceipts(newManualPlannedReceipts);
  };

  return (
    <div className="table-container">
      <h3 className="table-title">
        {itemName} (BOM Level: {bomLevel})
      </h3>

      <div className="table-controls">
        <label>
          Czas realizacji:
          <input
            type="number"
            value={leadTime}
            onChange={(e) => setLeadTime(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </label>
        <label>
          Wielkość partii:
          <input
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(Math.max(1, parseInt(e.target.value) || 1))}
          />
        </label>
        <label>
          Na stanie:
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(Math.max(0, parseInt(e.target.value) || 0))}
          />
        </label>
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
            <td>Całkowite zapotrzebowanie</td>
            {demand?.map((d, index) => (
              <td key={index}>{d}</td>
            ))}
          </tr>
          <tr>
            <td>Planowane przyjęcia</td>
            {plannedReceipts.map((pr, index) => (
              <td key={index}>
                <input
                  type="number"
                  value={manualPlannedReceipts[index] || pr || ""}
                  onChange={(e) =>
                    handlePlannedReceiptsChange(parseInt(e.target.value) || 0, index)
                  }
                  className="table-input"
                />
              </td>
            ))}
          </tr>
          {isCalculated && (
            <>
              <tr>
                <td>Przewidywane na stanie</td>
                {projectedOnHand.map((ph, index) => (
                  <td key={index}>{ph}</td>
                ))}
              </tr>
              <tr>
                <td>Zapotrzebowanie netto</td>
                {netRequirements.map((nr, index) => (
                  <td key={index}>{nr}</td>
                ))}
              </tr>
              <tr>
                <td>Planowane zamówienia</td>
                {plannedOrders.map((po, index) => (
                  <td key={index}>{po || ""}</td>
                ))}
              </tr>
              <tr>
                <td>Planowane przyjęcie zamówień</td>
                {plannedReceipts.map((pr, index) => (
                  <td key={index}>{pr || ""}</td>
                ))}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
