import axios from 'axios';
import queryString from 'query-string';
import { CartInterface, CartGetQueryInterface } from 'interfaces/cart';
import { GetQueryInterface } from '../../interfaces';

export const getCarts = async (query?: CartGetQueryInterface) => {
  const response = await axios.get(`/api/carts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCart = async (cart: CartInterface) => {
  const response = await axios.post('/api/carts', cart);
  return response.data;
};

export const updateCartById = async (id: string, cart: CartInterface) => {
  const response = await axios.put(`/api/carts/${id}`, cart);
  return response.data;
};

export const getCartById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/carts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCartById = async (id: string) => {
  const response = await axios.delete(`/api/carts/${id}`);
  return response.data;
};
