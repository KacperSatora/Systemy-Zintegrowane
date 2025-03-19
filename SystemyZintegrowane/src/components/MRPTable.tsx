import { useState } from 'react';
import '../styles/MRPTable.css'; // Import stylów

interface MRPTableProps {
  periods: number[];
  initialInventory: number;
  initialLeadTime: number;
  initialLotSize: number;
  itemName: string;
  bomLevel: number;
}

const MRPTable: React.FC<MRPTableProps> = ({
  periods,
  initialInventory,
  initialLeadTime,
  initialLotSize,
  itemName,
  bomLevel
}) => {
  const [inventory, setInventory] = useState(initialInventory);
  const [leadTime, setLeadTime] = useState(initialLeadTime);
  const [lotSize, setLotSize] = useState(initialLotSize);
  const [demand, setDemand] = useState(Array(periods.length).fill(0)); // Każda tabela ma własne demand
  const [projectedOnHand, setProjectedOnHand] = useState(Array(periods.length).fill(0));
  const [netRequirements, setNetRequirements] = useState(Array(periods.length).fill(0));
  const [plannedOrders, setPlannedOrders] = useState(Array(periods.length).fill(0));
  const [plannedReceipts, setPlannedReceipts] = useState(Array(periods.length).fill(0));
  const [isCalculated, setIsCalculated] = useState(false);

  const handleDemandChange = (value: number, index: number) => {
    const newDemand = [...demand];
    newDemand[index] = value;
    setDemand(newDemand);
  };

  const handleCalculate = () => {
    const newProjectedOnHand = Array(periods.length).fill(0);
    newProjectedOnHand[0] = inventory;

    let newNetRequirements = Array(periods.length).fill(0);
    let newPlannedOrders = Array(periods.length).fill(0);
    let newPlannedReceipts = Array(periods.length).fill(0);

    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      for (let i = 0; i < periods.length; i++) {
        let grossRequirement = demand[i];
        let prevProjectedOnHand = i === 0 ? inventory : newProjectedOnHand[i - 1];
        newProjectedOnHand[i] = prevProjectedOnHand + newPlannedReceipts[i] - grossRequirement;

        if (newProjectedOnHand[i] < 0) {
          newNetRequirements[i] = Math.abs(newProjectedOnHand[i]);
          newProjectedOnHand[i] = 0;

          let orderPeriod = i - leadTime;
          if (orderPeriod >= 0) {
            newPlannedOrders[orderPeriod] = Math.ceil(newNetRequirements[i] / lotSize) * lotSize;
            newPlannedReceipts[i] = newPlannedOrders[orderPeriod];
          }

          keepGoing = true;
          break;
        }
      }
    }

    setProjectedOnHand(newProjectedOnHand);
    setNetRequirements(newNetRequirements);
    setPlannedOrders(newPlannedOrders);
    setPlannedReceipts(newPlannedReceipts);
    setIsCalculated(true);
  };

  return (
    <div className="mrp-container">
      <h3 className="mrp-title">{itemName} (BOM Level: {bomLevel})</h3>

      <div className="mrp-controls">
        <label>
          Czas realizacji:
          <input
            type="number"
            value={leadTime}
            onChange={(e) => setLeadTime(parseInt(e.target.value) || 0)}
            className="mrp-input"
          />
        </label>
        <label>
          Na stanie:
          <input
            type="number"
            value={inventory}
            onChange={(e) => setInventory(parseInt(e.target.value) || 0)}
            className="mrp-input"
          />
        </label>
        <label>
          Wielkość partii:
          <input
            type="number"
            value={lotSize}
            onChange={(e) => setLotSize(parseInt(e.target.value) || 0)}
            className="mrp-input"
          />
        </label>
        <button onClick={handleCalculate} className="mrp-button">
          Oblicz
        </button>
      </div>

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
            {demand.map((d, index) => (
              <td key={index}>
                <input
                  type="number"
                  value={d}
                  onChange={(e) => handleDemandChange(parseInt(e.target.value) || 0, index)}
                  className="mrp-input"
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
                  <td key={index}>{po || ''}</td>
                ))}
              </tr>
              <tr>
                <td>Planowane przyjęcia</td>
                {plannedReceipts.map((pr, index) => (
                  <td key={index}>{pr || ''}</td>
                ))}
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MRPTable;
