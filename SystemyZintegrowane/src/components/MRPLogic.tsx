import { MRPLogicProps } from "../constants";

export default function calculateMRP({
  periods,
  initialInventory,
  initialLeadTime,
  initialLotSize,
  demand = [],
}: MRPLogicProps) {
  const length = periods.length;
  const projectedOnHand = Array(length).fill(0);
  const netRequirements = Array(length).fill(0);
  const plannedOrders = Array(length).fill(0);
  const plannedReceipts = Array(length).fill(0);

  const frozenNetRequirements = Array(length).fill(false);
  let inventory = initialInventory;
  let changed = true;

  while (changed) {
    changed = false;

    for (let i = 0; i < length; i++) {
      const grossRequirement = demand[i] || 0;
      const prevOnHand = i === 0 ? inventory : projectedOnHand[i - 1];
      projectedOnHand[i] = prevOnHand + plannedReceipts[i] - grossRequirement;

      if (projectedOnHand[i] < 0 && !frozenNetRequirements[i]) {
        const shortage = Math.abs(projectedOnHand[i]);
        netRequirements[i] = shortage;
        frozenNetRequirements[i] = true;

        const orderQty = initialLotSize;

        const orderPeriod = i - initialLeadTime;

        if (orderPeriod >= 0) {
          // Zamówienie w poprzednich okresach (gdzie czas realizacji pozwala)
          plannedOrders[orderPeriod] = orderQty;
          plannedReceipts[i] = orderQty;
        } else {
          // Jeżeli czas realizacji wykracza poza dostępne okresy
          plannedReceipts[i] = orderQty;
        }

        changed = true;
        break;
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
