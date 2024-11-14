import { builder } from '../builder'
import { prisma } from '../db'

builder.prismaObject('Product', {
  fields: (t) => ({
    id: t.exposeInt('id', { nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    // currency: t.exposeString('currency'),
    image: t.exposeString('image'),
    productCategory: t.relation('productCategory', { nullable: false }),
    price: t.exposeFloat('price', { nullable: false }),
    discountPrice: t.exposeFloat('discountPrice'),
    // numberOfproduct: t.exposeFloat('numberOfproduct'),
    descrition: t.exposeString('descrition'),
    shortDescrition: t.exposeString('shortDescrition'),
  }),
})

builder.prismaObject('ProductCategory', {
  fields: (t) => ({
    id: t.exposeInt('id', { nullable: false }),
    singleName: t.exposeString('singleName', { nullable: false }),
    pluralName: t.exposeString('pluralName', { nullable: false }),
  }),
})

builder.queryField('product', (t) =>
  t.prismaField({
    nullable: false,
    type: 'Product',
    args: {
      productId: t.arg.int({required: true})
    },
    resolve: async (query, _parent, {productId}) => {
      return prisma.product.findFirstOrThrow({ ...query, where: {
        id: productId
      } })
    },
  }),
)

builder.queryField('productList', (t) =>
  t.prismaField({
    nullable: false,
    type: ['Product'],
    resolve: async (query) => {
      return prisma.product.findMany({ ...query })
    },
  }),
)

builder.queryField('productListWithCategoryFilter', (t) =>
  t.prismaField({
    nullable: false,
    type: ['Product'],
    args: {
      productCategoryId: t.arg.int(),
    },
    resolve: async (query, _parent, args) => {
      if(args.productCategoryId) {
        return prisma.product.findMany({ ...query, where: {
          productCategoryId: args.productCategoryId
        } })
      }
      return prisma.product.findMany({ ...query })
    },
  }),
)

builder.queryField('productCategoryList', (t) =>
  t.prismaField({
    nullable: false,
    type: ['ProductCategory'],
    resolve: async (query) => {
      return prisma.productCategory.findMany({ ...query })
    },
  }),
)
