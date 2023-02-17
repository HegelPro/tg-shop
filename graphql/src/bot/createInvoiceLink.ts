import { Bot } from "grammy";

export const createInvoiceLink = async (bot: Bot, receive: {
    id: number,
    counter: number,
    price: number
}[]) => {
    const invoiceLink = await bot.api.createInvoiceLink(
        'PRODUCTS',
        'something',
        '9039039',
        process.env.PROVIDER_TOKEN || "",
        'RUB',
        receive.map(item => ({
            label: item.id.toString(),
            amount: item.counter * item.price * 100
        }))
    );

    return invoiceLink
}