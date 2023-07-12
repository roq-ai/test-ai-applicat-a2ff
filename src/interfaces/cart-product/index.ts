import { CartInterface } from 'interfaces/cart';
import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface CartProductInterface {
  id?: string;
  cart_id?: string;
  product_id?: string;
  created_at?: any;
  updated_at?: any;

  cart?: CartInterface;
  product?: ProductInterface;
  _count?: {};
}

export interface CartProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  cart_id?: string;
  product_id?: string;
}
