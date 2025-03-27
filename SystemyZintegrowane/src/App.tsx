import * as constants from "./constants";
import "./App.css";
import MRPTable from "./components/MRPTable";
import GHPTable from "./components/GHPTable";
import { useState } from "react";

export default function App() {
  const periods = constants.PERIODS;

  const [ghpProduction, setGhpProduction] = useState(
    Array(periods.length).fill(0)
  );
  const [korpusDemand, setKorpusDemand] = useState(
    Array(periods.length).fill(0)
  );
  const [wieczkoDemand, setWieczkoDemand] = useState(
    Array(periods.length).fill(0)
  );
  const [zawiasyDemand, setZawiasyDemand] = useState(
    Array(periods.length).fill(0)
  );

  return (
    <div className="container">
      <GHPTable
        periods={periods}
        initialInventory={constants.defaultGHP.initialInventory}
        initialLeadTime={constants.defaultGHP.initialLeadTime}
        itemName={constants.defaultGHP.itemName}
        onCalculate={(production) => setGhpProduction(production)}
      />

      <MRPTable
        periods={periods}
        initialInventory={30}
        initialLeadTime={1}
        initialLotSize={80}
        itemName="Korpus"
        bomLevel={1}
        demand={ghpProduction}
        onCalculate={(plannedOrders) => setKorpusDemand(plannedOrders)}
      />

      <MRPTable
        periods={periods}
        initialInventory={40}
        initialLeadTime={1}
        initialLotSize={100}
        itemName="Wieczko"
        bomLevel={1}
        demand={korpusDemand}
        onCalculate={(plannedOrders) => setWieczkoDemand(plannedOrders)}
      />

      <MRPTable
        periods={periods}
        initialInventory={22}
        initialLeadTime={3}
        initialLotSize={40}
        itemName="Zawiasy"
        bomLevel={2}
        demand={wieczkoDemand}
        onCalculate={(plannedOrders) => setZawiasyDemand(plannedOrders)}
      />

      <MRPTable
        periods={periods}
        initialInventory={22}
        initialLeadTime={2}
        initialLotSize={500}
        itemName="Drewno"
        bomLevel={2}
        demand={zawiasyDemand}
      />
    </div>
  );
}
