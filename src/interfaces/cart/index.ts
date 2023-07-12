import { CartProductInterface } from 'interfaces/cart-product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CartInterface {
  id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  cart_product?: CartProductInterface[];
  user?: UserInterface;
  _count?: {
    cart_product?: number;
  };
}

export interface CartGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
