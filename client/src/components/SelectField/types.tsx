export interface Props {
  name: string;
  items: [];
  value?: string;
  onChange?: (v: any) => void;
  fillSelect?: boolean;
}

export type SelectItem = {
  caption: string;
  value: string;
};
