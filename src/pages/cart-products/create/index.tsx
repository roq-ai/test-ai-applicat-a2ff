import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCartProduct } from 'apiSdk/cart-products';
import { Error } from 'components/error';
import { cartProductValidationSchema } from 'validationSchema/cart-products';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CartInterface } from 'interfaces/cart';
import { ProductInterface } from 'interfaces/product';
import { getCarts } from 'apiSdk/carts';
import { getProducts } from 'apiSdk/products';
import { CartProductInterface } from 'interfaces/cart-product';

function CartProductCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CartProductInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCartProduct(values);
      resetForm();
      router.push('/cart-products');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CartProductInterface>({
    initialValues: {
      cart_id: (router.query.cart_id as string) ?? null,
      product_id: (router.query.product_id as string) ?? null,
    },
    validationSchema: cartProductValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Cart Product
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<CartInterface>
            formik={formik}
            name={'cart_id'}
            label={'Select Cart'}
            placeholder={'Select Cart'}
            fetcher={getCarts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <AsyncSelect<ProductInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Product'}
            placeholder={'Select Product'}
            fetcher={getProducts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'cart_product',
    operation: AccessOperationEnum.CREATE,
  }),
)(CartProductCreatePage);
