import { Product } from "@prisma/client";
import { Bot } from "grammy";

interface Counter<T> {
    data: T
    counter: number
}

export const createInvoiceLink = async (bot: Bot, receive: Counter<Product>[]) => {
    const invoiceLink = await bot.api.createInvoiceLink(
        'PRODUCTS',
        'something',
        '9039039',
        process.env.PROVIDER_TOKEN || "",
        'RUB',
        receive.map(item => ({
            label: `${item.data.name} x ${item.counter}`,
            amount: item.counter * item.data.price * 100
        }))
    );

    return invoiceLink
}