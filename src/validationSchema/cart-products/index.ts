import * as yup from 'yup';

export const cartProductValidationSchema = yup.object().shape({
  cart_id: yup.string().nullable(),
  product_id: yup.string().nullable(),
});
