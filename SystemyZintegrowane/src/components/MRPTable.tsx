import { useState } from 'react';

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
  const [demand, setDemand] = useState([0, 0, 0, 28, 0, 30]);
  const [projectedOnHand, setProjectedOnHand] = useState(Array(periods.length).fill(0));
  const [netRequirements, setNetRequirements] = useState(Array(periods.length).fill(0));
  const [plannedOrders, setPlannedOrders] = useState(Array(periods.length).fill(0));
  const [plannedReceipts, setPlannedReceipts] = useState(Array(periods.length).fill(0));
  const [isCalculated, setIsCalculated] = useState(false);

  const handleDemandChange = (value: string, index: number) => {
    const newDemand = [...demand];
    newDemand[index] = parseInt(value) || 0;
    setDemand(newDemand);
  };

  const handleInventoryChange = (value: string) => {
    setInventory(parseInt(value) || 0);
  };

  const handleLeadTimeChange = (value: string) => {
    setLeadTime(parseInt(value) || 0);
  };

  const handleLotSizeChange = (value: string) => {
    setLotSize(parseInt(value) || 0);
  };

  const handleCalculate = () => {
    const newProjectedOnHand = Array(periods.length).fill(0);
    newProjectedOnHand[0] = inventory;

    const newNetRequirements = Array(periods.length).fill(0);
    const newPlannedOrders = Array(periods.length).fill(0);
    const newPlannedReceipts = Array(periods.length).fill(0);

    let keepGoing = true;
    while (keepGoing) {
      keepGoing = false;
      for (let i = 0; i < periods.length; i++) {
        const grossRequirement = demand[i];
        const prevProjectedOnHand = i === 0 ? inventory : newProjectedOnHand[i - 1];
        newProjectedOnHand[i] = prevProjectedOnHand + newPlannedReceipts[i] - grossRequirement;

        if (newProjectedOnHand[i] < 0) {
          newNetRequirements[i] = Math.abs(newProjectedOnHand[i]);
          newProjectedOnHand[i] = 0;

          const orderPeriod = i - leadTime;
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
    <div className="table-container py-10">
      <h3>{itemName} (BOM Level: {bomLevel})</h3>
      <div className="control-panel flex">
        <p>
          <label>Czas realizacji: </label>
          <input
            type="number"
            value={leadTime}
            onChange={(e) => handleLeadTimeChange(e.target.value)}
          />
        </p>
        <p>
          <label>Na stanie: </label>
          <input
            type="number"
            value={inventory}
            onChange={(e) => handleInventoryChange(e.target.value)}

          />
        </p>
        <p>
          <label>Wielkość partii: </label>
          <input
            type="number"
            value={lotSize}
            onChange={(e) => handleLotSizeChange(e.target.value)}

          />
        </p>
        <button onClick={handleCalculate}>Oblicz</button>
      </div>

      {isCalculated && (
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
              <td>Całkowite zapotrzebowanie</td>
              {demand.map((d, index) => (
                <td key={index}>
                  <input 
                    type="number" 
                    value={d} 
                    onChange={(e) => handleDemandChange(e.target.value, index)} 
                    style={{ width: '60px' }}
                  />
                </td>
              ))}
            </tr>
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
                <td key={index}>{po > 0 ? po : ''}</td>
              ))}
            </tr>
            <tr>
              <td>Planowane przyjęcia</td>
              {plannedReceipts.map((pr, index) => (
                <td key={index}>{pr > 0 ? pr : ''}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MRPTable;
