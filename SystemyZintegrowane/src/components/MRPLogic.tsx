import { MRPLogicProps } from "../constants";

export default function calculateMRP({
  periods,
  initialInventory,
  initialLeadTime,
  initialLotSize,
  demand = [],
  manualPlannedReceipts = [],
}: MRPLogicProps & { manualPlannedReceipts?: number[] }) {
  const length = periods.length;
  const projectedOnHand = Array(length).fill(0);
  const netRequirements = Array(length).fill(0);
  const plannedOrders = Array(length).fill(0);
  const plannedReceipts = Array(length).fill(0);

  let inventory = initialInventory;

  for (let i = 0; i < length; i++) {
    const grossRequirement = demand[i] || 0;
    const prevOnHand = i === 0 ? inventory : projectedOnHand[i - 1];

    // Uwzględniamy ręczne dane tylko w obliczeniach
    const manualReceipt = manualPlannedReceipts[i] || 0;

    projectedOnHand[i] = prevOnHand + manualReceipt - grossRequirement;

    if (projectedOnHand[i] < 0) {
      const shortage = Math.abs(projectedOnHand[i]);
      netRequirements[i] = shortage;

      const orderQty = initialLotSize;
      const orderPeriod = i - initialLeadTime; // Przesunięcie w lewo o czas realizacji

      if (orderPeriod >= 0) {
        plannedOrders[orderPeriod] += orderQty; // Dodajemy zamówienie w odpowiednim okresie
        plannedReceipts[i] += orderQty; // Przyjęcie zamówienia w bieżącym okresie
        projectedOnHand[i] += orderQty;
      }
    }
  }

  return {
    projectedOnHand,
    netRequirements,
    plannedOrders,
    plannedReceipts,
  };
}