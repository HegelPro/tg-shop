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

const ProductInput = builder.inputType(
    'ProductInput',
    {
      fields: (t) => ({
        id: t.int({required: true}),
        counter: t.int({required: true})
      }),
    },
)

builder.queryField('productList', t => t.prismaField({
    type: ['Product'],
    resolve: (query) => {
        return prisma.product.findMany({...query,})
    }
}))

builder.mutationField('invoiceUrl', t => t.field({
        type: 'String',
        args: {
            productList: t.arg({
                type: t.arg.listRef(ProductInput),
                required: true
            }),
        },
        resolve: (parent, args) => createInvoiceLink(bot, args.productList.map(product => ({
            id: product.id,
            counter: product.counter,
            price: 10,
        }))),
    })
);
