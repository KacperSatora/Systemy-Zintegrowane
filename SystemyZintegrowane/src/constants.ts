export interface GHPTableProps {
  periods: number[];
  initialInventory: number;
  initialLeadTime: number;
  itemName: string;
}

export interface MRPTableProps {
    periods: number[];
    initialInventory: number;
    initialLeadTime: number;
    initialLotSize: number;
    itemName: string;
    bomLevel: number;
  }

export const PERIODS = [1, 2, 3, 4, 5, 6];

export const defaultGHP: GHPTableProps = {
  periods: PERIODS,
  initialInventory: 50,
  initialLeadTime: 2,
  itemName: "Szkatułka",
};
