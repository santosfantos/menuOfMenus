export interface Item {
  label: string;
  isOpen?: boolean;
  children?: Array<Item>;
}
