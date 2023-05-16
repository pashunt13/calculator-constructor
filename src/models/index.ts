export enum Type {
  Display = 'display',
  MathSigns = 'mathSigns',
  Nums = 'nums',
  ToCount = 'toCount'
}

export enum BodyType {
  Display = 'display',
  MathSigns = 'math-group math',
  Nums = 'math num',
  ToCount = 'math to-count'
}

export enum ValueType {
  Display = 'display-nums',
  MathSigns = 'math-value',
  Nums = 'math-value',
  ToCount = 'to-count-value'
}

export interface ItemModel {
  id: number;
  type: string;
  bodyStyle: string;
  valueStyle: string;
  value: string | string[];
  canDrag: boolean;
}