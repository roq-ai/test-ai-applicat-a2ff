import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cartProductValidationSchema } from 'validationSchema/cart-products';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cart_product
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCartProductById();
    case 'PUT':
      return updateCartProductById();
    case 'DELETE':
      return deleteCartProductById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCartProductById() {
    const data = await prisma.cart_product.findFirst(convertQueryToPrismaUtil(req.query, 'cart_product'));
    return res.status(200).json(data);
  }

  async function updateCartProductById() {
    await cartProductValidationSchema.validate(req.body);
    const data = await prisma.cart_product.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCartProductById() {
    const data = await prisma.cart_product.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
