export interface Props {
  name: string;
  items: [];
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  callback?(field: string, value: any): void;
}

export type RadioGroupItem = {
  label: string;
  value: string;
};
