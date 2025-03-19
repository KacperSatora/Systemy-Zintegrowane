import { useState } from 'react';
import './App.css';
import MRPTable from './components/MRPTable';

function App() {
  const [periods] = useState([1, 2, 3, 4, 5, 6]);
  
  return (
    <div className="container">
      <h1>MRP dla Szkatułki</h1>
      <h2>Planowanie materiałowe</h2>

      <MRPTable 
        periods={periods} 
        initialInventory={22} 
        initialLeadTime={3} 
        initialLotSize={40} 
        itemName="Drewno"
        bomLevel={2}
      />
      
      <MRPTable 
        periods={periods} 
        initialInventory={22} 
        initialLeadTime={3} 
        initialLotSize={40} 
        itemName="Zawiasy"
        bomLevel={2}
      />

      <MRPTable 
        periods={periods} 
        initialInventory={22} 
        initialLeadTime={3} 
        initialLotSize={40} 
        itemName="Wieczko"
        bomLevel={1}
      />
      
      <MRPTable 
        periods={periods} 
        initialInventory={22} 
        initialLeadTime={3} 
        initialLotSize={40} 
        itemName="Korpus"
        bomLevel={1}
      />

      <style>
        {`
          body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
          }
          .container {
            text-align: center;
            padding: 20px;
          }
          .control-panel {
            margin-bottom: 20px;
          }
          .mrp-table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
            font-size: 18px;
          }
          .mrp-table th, .mrp-table td {
            border: 1px solid white;
            padding: 10px;
          }
          .mrp-table th {
            background-color: #333;
          }
        `}
      </style>
    </div>
  );
}

export default App;
