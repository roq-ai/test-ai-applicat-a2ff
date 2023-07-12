import axios from 'axios';
import queryString from 'query-string';
import { CartProductInterface, CartProductGetQueryInterface } from 'interfaces/cart-product';
import { GetQueryInterface } from '../../interfaces';

export const getCartProducts = async (query?: CartProductGetQueryInterface) => {
  const response = await axios.get(`/api/cart-products${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCartProduct = async (cartProduct: CartProductInterface) => {
  const response = await axios.post('/api/cart-products', cartProduct);
  return response.data;
};

export const updateCartProductById = async (id: string, cartProduct: CartProductInterface) => {
  const response = await axios.put(`/api/cart-products/${id}`, cartProduct);
  return response.data;
};

export const getCartProductById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cart-products/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCartProductById = async (id: string) => {
  const response = await axios.delete(`/api/cart-products/${id}`);
  return response.data;
};
