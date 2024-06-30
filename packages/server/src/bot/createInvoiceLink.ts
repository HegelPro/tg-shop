import { Product } from "@prisma/client";
import { Bot } from "grammy";

interface WithCounter<T> {
    data: T
    counter: number
}

export const createInvoiceLink = async (bot: Bot, payload: string, productWithCounterList: WithCounter<Product>[]) => {
    const prices = productWithCounterList.map(productWithCounter => ({
        label: `${productWithCounter.data.name} x ${productWithCounter.counter}`,
        amount: productWithCounter.counter * productWithCounter.data.price * 100
    }))
    
    console.log("Prices:", prices);

    const invoiceLink = await bot.api.createInvoiceLink(
        'Товары',
        'Произведите оплату товара',
        payload,
        process.env.PROVIDER_TOKEN || "",
        'RUB',
        prices,
        {
            need_phone_number: true,
            need_shipping_address: true,
        }
    );

    console.log('invoiceLink is created');

    return invoiceLink
}