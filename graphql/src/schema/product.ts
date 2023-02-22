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

builder.mutationField('createInvoiceLink', t => t.field({
        type: InvoiceUrlResult,
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
            });
            const invoiceLink = await createInvoiceLink(
                bot,
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
            // TODO create order

            return new invoiceUrlResult(invoiceLink, 0);
        }
    })
);

builder.mutationField('setInvoiceStatus', t => t.field({
    type: 'String',
    args: {
        invoiceStatus: t.arg.string({required: true}),
        orderId: t.arg.int({required: true})
    },
    resolve: async (parent, args) => {
        // TODO get it from order
        const orderItemList: {productId: number, counter: number}[] = [];

        const productList = await prisma.product.findMany({
            where: {
                id: {in: orderItemList.map(orderItem => orderItem.productId)}
            },
        });
        const returnCounterToProducts = async () => {
            const _updatedProduct = await Promise.all(productList.map(product => prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    numberOfproduct: product.numberOfproduct + (orderItemList.find(orderItem => product.id === orderItem.productId)?.counter || 0)
                }
            })))
        }
        
        if(args.invoiceStatus === 'paid') {
            return ''
        } else if(args.invoiceStatus === 'cancelled') {
            await returnCounterToProducts();
            return ''
        } else if(args.invoiceStatus === 'failed') {
            await returnCounterToProducts();
            return ''
        } else if(args.invoiceStatus === 'pending') {
            // TODO don't know where need to return it
            return ''
        }
        return ''
        
    }
})
);
