import { Bot, Keyboard } from "grammy";

const keyboard = new Keyboard()
    .text("Yes, they certainly are")
    .text("I'm not quite sure").row()
    .text("No. 😈")
    .resized();
    

export const addCommands = (bot: Bot) => {
    bot.api.setMyCommands([
        { command: "start", description: "Start the bot" },
        { command: "help", description: "Show help text" },
        { command: "settings", description: "Open settings" },
    ]);

    bot.command('help', (ctx) => {
        ctx.reply('null', {
            reply_markup: keyboard,
        });
    });
    
    
    bot.command('start', async (ctx) => {
    if (ctx.msg?.web_app_data?.data) {
        try {
        const data = JSON.parse(ctx.msg?.web_app_data?.data)
        console.log(data)
        ctx.reply('Спасибо за обратную связь!')
        ctx.reply('Ваша страна: ' + data?.country);
        ctx.reply('Ваша улица: ' + data?.street);
    
        setTimeout(async () => {
            await ctx.reply('Всю информацию вы получите в этом чате');
        }, 3000)
        } catch (e) {
            console.log(e);
        }
    } else {
        ctx.reply('d', {
            reply_markup: keyboard,
        })
    }
    });
    
    bot.command('pay', (ctx) => {
        ctx.replyWithInvoice(
            'kek',
            'dddd',
            '9039039',
            process.env.PROVIDER_TOKEN || "",
            'RUB',
            [{ label: 'Invoice Title', amount: 100 * 100 }]
        )
    })
    
    bot.on(':successful_payment', (ctx, next) => {
        console.log(ctx);
    })
    
    // Reply to any message with "Hi there!".
    bot.on("message", (ctx) => {
        console.log(ctx.message?.web_app_data);
        
        ctx.reply("Hi there!")
    });
}