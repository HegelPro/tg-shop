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

    // bot.command('help', (ctx) => {
    //     ctx.reply('null', {
    //         reply_markup: keyboard,
    //     });
    // });
    
    
    bot.command('start', async (ctx) => {
        ctx.reply('Welcame to our store')
    });
    
    bot.on(':successful_payment', (ctx, next) => {
        console.log(':successful_payment');
        
        console.log(ctx.message?.successful_payment);
        next();
    })

    bot.on('msg:successful_payment', (ctx, next) => {
        console.log('msg:successful_payment');
        
        console.log(ctx.message?.successful_payment);
        next();
    })

    bot.on('message:successful_payment', (ctx, next) => {
        console.log('message:successful_payment');
        
        console.log(ctx.message?.successful_payment);
        next();
    })
    
    // Reply to any message with "Hi there!".
    bot.on("message", (ctx) => {
        console.log(ctx.message?.web_app_data);
        
        ctx.reply("Hi there!")
    });
}