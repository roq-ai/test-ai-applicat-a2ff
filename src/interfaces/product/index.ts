import { CartProductInterface } from 'interfaces/cart-product';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  cart_product?: CartProductInterface[];
  organization?: OrganizationInterface;
  _count?: {
    cart_product?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
}
