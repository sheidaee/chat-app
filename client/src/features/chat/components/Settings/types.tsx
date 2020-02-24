import { SettingsFormValues } from '../../types';

export interface FormikProps {
  handleChange?: (e: React.ChangeEvent) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBlur?: (e: React.FocusEvent) => void;
  setFieldValue: (field: string, value: string) => void;
  // values?: FormValues;
  options?: Array<{
    code: string;
    country: string;
  }>;
  validateForm: any;
  errors: any;
}

export interface FormProps {
  initialValues: any;
  handleSubmit?: any;
  children?: React.ReactNode;
  isSubmitting?: boolean;
  loading?: boolean;
  values: SettingsFormValues;
}

export type PropsWithFormik = FormProps & FormikProps;
