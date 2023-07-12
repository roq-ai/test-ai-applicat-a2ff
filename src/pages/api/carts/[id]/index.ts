import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cartValidationSchema } from 'validationSchema/carts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cart
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCartById();
    case 'PUT':
      return updateCartById();
    case 'DELETE':
      return deleteCartById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCartById() {
    const data = await prisma.cart.findFirst(convertQueryToPrismaUtil(req.query, 'cart'));
    return res.status(200).json(data);
  }

  async function updateCartById() {
    await cartValidationSchema.validate(req.body);
    const data = await prisma.cart.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCartById() {
    const data = await prisma.cart.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
