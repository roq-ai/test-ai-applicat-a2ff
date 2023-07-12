import * as yup from 'yup';

export const cartValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
