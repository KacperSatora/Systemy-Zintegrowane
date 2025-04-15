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
  const [ghpCalculated, setGhpCalculated] = useState(false);

  return (
    <div className="container">
      <GHPTable
        periods={periods}
        initialInventory={constants.defaultGHP.initialInventory}
        initialLeadTime={constants.defaultGHP.initialLeadTime}
        itemName={constants.defaultGHP.itemName}
        onCalculate={(production) => {
          setGhpProduction(production);
          setGhpCalculated(true);
        }}
        onReset={() => {
          setGhpCalculated(false);
        }}
      />

      {ghpCalculated && (
        <>
          {/* KORPUS */}
          <MRPTable
            periods={periods}
            itemName="Korpus"
            bomLevel={1}
            demand={ghpProduction.map((p) => p)}
            onCalculate={(plannedOrders) => setKorpusDemand(plannedOrders)}
            initialLotSize={50}
            initialInventory={10}
            initialLeadTime={1}
          />

          {/* WIECZKO */}
          <MRPTable
            periods={periods}
            itemName="Wieczko"
            bomLevel={1}
            demand={ghpProduction.map((p) => p * 1)}
            onCalculate={(plannedOrders) => setWieczkoDemand(plannedOrders)}
            initialLotSize={50}
            initialInventory={5}
            initialLeadTime={1}
          />

          {/* ZAWIASY */}
          <MRPTable
            periods={periods}
            itemName="Zawiasy"
            bomLevel={2}
            demand={ghpProduction.map((p) => p * 2)}
            initialLotSize={50}
            initialInventory={20}
            initialLeadTime={1}
          />

          {/* DREWNO */}
          <MRPTable
            periods={periods}
            itemName="Drewno"
            bomLevel={2}
            demand={korpusDemand.map(
              (k, i) => k + (wieczkoDemand[i] || 0)
            )}
            initialLotSize={100}
            initialInventory={30}
            initialLeadTime={2}
          />
        </>
      )}
    </div>
  );
}
