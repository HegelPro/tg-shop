import { bot } from '../bot/bot';
import { prisma } from '../db';
import { createInvoiceLink } from '../bot/createInvoiceLink';
import { builder } from "../builder";

class invoiceUrlResult {
  invoiceUrl: string;
  orderId: number;
  constructor(invoiceUrl: string, orderId: number) {
      this.invoiceUrl = invoiceUrl
      this.orderId = orderId
  }
};

const InvoiceUrlResult = builder.objectType(invoiceUrlResult, {
  name: 'InvoiceUrlResult',
  fields: t => ({
      invoiceUrl: t.exposeString('invoiceUrl'),
      orderId: t.exposeInt('orderId'),
  })
})

const OrderItemInput = builder.inputType(
  'OrderItem',
  {
    fields: (t) => ({
      productId: t.int({required: true}),
      counter: t.int({required: true})
    }),
  },
)

builder.mutationField('createInvoiceLink', t => t.field({
      type: InvoiceUrlResult,
      args: {
          orderItemList: t.arg({
              type: t.arg.listRef(OrderItemInput),
              required: true
          }),
      },
      resolve: async (parent, args) => {
        const invoiceLinkPayload = '9039039'

        // TODO write sum
        const sumOfProductPrices = 0;
        const userData = await prisma.userData.findFirst()
        const order = await prisma.order.create({
            data: {
                userDataId: userData?.id || 0,
                payload: invoiceLinkPayload,
                currency: 'RUB',
                sumOfProductPrices
            }
        })
        const _orderItemList = await prisma.orderItem.createMany({
            data: args.orderItemList.map(orderItem => ({
                productId: orderItem.productId,
                orderId: order.id,
                count: orderItem.counter,
            }))
        })

          const productList = await prisma.product.findMany({
              where: {
                  id: {in: args.orderItemList.map(orderItem => orderItem.productId)}
              },
          });
          const invoiceLink = await createInvoiceLink(
              bot,
              invoiceLinkPayload,
              productList
                  .map(product => ({
                      counter: args.orderItemList.find(orderItem => product.id === orderItem.productId)?.counter || -99999,
                      data: product
                  }))
          )
          const _updatedProduct = await Promise.all(productList.map(product => prisma.product.update({
              where: {
                  id: product.id
              },
              data: {
                  numberOfproduct: product.numberOfproduct - (args.orderItemList.find(orderItem => product.id === orderItem.productId)?.counter || 0)
              }
          })))
          
          return new invoiceUrlResult(invoiceLink, order.id);
      }
  })
);
