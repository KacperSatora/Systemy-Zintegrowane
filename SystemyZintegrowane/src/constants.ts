export interface GHPTableProps {
  periods: number[];
  initialInventory: number;
  initialLeadTime: number;
  itemName: string;
}

export interface MRPTableProps extends GHPTableProps {
  initialLotSize: number;
  bomLevel: number;
  demand?: number[];
  onCalculate?: (plannedOrders: number[]) => void; // <--- dodaj to
}

export interface MRPLogicProps {
  periods: number[];
  initialInventory: number;
  initialLeadTime: number;
  initialLotSize: number;
  demand?: number[];
  onCalculate?: (plannedOrders: number[]) => void;
}

export const PERIODS = [1, 2, 3, 4, 5, 6];

export const defaultGHP: GHPTableProps = {
  periods: PERIODS,
  initialInventory: 5,
  initialLeadTime: 1,
  itemName: "Szkatułka",
};
