import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';

const AutoSaveFormik = ({ formik, onSave, values }: any) => {
  const previousValues: any = values;

  useEffect(() => {
    async function save() {
      if (
        previousValues &&
        Object.keys(previousValues).length &&
        !isEqual(previousValues, formik.values)
      ) {
        const errors = await formik.validateForm();

        if (Object.keys(errors).length === 0) {
          onSave(formik.values);
        }
      }
    }

    save();
  }, [formik, onSave, previousValues]);

  return null;
};

export default AutoSaveFormik;
