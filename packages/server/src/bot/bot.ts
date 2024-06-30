import { Bot } from "grammy";

if (process.env.TG_BOT_API_TOKEN === undefined) throw new Error('TG_BOT_API_TOKEN env var not found');

export const bot = new Bot(process.env.TG_BOT_API_TOKEN);

bot.api.setMyCommands([
    { command: "start", description: "предназначена для того, чтобы начать работу с ботом" },
    { command: "help", description: "команда которая служет для описания того, как необходимо работать с ботом" },
]);

bot.command('start', async (ctx) => {
    ctx.reply('Добро пожаловать в Telegram магазин! Чтобы перейти в интерфейс магазина нажмити на кнопку "Shop", которая расположена внизу чата.')
});

bot.command('help', async (ctx) => {
    ctx.reply(
        'Если вы хотите перейти в интерфейс магазина нажмити на кнопку "Shop", которая расположена внизу чата.\n\n'
        +'Список доступных команд:\n'
        + '/start - предназначена для того, чтобы начать работу с ботом\n'
        + '/help - команда которая служет для описания того, как необходимо работать с ботом'
    )
});

bot.on(':successful_payment', (ctx, next) => {
    console.log(':successful_payment');
    
    console.log(ctx.message?.successful_payment);
    ctx.reply("successful_payment");
    next();
})

bot.on('msg:successful_payment', (ctx, next) => {
    console.log('msg:successful_payment');
    
    console.log(ctx.message?.successful_payment);
    ctx.reply("msg:successful_payment");
    next();
})

bot.on('message:successful_payment', (ctx, next) => {
    console.log('message:successful_payment');
    
    console.log(ctx.message?.successful_payment);
    ctx.reply("message:successful_payment");
    next();
})