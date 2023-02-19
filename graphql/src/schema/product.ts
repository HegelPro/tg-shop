import { bot } from '../bot/bot';
import { createInvoiceLink } from '../bot/createInvoiceLink';
import { builder } from '../builder'
import { prisma } from '../db';


builder.prismaObject('Product', {
    fields: (t) => ({
      id: t.exposeInt('id'),
      name: t.exposeString('name'),
      currency: t.exposeString('currency'),
      image: t.exposeString('image'),
      productCategory: t.relation('productCategory'),
      price: t.exposeFloat('price'),
      numberOfproduct: t.exposeFloat('numberOfproduct'),
      descrition: t.exposeString('descrition', { nullable: true })
    }),
  })

builder.prismaObject('ProductCategory', {
    fields: (t) => ({
        id: t.exposeInt('id'),
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

builder.queryField('productList', t => t.prismaField({
    type: ['Product'],
    resolve: async (query) => {
        return prisma.product.findMany({...query,})
    }
}))

builder.mutationField('invoiceUrl', t => t.field({
        type: 'String',
        args: {
            orderItemList: t.arg({
                type: t.arg.listRef(OrderItemInput),
                required: true
            }),
        },
        resolve: async (parent, args) => {
            const productList = await prisma.product.findMany({
                where: {
                    id: {in: args.orderItemList.map(orderItem => orderItem.productId)}
                },
            })
            return createInvoiceLink(
                bot,
                productList
                    .map(product => ({
                        counter: args.orderItemList.find(orderItem => product.id === orderItem.productId)?.counter || -99999,
                        data: product
                    }))
            )
        }
    })
);
