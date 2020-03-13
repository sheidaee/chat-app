export interface Props {
  id?: string;
  name: string;
  value: string;
  onChange: () => void;
  onKeyUp?: () => void;
  type?: string;
  className?: string;
  autoComplete?: string;
  placeholder?: string;
  callback?: any;
  'data-testid'?: string;
}
