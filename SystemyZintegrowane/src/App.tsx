import { useState } from 'react';
import './App.css';
import MRPTable from './components/MRPTable';
import GHPTable from './components/GHPTable';

function App() {
  const [periods, setPeriods] = useState([1, 2, 3, 4, 5, 6]);
  
  return (
    
    <div className="container">
      <GHPTable 
      periods={periods} 
      initialInventory={50} 
      initialLeadTime={2} 
      itemName="Szkatułka" />

      <MRPTable 
        periods={periods} 
        initialInventory={30} 
        initialLeadTime={1} 
        initialLotSize={80} 
        itemName="Korpus"
        bomLevel={1}
      />

      <MRPTable 
        periods={periods} 
        initialInventory={40} 
        initialLeadTime={1} 
        initialLotSize={100} 
        itemName="Wieczko"
        bomLevel={1}
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
        initialLeadTime={2} 
        initialLotSize={500} 
        itemName="Drewno"
        bomLevel={2}
      />       
    </div>
  );
}

export default App;
