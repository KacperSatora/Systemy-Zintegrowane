import { useEffect, useState } from "react";
import "../styles/MRPTable.css";
import calculateMRP from "./MRPLogic"
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
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    if (!demand || demand.length === 0) return;

    const result = calculateMRP({
      periods: periods.map(Number),
      initialInventory,
      initialLeadTime,
      initialLotSize,
      demand,
    });

    setProjectedOnHand(result.projectedOnHand);
    setNetRequirements(result.netRequirements);
    setPlannedOrders(result.plannedOrders);
    setPlannedReceipts(result.plannedReceipts);
    setIsCalculated(true);

    if (onCalculate) onCalculate(result.plannedOrders);
  }, [demand, periods, initialInventory, initialLeadTime, initialLotSize]);

  const getCellClass = (value: number, isPlannedReceipt: boolean, index: number) => {
    // Kolorowanie na czerwono (ujemna wartość) - przygotowane nie wdrożone
    if (value < 0) {
      return "error-cell";
    }

    //Kolorowanie na żółto (jeżeli planowane przyjęcie wychodzi poza skalę) - przygotowane nie wdrożone, nie wiem jak ten warunek dobrze przekazac
    if (isPlannedReceipt && plannedOrders[index] === 0 && plannedReceipts[index] > 0) {
      return "warning-cell";
    }

    return "";
  };

  return (
    <div className="mrp-container">
      <h3 className="mrp-title">
        {itemName} (BOM Level: {bomLevel})
      </h3>

      <table className="mrp-table">
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
            <td>Przewidywany Popyt</td>
            {demand?.map((d, index) => (
              <td key={index} className={getCellClass(d, false, index)}>{d}</td>
            ))}
          </tr>
          {isCalculated && (
            <>
              <tr>
                <td>Przewidywane na stanie</td>
                {projectedOnHand.map((ph, index) => (
                  <td key={index} className={getCellClass(ph, false, index)}>{ph}</td>
                ))}
              </tr>
              <tr>
                <td>Zapotrzebowanie netto</td>
                {netRequirements.map((nr, index) => (
                  <td key={index} className={getCellClass(nr, false, index)}>{nr}</td>
                ))}
              </tr>
              <tr>
                <td>Planowane zamówienia</td>
                {plannedOrders.map((po, index) => (
                  <td key={index} className={getCellClass(po, false, index)}>{po || ""}</td>
                ))}
              </tr>
              <tr>
                <td>Planowane przyjęcia</td>
                {plannedReceipts.map((pr, index) => (
                  <td key={index} className={getCellClass(pr, true, index)}>{pr || ""}</td>
                ))}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
