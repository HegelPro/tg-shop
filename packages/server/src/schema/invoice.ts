import { bot } from '../bot/bot'
import { prisma } from '../db'
import { createInvoiceLink } from '../bot/createInvoiceLink'
import { builder } from '../builder'

class invoiceUrlResult {
  invoiceUrl: string
  orderId: number
  constructor(invoiceUrl: string, orderId: number) {
    this.invoiceUrl = invoiceUrl
    this.orderId = orderId
  }
}

const InvoiceUrlResult = builder.objectType(invoiceUrlResult, {
  name: 'InvoiceUrlResult',
  fields: (t) => ({
    invoiceUrl: t.exposeString('invoiceUrl', {
      nullable: false,
    }),
    orderId: t.exposeInt('orderId', {
      nullable: false,
    }),
  }),
})

const OrderItemInput = builder.inputType('OrderItem', {
  fields: (t) => ({
    productId: t.int({ required: true }),
    counter: t.int({ required: true }),
  }),
})

builder.mutationField('createInvoiceLink', (t) =>
  t.field({
    type: InvoiceUrlResult,
    nullable: false,
    args: {
      telegramUserId: t.arg.int({ required: true }),
      orderItemList: t.arg({
        type: t.arg.listRef(OrderItemInput),
        required: true,
      }),
    },
    resolve: async (parent, args) => {
      const invoiceLinkPayload = Math.random().toString()

      // TODO write sum
      const sumOfProductPrices = 0
      const userData = await prisma.userData.findFirst({})

      const order = await prisma.order.create({
        data: {
          userDataId: args.telegramUserId,
          payload: invoiceLinkPayload,
        },
      })
      // const _orderItemList = await prisma.orderItem.createMany({
      //   data: args.orderItemList.map((orderItem) => ({
      //     productId: orderItem.productId,
      //     orderId: order.id,
      //     count: orderItem.counter,
      //   })),
      // })

      const productList = await prisma.product.findMany({
        where: {
          id: {
            in: args.orderItemList.map((orderItem) => orderItem.productId),
          },
        },
      })

      const invoiceLink = await createInvoiceLink(
        bot,
        invoiceLinkPayload,
        productList.map((product) => ({
          counter:
            args.orderItemList.find(
              (orderItem) => product.id === orderItem.productId,
            )?.counter || -99999,
          data: product,
        })),
      )
      // bot.api.sendMessage(
      //   args.telegramUserId,
      //   productList
      //     .map((product) => ({
      //       counter:
      //         args.orderItemList.find(
      //           (orderItem) => product.id === orderItem.productId,
      //         )?.counter || -99999,
      //       data: product.name,
      //     }))
      //     .map((elem) => `${elem.counter} x ${JSON.stringify(elem.data)}`)
      //     .join(',\n'),
      // )

      // return new invoiceUrlResult('invoiceLink', 'order.id')
      return new invoiceUrlResult(invoiceLink, order.id)
    },
  }),
)
