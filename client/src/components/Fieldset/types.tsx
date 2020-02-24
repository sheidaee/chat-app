export interface Props
  extends React.DetailedHTMLProps<
    React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
    HTMLFieldSetElement
  > {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  otherProps?: any;
}
