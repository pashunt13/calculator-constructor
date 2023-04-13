export interface ItemModel {
  id: number;
  type: string;
  bodyStyle: string;
  valueStyle: string;
  value: string | string[];
  canDrag: boolean;
  isDragging: boolean;
}