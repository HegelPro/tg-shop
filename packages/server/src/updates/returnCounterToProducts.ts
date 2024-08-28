import { prisma } from '../db'

export const returnCounterToProducts = async (orderId: number) => {
  const orderItemList = await prisma.orderItem.findMany({
    where: {
      orderId,
    },
  })
  const productList = await prisma.product.findMany({
    where: {
      id: { in: orderItemList.map((orderItem) => orderItem.productId) },
    },
  })
  await Promise.all(
    productList.map((product) =>
      prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          numberOfproduct:
            product.numberOfproduct +
            (orderItemList.find(
              (orderItem) => product.id === orderItem.productId,
            )?.count || 0),
        },
      }),
    ),
  )
}
