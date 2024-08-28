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

builder.queryField('productList', t => t.prismaField({
    type: ['Product'],
    resolve: async (query) => {
        return prisma.product.findMany({...query,})
    }
}))


